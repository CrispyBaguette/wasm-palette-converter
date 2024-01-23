import { createSignal } from "solid-js";
import { createSignaledWorker } from "@solid-primitives/workers";
import { Job } from "./job";

const [job, setJob] = createSignal<Job>();
const [image, setImage] = createSignal<string>();

const [start, stop] = createSignaledWorker({
  input: job,
  output: setImage,
  func: function process(job: Job) {
    console.log("Job triggered");

    return job.kind;
  },
});

export { setJob, image };
