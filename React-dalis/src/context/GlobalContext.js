import axios from "axios";
import React, { useEffect, useState } from "react";
import { paths } from "../constants/routing";
import { fetchUsers } from "../services/userService";

export const GlobalContext = React.createContext();

export const GlobalContextProvider = ({ children }) => {
  const [route, setRoute] = useState(paths.HOME);
  const [accounts, setAccounts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [authName, setAuthName] = useState(null);

  const fetchAccounts = async () => {
    const accounts = await fetchUsers();
    if (!accounts.length) {
      alert("No users found");
    }
    setAccounts(accounts);
  };

  useEffect(() => {
    const fetchData = async () => await fetchAccounts();
    if (status === "idle" || status === "success") {
      fetchData();
    }
  }, [status]);

  const logOut = () => {
    axios
      .post("http://localhost:3003/logout", {}, { withCredentials: true })
      .then((res) => {
        setRoute(paths.HOME);
        setAuthName(null);
        console.log(res.data);
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        route,
        setRoute,
        accounts,
        setAccounts,
        fetchAccounts,
        status,
        setStatus,
        authName,
        setAuthName,
        logOut,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
