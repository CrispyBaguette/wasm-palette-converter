package main

import (
	"bytes"
	"encoding/hex"
	"fmt"
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

		if len(b) != 3 {
			return nil, fmt.Errorf("invalid color length: %v", len(b))
		}

		palette[i] = color.RGBA{b[0], b[1], b[2], 0xff}
	}

	return palette, nil
}

func ditherImage(img image.Image) image.Image {
	// Build ditherer
	ditherer := dither.NewDitherer(nordPalette)
	ditherer.Matrix = dither.FloydSteinberg

	dst := ditherer.Dither(img)

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

// Dither returns a Promise that takes a UintArray containing a Jpeg or png image,
// and resolves to a UintArray containing the dithered image.
func Dither() js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		imageBytes := make([]byte, args[0].Length())
		js.CopyBytesToGo(imageBytes, args[0])

		handler := js.FuncOf(func(this js.Value, args []js.Value) interface{} {
			resolve := args[0]
			reject := args[1]

			go func() {
				errorConstructor := js.Global().Get("Error")

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
				log.Println("Encoding image...")
				t1 = time.Now()
				buf := new(bytes.Buffer)
				err = png.Encode(buf, ditheredImage)
				if err != nil {
					log.Printf("Error encoding image: %v\n", err)
					errorObject := errorConstructor.New(err.Error())
					reject.Invoke(errorObject)
				}
				t2 = time.Now()
				log.Printf("Image encoded in %v\n", t2.Sub(t1))

				log.Println("Copying image to JS...")
				t1 = time.Now()
				encodedImage := js.Global().Get("Uint8ClampedArray").New(len(buf.Bytes()))
				js.CopyBytesToJS(encodedImage, buf.Bytes())
				t2 = time.Now()
				log.Printf("Image copied in %v\n", t2.Sub(t1))
				resolve.Invoke(encodedImage)
			}()

			return nil
		})

		promiseConstructor := js.Global().Get("Promise")
		return promiseConstructor.New(handler)
	})
}
