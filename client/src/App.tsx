import React from 'react';
import './App.css';

function App() {
  return (
    <article>
      <h1>Go+Wasm image dithering tool</h1>
      <aside>Featuring the Nord Color Palette</aside>
      <p>
        Load an image, click Go and wait (potentially for a while) for the image
        to be dithered using the Nord color palette and the Floyd-Steinberg
        algorithm.
      </p>
      <p>
        Running in the browser with Wasm causes a bit of a performance penalty.
        Multithreading is not available (not that it matters much since
        Floyd-Steinberg is single-threaded), and sending data back and forth
        between JS and Wasm can take a little while.
      </p>
      <p>
        I've re-used code from
        <a
          href="https://www.sitepen.com/blog/using-webassembly-with-web-workers"
          >this article</a
        >
        to make the Wasm code run in a web worker, with some adaptations for Go
        oddities.
      </p>
      <p>
        If you're into that sort of thing, source code is available on
        <a href="https://github.com/CrispyBaguette/wasm-palette-converter"
          >GitHub</a
        >.
      </p>
      <form>
        <input type="file" id="source-image" accept="image/png, image/jpeg" />
        <button id="go-btn" type="button" disabled>Go</button>
      </form>
    </article>
  );
}

export default App;
