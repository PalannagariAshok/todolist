import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "./components/Common-fields/input";
function App() {
  const [username, setUsername] = useState(null);
  const [companyname, setCompanyname] = useState(null);
  const [ownerEmail, setOwnerEmail] = useState(null);
  const [rollNo, setRollNo] = useState(null);
  const [accessCode, setAccessCode] = useState(null);
  const [clientID, setclientID] = useState(null);
  const [clientSecret, setclientSecret] = useState(null);
  const [dataSet, setDataSet] = useState([]);

  const [actionName, setActionName] = useState("Add");

  const [indexValue, setIndexValue] = useState(null);

  const [products, setProducts] = useState([]);

  const [trains, setTrains] = useState([]);
  useEffect(() => {}, []);

  useEffect(() => {
    console.log([{ age: 40 }, { age: 20 }].filter((value) => value.age === 40));
  }, []);

  return (
    <div className="App">
      <div>
        <label>Company Name</label>{" "}
        <Input value={companyname} setValue={setCompanyname} type="text" />
      </div>
      <div>
        <label>Owner Name</label>{" "}
        <Input value={username} setValue={setUsername} type="text" />
      </div>
      <div>
        <label>Roll No</label>{" "}
        <Input value={rollNo} setValue={setRollNo} type="text" />
      </div>
      <div>
        <label>Owner Email</label>{" "}
        <Input value={ownerEmail} setValue={setOwnerEmail} type="text" />
      </div>
      <div>
        <label>Access Code</label>{" "}
        <Input value={accessCode} setValue={setAccessCode} type="text" />
      </div>
      <button
        onClick={() => {
          axios
            .post("http://20.244.56.144/train/register", {
              companyName: companyname,
              ownerName: username,
              rollNo: rollNo,
              ownerEmail: ownerEmail,
              accessCode: accessCode,
            })
            .then((el) => {
              console.log("post", el.data);
              setclientID(el.data.clientID);
              setclientSecret(el.data.clientSecret);
              axios
                .post("http://20.244.56.144/train/auth", {
                  companyName: companyname,
                  ownerName: username,
                  rollNo: rollNo,
                  ownerEmail: ownerEmail,
                  clientID: el.data.clientID,
                  clientSecret: el.data.clientSecret,
                })
                .then((value) => {
                  axios.defaults.headers.common[
                    "Authorization"
                  ] = `Bearer ${value.data.access_token}`;
                })
                .catch((el) => {
                  alert(el.message);
                });
            })
            .catch((el) => {
              alert(el.message);
            });
        }}
      >
        register
      </button>

      {clientID !== null && (
        <button
          onClick={() => {
            axios.get("http://20.244.56.144/train/trains").then((el) => {
              console.log(el);
              setTrains(el.data);
            });
          }}
        >
          View Trains
        </button>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100vw",
          justifyContent: "space-evenly",
        }}
      >
        {trains.map((el) => (
          <div
            style={{
              width: "100px",
              height: "100px",
              border: "1px solid black",
            }}
            onClick={() => {
              axios
                .get("http://20.244.56.144/train/trains/" + el.trainNumber)
                .then((el) => {
                  console.log("single train", el);
                });
            }}
          >
            train name:{el.trainName}
            <div>train no:{el.trainNumber}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
