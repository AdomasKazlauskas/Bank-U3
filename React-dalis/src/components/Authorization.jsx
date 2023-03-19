import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import LogIn from "./LogIn";

const Authorization = ({ children }) => {
  const [logged, setLogged] = useState(null);
  const { setAuthName } = useContext(GlobalContext);

  useEffect(() => {
    axios
      .get("http://localhost:3003/login", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "ok") {
          setLogged(true);
          setAuthName(res.data.name);
        } else {
          setLogged(false);
          setAuthName(null);
        }
      });
  }, [setAuthName]);

  if (logged) {
    return <>{children}</>;
  }

  if (!logged) {
    return <LogIn />;
  }
};

export default Authorization;
