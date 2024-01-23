import { Component, JSX, splitProps } from "solid-js";
import { image, setJob } from "../lib/ditherer";

type DefaultButtonProps = { children?: JSX.Element } & JSX.HTMLAttributes<HTMLButtonElement>;

const DefaultButton: Component<DefaultButtonProps> = (props) => {
  const [, rest] = splitProps(props, ["children"]);

  return <button
    {...rest}
    type="button"
    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  >
    {props.children}
  </button>
}

const Switcher: Component = () => {
  const handler = () => {
    setJob({
      kind: "FLOYD_STEINBERG",
      image: new ArrayBuffer(1),
      palette: ["FFFFFF"],
    });
  };
  return (
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <main class="p-4 h-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div class="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64"></div>
          <div class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"></div>
          <div class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"></div>
          <div class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"></div>
        </div>
      </main>
      <DefaultButton onClick={handler}>Trigger</DefaultButton>
      <span>{image()}</span>
    </div >
  );
};

export default Switcher;
