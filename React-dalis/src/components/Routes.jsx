import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Authorization from "./Authorization";
import { paths } from "../constants/routing";
import HomePage from "./HomePage";
import LogIn from "./LogIn";
import MainPage from "./MainPage";

const Routes = () => {
  const { route } = useContext(GlobalContext);

  switch (route) {
    case paths.LOGIN:
      return <LogIn />;
    case paths.HOME:
      return <HomePage />;
    case paths.ACCOUNTS:
      return (
        <Authorization>
          <MainPage />
        </Authorization>
      );
    default:
      return null;
  }
};

export default Routes;
