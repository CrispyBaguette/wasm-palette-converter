package main

import (
	"syscall/js"
)

func main() {
	js.Global().Set("dither", Dither())
	<-make(chan bool)
}
