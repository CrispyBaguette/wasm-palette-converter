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
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      {image()}
      <button onClick={() => handler()}>Click Me</button>
    </div>
  );
};

export default Switcher;
