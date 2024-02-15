/// filter
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Filter({ onClick, isOpen, onSetOption, optionFilter }) {
  let filterOpations = [
    {
      title: "Categories",
      options: ["Women's Clothes", "Men Clothes", "Men & Women's", "All"],
    },
    {
      title: "Price",
      options: [
        "$0.00 - $50.00",
        "$50.00 - $100.00",
        "$100.00 - $150.00",
        "$150.00 - $200.00",
      ],
    },
    { title: "Size", options: ["M", "S", "L", "XL"] },
  ];

  function handleClearOptions() {
    // onSetOption("clear");
    onClick();
  }

  return (
    <div className={`filter ${isOpen ? "active" : ""}`}>
      {filterOpations.map((val, i) => (
        <FilOptions
          title={val.title}
          filItems={val.options}
          key={i}
          onSetOption={onSetOption}
          optionFilter={optionFilter}
        />
      ))}

      <div className={`filter-btns`}>
        <Button className="filter-apply" onClick={onClick}>
          Apply
        </Button>
        <Button className="filter-clear" onClick={handleClearOptions}>
          Close
        </Button>
      </div>
    </div>
  );
}

function FilOptions({ title, filItems, onSetOption, optionFilter }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="filter-categorie">
      <div className="filter-categorie-header">
        <h3>{title}</h3>
        <FontAwesomeIcon
          onClick={() => setIsOpen((v) => !v)}
          className={`filter-categorie-icon${isOpen ? "-active" : ""}`}
          icon={faChevronRight}
        />
      </div>
      <div className={`filter-categorie-content  ${isOpen ? "active" : ""}`}>
        {filItems.map((item, i) => (
          <Option
            key={i}
            text={item}
            optionFilter={optionFilter}
            onSetOption={onSetOption}
          />
        ))}
      </div>
    </div>
  );
}

function Option({ text, onSetOption, optionFilter }) {
  const [isChecked, setIsChecked] = useState(optionFilter.current[text]);
  function handleCheckBox() {
    onSetOption(text);
    setIsChecked(optionFilter.current[text]);
  }
  return (
    <div className="filter-categorie-content-item">
      <input type="checkbox" checked={isChecked} onChange={handleCheckBox} />
      <label htmlFor="">{text}</label>
    </div>
  );
}
