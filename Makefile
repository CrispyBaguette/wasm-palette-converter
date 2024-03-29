build-wasm:
	cd src && GOOS=js GOARCH=wasm go build -o ../client/public/main.wasm .

build-wasm-release:
	cd src && GOOS=js GOARCH=wasm go build -ldflags="-s -w" -o ../client/public/main.wasm .

build-react:
	cd client && npm run build

all: build-wasm-release build-react