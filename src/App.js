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

  useEffect(() => {
    console.log([{ age: 40 }, { age: 20 }].filter((value) => value.age === 40));
  }, []);

  return (
    <div className="App">
      <Input value={username} setValue={setUsername} type="text" />

      <button
        onClick={() => {
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

      {["harsha", "ashok"].map((value) => (
        <div>{value}</div>
      ))}
    </div>
  );
}

export default App;
