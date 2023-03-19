import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Header from "./Header";
import Nav from "./Nav";

const TopBar = () => {
  const { route } = useContext(GlobalContext);

  return (
    <>
      <Header />
      {route !== "login" && <Nav />}
    </>
  );
};
export default TopBar;
