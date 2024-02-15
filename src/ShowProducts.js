import { useRef, useState } from "react";
import Button from "./Button";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ShowProduct({ product, onCloseProduct, onAddToCart }) {
  function hanldeCloseProduct() {
    onCloseProduct(null);
  }

  window.scrollTo(0, 0);

  return (
    <div className="show-product">
      <Button className="product-back-btn" onClick={hanldeCloseProduct}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>
      <ProductImgs product={product} />
      <ProdtuctInfo product={product} onAddToCart={onAddToCart} />
    </div>
  );
}

function ProductImgs({ product }) {
  const [showMainImg, setShowMainImg] = useState(product.imgMain);
  function handleShowImg(img) {
    setShowMainImg(img);
  }
  return (
    <div className="show-product-sec-imgs">
      <img src={showMainImg} alt="show-main-img" />
      <div className="product-imgs">
        <div>
          <img
            src={product.imgMain}
            onClick={(e) => handleShowImg(e.target.src)}
            alt="show-img-Main"
          />
        </div>

        <div>
          <img
            src={product.imgOne}
            onClick={(e) => handleShowImg(e.target.src)}
            alt="show-img-One"
          />
        </div>

        <div>
          <img
            src={product.imgTwo}
            onClick={(e) => handleShowImg(e.target.src)}
            alt="show-img-two"
          />
        </div>

        <div>
          {" "}
          <img
            src={product.imgThree}
            onClick={(e) => handleShowImg(e.target.src)}
            alt="show-img-Three"
          />
        </div>
      </div>
    </div>
  );
}

function ProdtuctInfo({ product, onAddToCart }) {
  return (
    <div className="show-product-info">
      <h2 className="product-title">{product.title}</h2>
      <div className="price">${product.price}</div>
      <AddProduct product={product} onAddToCart={onAddToCart} />
      <h3 className="title-des">About Product</h3>
      <div className="des">{product.textarea}</div>
    </div>
  );
}

function AddProduct({ product, onAddToCart }) {
  const [numProduct, setNumProduct] = useState(1);
  function handleIncrement() {
    setNumProduct((numProduct) => numProduct + 1);
  }
  function handleDecrement() {
    setNumProduct((numProduct) =>
      numProduct > 1 ? numProduct - 1 : numProduct
    );
  }
  function handleAddProduct() {
    const newProduct = { ...product, numsProduct: numProduct, id: Date.now() };
    onAddToCart(newProduct);
  }
  return (
    <div className="add-product">
      <div className="num-product">
        <Button className="num-product-btn" onClick={handleDecrement}>
          -
        </Button>
        <span>{numProduct}</span>
        <Button className="num-product-btn" onClick={handleIncrement}>
          +
        </Button>
      </div>
      <Button className="product-btn" onClick={handleAddProduct}>
        Add To Card
      </Button>
    </div>
  );
}
