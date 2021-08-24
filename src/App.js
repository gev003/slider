import "./App.css";
import { useEffect, useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";

import React from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(0);
  const [background, setBackground] = useState("");

  // function fetchingItems() {
  //   fetch(`https://jsonplaceholder.typicode.com/photos?_limit=5`)
  //     .then((stream) => stream.json())
  //     .then((response) => setData(response));
  // }

  const fetchingItems = async () => {
    let info = localStorage.getItem("info");
    if (!info) {
      const send = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=5`
      );
      const response = await send.json();
      setData(response);
      localStorage.setItem("info", JSON.stringify(response));
    } else {
      setData(JSON.parse(info));
    }
  };

  const incrementTotal = () => {
    setNumber((prev) => {
      return prev + 1;
    });
  };

  const decrementTotal = () => {
    setNumber((prev) => {
      return prev - 1;
    });
  };

  useEffect(() => {
    fetchingItems();
  }, []);

  return (
    <div className="App">
      <div className="content">
        <div className="main">
          <img
            src={data.length && data[number].thumbnailUrl}
            alt="square"
            onClick={() => {
              setBackground(
                `url(${
                  data.length > 0 && data[number].url
                }) no-repeat center center`
              );
            }}
          ></img>
          <span>{data.length && data[number].title}</span>
          <div>
            <button
              type="button"
              onClick={decrementTotal}
              disabled={number <= 0}
            >
              &#8592;
            </button>
            <button
              type="button"
              onClick={incrementTotal}
              disabled={number >= data.length - 1}
            >
              &#8594;
            </button>
          </div>
        </div>
        <div className="divContainer">
          {data.length &&
            data.map((obj, index) => (
              <div
                className={`unCheckedDev ${
                  number === obj.id - 1 ? "checked" : ""
                }`}
                key={obj.id}
                onClick={() => setNumber(obj.id - 1)}
              ></div>
            ))}
        </div>
      </div>
      <div className="content" style={{ background: `${background}` }}></div>
    </div>
  );
}
