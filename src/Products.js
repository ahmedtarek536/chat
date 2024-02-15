//// products
import { faCartPlus, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
export default function SecProducts({
  products,
  onClick,
  onSort,
  onOpenProduct,
}) {
  return (
    <div className="main-shop">
      <HeaderProducts
        numProducts={products.length}
        onSort={onSort}
        onClick={onClick}
      />
      <Products products={products} onOpenProduct={onOpenProduct} />
    </div>
  );
}

function HeaderProducts({ onClick, numProducts, onSort }) {
  const [select, setSelect] = useState("Sort by");
  function handleSelect(e) {
    setSelect(e.target.value);
    onSort(e.target.value);
  }
  return (
    <div className="header-shop">
      <div className="filter-header-info">
        <div className="filter-icon" onClick={onClick}>
          {" "}
          <FontAwesomeIcon icon={faFilter} /> Filter
        </div>
        <div className="products-num">{numProducts} Products</div>
      </div>
      <select value={select} onChange={(e) => handleSelect(e)}>
        <option value="Sort by">Sort by</option>
        <option value="Low To High">Low To High</option>
        <option value="Hight To Low">High To Low</option>
        <option value="Popularity">Popularity</option>
      </select>
    </div>
  );
}

function Products({ products, onOpenProduct }) {
  return (
    <div className="products">
      {products.map((product, i) => (
        <Product product={product} onOpenProduct={onOpenProduct} key={i} />
      ))}
    </div>
  );
}

function Product({ product, onOpenProduct }) {
  function showProduct() {
    onOpenProduct(product);
  }

  return (
    <div className="product">
      <img src={product.imgMain} alt="product-img" />
      <p className="product-brand">adidas</p>
      <h3 className="product-name">{product.title}</h3>
      <div className="product-info">
        <div className="product-price">${product.price}</div>
        <FontAwesomeIcon
          className="btn shop-show-btn"
          onClick={showProduct}
          icon={faCartPlus}
        />
      </div>
    </div>
  );
}
