import { Component, ParentComponent } from "solid-js";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import Fa from "solid-fa";

const AboutItemHeader: ParentComponent = (props) => (
  <h3 class="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
    <Fa
      class="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400"
      icon={faQuestionCircle}
    />
    {props.children}
  </h3>
);

const AboutItemParagraph: ParentComponent = (props) => (
  <p class="text-gray-500 dark:text-gray-400">{props.children}</p>
);

const AboutItem: ParentComponent = (props) => (
  <div class="mb-10">{props.children}</div>
);

const About: Component = () => (
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <h2 class="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        About Palette Switcher
      </h2>
      <div class="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
        <div>
          <AboutItem>
            <AboutItemHeader>How ?</AboutItemHeader>
            <AboutItemParagraph>Because.</AboutItemParagraph>
            <AboutItemParagraph>Because, also.</AboutItemParagraph>
          </AboutItem>
        </div>
        <div>
          <AboutItem>
            <AboutItemHeader>Why ?</AboutItemHeader>
            <AboutItemParagraph>Because, in another card.</AboutItemParagraph>
          </AboutItem>
        </div>
      </div>
    </div>
  </section>
);

export default About;
