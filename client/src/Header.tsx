import { faIgloo, faCodeBranch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ThemeToggler from "./ThemeToggler";

function Header() {
  return (
    <header className="bg-nord-1 text-nord-5 py-3 px-2">
      <div className="flex container items-center mx-auto">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://gitea.bruyant.xyz/alexandre/PaletteSwitcher"
        >
          <FontAwesomeIcon
            icon={faCodeBranch}
            className="fa-2x hover:text-nord-7 mx-2"
          />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://blog.bruyant.xyz"
        >
          <FontAwesomeIcon
            icon={faIgloo}
            className="fa-2x hover:text-nord-7 mx-2"
          />
        </a>
        <span className="text-sm">
          Powered by{" "}
          <a
            href="https://ipfs.io"
            target="_blank"
            rel="noreferrer"
            className="bg-nord-5 text-nord-1 hover:bg-nord-7 px-1 "
          >
            IPFS
          </a>
          . Visit using your own node !
        </span>
        <span className="ml-auto">
          <ThemeToggler />
        </span>
      </div>
    </header>
  );
}
export default Header;
