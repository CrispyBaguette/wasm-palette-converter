import { Component } from "solid-js";
import { setJob, image } from "../lib/ditherer";
import { Job } from "../lib/job";

const Switcher: Component = () => {
  const handler = () => {
    const job: Job = {
      kind: "FLOYD_STEINBERG",
      image: new ArrayBuffer(1),
      palette: ["FFFFFF"],
    };

    setJob(job);
  };
  return (
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8" onClick={handler}>
      <main class="p-4 h-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div class="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64"></div>
          <div class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"></div>
          <div class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"></div>
          <div class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"></div>
        </div>
      </main>
      <button
        onClick={handler}
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Trigger
      </button>
    </div>
  );
};

export default Switcher;
