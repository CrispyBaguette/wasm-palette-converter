build-wasm:
	cd src && GOOS=js GOARCH=wasm go build -o ../client/public/main.wasm .

build-react:
	cd client && npm run build