import { Children, useEffect, useRef, useState } from "react";
import {
  faArrowLeft,
  faArrowRight,
  faCartPlus,
  faChevronRight,
  faFilter,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header, Logo } from "./Header";
import Catogries from "./Categories";
import Information from "./Information";
import ContactUs from "./Contact";
import Brands from "./Brands";
import Cart from "./Cart";
import Footer from "./Footer";
import Shop from "./Shop";

import {
  faFacebook,
  faInstagram,
  faTelegram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Button from "./Button";
import { clear } from "@testing-library/user-event/dist/clear";

export default function App() {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [page, setPage] = useState("home");

  function handlAddProductToCart(pro) {
    let isHere = cartProducts.find((p) => p.title === pro.title);

    if (!isHere) setCartProducts((products) => [...products, pro]);
    else {
      setCartProducts((products) =>
        products.map((product) =>
          product.title === pro.title
            ? { ...product, numsProduct: product.numsProduct + pro.numsProduct }
            : product
        )
      );
    }
  }
  return (
    <>
      {page !== "contact" && (
        <Header setCartIsOpen={setCartIsOpen} setPage={setPage} />
      )}
      {
        <Cart
          cartIsOpen={cartIsOpen}
          setCartIsOpen={setCartIsOpen}
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
        />
      }
      {page === "home" && <Home />}
      {page === "contact" && <ContactUs setPage={setPage} />}
      {page === "shop" && <Shop onAddToCart={handlAddProductToCart} />}
      {page !== "contact" && <Footer />}
    </>
  );
}
function Home() {
  window.scrollTo(0, 0);
  return (
    <>
      <Catogries />
      <Brands />
      <Information />
    </>
  );
}

// function User() {
//   <div className="sec-user">
//     <div className="user-form">
//       <h2>Create an account</h2>
//       <p>Let's get started with 20% off</p>
//       <input type="text" placeholder="Name" />
//       <input type="email" placeholder="Email" />
//       <input type="password" placeholder="Password" />
//       <
//     </div>
//   </div>;
// }
