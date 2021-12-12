import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faIgloo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
  return (
    <header className="bg-nord-1 text-nord-5 py-3 px-2">
      <a href="https://github.com/CrispyBaguette/wasm-palette-converter">
        <FontAwesomeIcon
          icon={faGithub}
          className="fa-2x hover:text-nord-7 mx-2"
        />
      </a>
      <a href="https://blog.bruyant.xyz">
        <FontAwesomeIcon
          icon={faIgloo}
          className="fa-2x hover:text-nord-7 mx-2"
        />
      </a>
    </header>
  );
}
export default Header;
