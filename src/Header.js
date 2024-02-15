import { useState } from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faCartShopping,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Header({ setCartIsOpen, setPage }) {
  return (
    <header>
      <Logo />
      <Search />
      <Pages setCartIsOpen={setCartIsOpen} setPage={setPage} />
    </header>
  );
}

export function Logo() {
  return (
    <div className="logo">
      <img
        className="logo-img"
        src="https://647a9a5d1de3802bb76b0dcc--adorable-panda-b90c31.netlify.app/static/media/fakeStore.9a660ee44c91177dd555.png"
        alt="logo"
      />
      <h1>tom</h1>
    </div>
  );
}

function Search() {
  return (
    <div className="search">
      <input
        className="input-search"
        type="text"
        placeholder="Search for Products..."
      />
      <button className="btn-search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
}

function Pages({ setCartIsOpen, setPage }) {
  const [pagesIsOpen, setPagesIsOpen] = useState(false);
  function handlePages() {
    setPagesIsOpen((val) => !val);
  }
  function handleOpenPage(page) {
    setPage(page);
    setPagesIsOpen(false);
  }

  function handleopenCart() {
    setCartIsOpen((v) => !v);
  }

  return (
    <>
      <FontAwesomeIcon className="bars" icon={faBars} onClick={handlePages} />
      <ul className={`pages ${pagesIsOpen ? " active" : ""}`}>
        <li className="mark">
          <FontAwesomeIcon icon={faXmark} onClick={handlePages} />
        </li>
        <li value="home" onClick={() => handleOpenPage("home")}>
          Home
        </li>
        <li value="shop" onClick={() => handleOpenPage("shop")}>
          Shop
        </li>
        <li value="contact" onClick={() => handleOpenPage("contact")}>
          Contact
        </li>
        <li value="user" onClick={() => handleOpenPage("user")}>
          <FontAwesomeIcon className="user-icon" icon={faUser} />
        </li>
        <li value="cart" onClick={handleopenCart}>
          <FontAwesomeIcon className="cart-icon" icon={faCartShopping} />
        </li>
      </ul>
    </>
  );
}
