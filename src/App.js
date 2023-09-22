import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "./components/Common-fields/input";
function App() {
  const [username, setUsername] = useState(null);

  const [dataSet, setDataSet] = useState([]);

  const [actionName, setActionName] = useState("Add");

  const [indexValue, setIndexValue] = useState(null);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((el) => {
      console.log(el.data.products);
      setProducts(el.data.products);
    });
  }, []);

  useEffect(() => {
    console.log([{ age: 40 }, { age: 20 }].filter((value) => value.age === 40));
  }, []);

  return (
    <div className="App">
      <Input value={username} setValue={setUsername} type="text" />

      <button
        onClick={() => {
          axios
            .post("https://dummyjson.com/posts/add", {
              title: username,
              userId: 5,
            })
            .then((el) => {
              console.log("post", el.data);
            });

          if (actionName === "Add") {
            setDataSet([
              ...dataSet,
              { name: username, age: 18, branch: "CSE" },
            ]);
            setUsername("");
            setActionName("Add");
          } else if (actionName === "Edit") {
            console.log(indexValue);
            setDataSet((prev) => [
              ...prev.map((el, i) => {
                if (i == indexValue) {
                  return { name: username, age: 18, branch: "CSE" };
                } else {
                  return el;
                }
              }),
            ]);
            setUsername("");
            setActionName("Add");
          }
        }}
      >
        {actionName}
      </button>

      {dataSet.map((value, index) => (
        <div>
          {value.name},{value.branch},{index}{" "}
          <button
            onClick={() => {
              setDataSet((prev) => prev.filter((element, i) => i !== index));
            }}
          >
            delete
          </button>
          <button
            onClick={() => {
              setUsername(value.name);
              setActionName("Edit");
              setIndexValue(index);
            }}
          >
            edit
          </button>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100vw",
          justifyContent: "space-evenly",
        }}
      >
        {products.map((value) => (
          <>
            <div style={{ border: "1px solid black" }}>
              <img
                src={value.images[0]}
                style={{ height: "80px", width: "100px" }}
              />
              <h5>{value.title}</h5>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
