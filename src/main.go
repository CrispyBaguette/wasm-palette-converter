package main

import (
	"syscall/js"
)

func main() {
	js.Global().Set("DitherNord", DitherNord())
	<-make(chan bool)
}
