import { Children, useEffect, useRef, useState } from "react";

import Header from "./Components/Header";
import Catogries from "./Components/Categories";
import Information from "./Components/Information";
import ContactUs from "./Components/Contact";
import Brands from "./Components/Brands";
import Cart from "./Components/Cart";
import Footer from "./Components/Footer";
import Shop from "./Components/Shop";

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
      {page === "user" && <Home />}
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
