import "./BankApp.scss";
import TopBar from "./components/TopBar";
import Routes from "./components/Routes";
import { GlobalContextProvider } from "./context/GlobalContext";

function Frame() {
  return (
    <GlobalContextProvider>
      <TopBar />
      <Routes />
    </GlobalContextProvider>
  );
}

export default Frame;
