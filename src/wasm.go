package main

import (
	"bytes"
	b64 "encoding/base64"
	"encoding/hex"
	"image"
	"image/color"
	_ "image/jpeg"
	"image/png"
	"log"
	"syscall/js"
	"time"

	"github.com/makeworld-the-better-one/dither/v2"
)

var nordPalette, _ = buildPalette([]string{
	"2e3440",
	"3b4252",
	"434c5e",
	"4c566a",
	"d8dee9",
	"e5e9f0",
	"eceff4",
	"8fbcbb",
	"88c0d0",
	"81a1c1",
	"5e81ac",
	"bf616a",
	"d08770",
	"ebcb8b",
	"a3be8c",
	"b48ead",
})

func buildPalette(pal []string) (color.Palette, error) {
	var palette = make(color.Palette, len(pal))

	for i, s := range pal {
		b, err := hex.DecodeString(s)
		if err != nil {
			return nil, err
		}
		palette[i] = color.RGBA{b[0], b[1], b[2], 0xff}
	}

	return palette, nil
}

func ditherImage(img image.Image) image.Image {
	// Build ditherer
	ditherer := dither.NewDitherer(nordPalette)
	ditherer.Matrix = dither.FloydSteinberg

	// Dither image in a copy
	dst := ditherer.DitherCopy(img)

	return dst
}

func decodeImage(imageData []byte) (image.Image, error) {
	img, imageType, err := image.Decode(bytes.NewReader(imageData))
	if err != nil {
		return nil, err
	}
	log.Printf("Decoded image as %v\n", imageType)
	return img, nil
}

// DittherNord returns a Promise that takes a UintArray containing a Jpeg or png image,
// and resolves to a string containing a base64 encoded png image.
func DitherNord() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		imageBytes := make([]byte, args[0].Length())
		js.CopyBytesToGo(imageBytes, args[0])

		handler := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
			resolve := args[0]
			reject := args[1]

			go func() {
				// Decode image from raw bytes
				img, err := decodeImage(imageBytes)
				if err != nil {
					errorConstructor := js.Global().Get("Error")
					errorObject := errorConstructor.New(err.Error())
					reject.Invoke(errorObject)
				}

				// Perform dithering
				log.Println("Dithering image...")
				t1 := time.Now()
				ditheredImage := ditherImage(img)
				t2 := time.Now()
				log.Printf("Image dithered in %v\n", t2.Sub(t1))

				// Encode as PNG
				buf := new(bytes.Buffer)
				png.Encode(buf, ditheredImage)

				// Encode as img src b64 string and resolve
				encodedImage := b64.StdEncoding.EncodeToString(buf.Bytes())
				resolve.Invoke(js.ValueOf(encodedImage))
			}()

			return nil
		})

		promiseConstructor := js.Global().Get("Promise")
		return promiseConstructor.New(handler)
	})
}
