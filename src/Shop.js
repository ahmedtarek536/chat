import {
  faCartPlus,
  faChevronRight,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
// import Button from "./Button";
import Filter from "./Filter";
import SecProducts from "./Products";
import ShowProduct from "./ShowProducts";

export default function Shop({ onAddToCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducs] = useState([]);
  //   const [showProduct, setShowProduct] = useState(null)
  const [openProduct, setIsOpenProduct] = useState(null);
  const filterProductsWithoutSort = useRef([]);
  const optionFilter = useRef({});
  const valSort = useRef("Sort by");
  function handleIsOpenFilter() {
    setIsOpen((v) => !v);
  }

  function SortProducts(val, arrwithout = filterProductsWithoutSort.current) {
    valSort.current = val || valSort.current;
    const value = valSort.current;

    let arr = [...arrwithout];
    if (value === "Low To High") arr.sort((a, b) => a.price - b.price);
    if (value === "Hight To Low") arr.sort((a, b) => b.price - a.price);
    // if (value === "Popularity" || value === "Sort by") arr = [...arrwithout];

    setFilterProducs(() => arr);
  }

  function handleSetOptionFilter(op) {
    if (op === "clear") {
      optionFilter.current = {};
    }
    let allProducts = [];
    optionFilter.current[op] = optionFilter.current[op] ? "" : op;

    products.forEach((product) => {
      for (let option in optionFilter.current) {
        if (option === "" || option[0] === "$") continue;

        if (product.category === optionFilter.current[option])
          allProducts.push(product);
      }
    });

    if (
      optionFilter.current["All"] ||
      optionFilter.current["Men & Women's"] ||
      allProducts.length === 0
    )
      allProducts = products;

    let textss = [];

    allProducts.forEach((product) => {
      for (let option in optionFilter.current) {
        if (option[0] !== "$") continue;

        if (
          +product.price >=
            parseInt(optionFilter.current[option].split(" - ")[0].slice(1)) &&
          +product.price <
            parseInt(optionFilter.current[option].split(" - ")[1].slice(1))
        )
          textss.push(product);
      }
    });
    if (textss.length === 0) textss = allProducts;

    filterProductsWithoutSort.current = textss;
    SortProducts(valSort.current, textss);
  }

  useEffect(function () {
    async function getProducts() {
      const res = await fetch(
        `https://ahmedtarek536.github.io/Ecommerce-App/data.json`
      );
      const data = await res.json();
      setProducts(data);
      setFilterProducs(data);
      filterProductsWithoutSort.current = data;
    }
    getProducts();
  }, []);
  window.scrollTo(0, 0);

  return (
    <>
      {openProduct ? (
        <ShowProduct
          product={openProduct}
          onCloseProduct={setIsOpenProduct}
          onAddToCart={onAddToCart}
        />
      ) : (
        <div className="shop">
          <Filter
            onClick={handleIsOpenFilter}
            isOpen={isOpen}
            onSetOption={handleSetOptionFilter}
            optionFilter={optionFilter}
          />
          <SecProducts
            products={filterProducts}
            onSort={SortProducts}
            onClick={handleIsOpenFilter}
            onOpenProduct={setIsOpenProduct}
          />
        </div>
      )}
    </>
  );
}
