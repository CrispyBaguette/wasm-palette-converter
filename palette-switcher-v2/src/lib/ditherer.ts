import { createSignal } from "solid-js";
import { createSignaledWorker } from "@solid-primitives/workers";
import { Job } from "./job";

const [job, setJob] = createSignal<Job>();
const [image, setImage] = createSignal<string>();

const [start, stop] = createSignaledWorker({
  input: job,
  output: setImage,
  func: function process(job: Job) {
    console.log(job);
    return "OK ?";
  },
  concurrency: 10,
});

export { setJob, image };
