import { faGit, faMastodon } from "@fortawesome/free-brands-svg-icons";
import Fa from "solid-fa";
import { Component } from "solid-js";

const Footer: Component = () => (
  <footer class="p-4 bg-white sm:p-6 dark:bg-gray-800">
    <div class="mx-auto max-w-screen-xl">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          <a
            href="https://gitea.bruyant.xyz/alexandre/PaletteSwitcher"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <Fa icon={faGit} />
          </a>
          <a
            href="https://piaille.fr/@cattusinarca"
            class="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <Fa icon={faMastodon} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
