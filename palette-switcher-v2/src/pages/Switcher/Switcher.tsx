import { Component, For, JSX, createSignal, splitProps } from "solid-js";
import { image, setJob } from "../../lib/ditherer";
import { Algorithm, AlgorithmName } from "../../lib/job";


const Switcher: Component = () => {
  const handler = () => {
    setJob({
      kind: Algorithm.FLOYD_STEINBERG,
      image: new ArrayBuffer(1),
      palette: ["FFFFFF"],
    });
  };

  const [algorithms, setAlgorithms] = createSignal(Object.keys(Algorithm));

  return (
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <main class="p-4 h-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64 lg:col-span-3">
            <span>Image Goes Here</span>
          </div>
          <div class="rounded-lg">
            <section class="bg-white dark:bg-gray-900">
              <div class="p-4 mx-auto max-w-2xl">
                <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Configuration</h2>
                <form action="#">
                  <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div>
                      <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Algorithm</label>
                      <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option >Select Algorithm</option>
                        <For each={algorithms()}>{(algo, _) => <option value={algo}>{AlgorithmName[algo]}</option>}</For>
                        <option value="FS">Floyd-Steinberg</option>
                        <option value="NC">Nearest color</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Start processing
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </main>

      <span>{image()}</span>
    </div >
  );
};

export default Switcher;
