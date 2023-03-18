import { useState } from "react";
import Button from "./components/Button";
import axios from "axios";

const Cookie = () => {
  const [text, setText] = useState("");

  const set = (_) => {
    axios
      .post("http://localhost:3003/cookie", { text }, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      });
  };

  const del = (_) => {
    axios
      .post(
        "http://localhost:3003/cookie",
        { delete: true },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div className="cookie-manager">
      <div className="cookie-card">
        <div className="cookie-card-header"> Cookie Header </div>
        <div className="cookie-body">
          <h5 className="cookie-name"> Cookie text</h5>
          <div>
            <label className="card-label">NEW Cookie TEXT</label>
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
            ></input>
          </div>
          <Button label="Cookie" onClick={set}>
            Set
          </Button>
          <Button label="Delete" onClick={del}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cookie;
