import { useContext } from "react";
import oakLogo from "../assets/oakLogo.png";
import { paths } from "../constants/routing";
import { GlobalContext } from "../context/GlobalContext";
import getTotalCash from "../functions/getTotalCash";

const Header = () => {
  const { accounts, setRoute } = useContext(GlobalContext);
  const totalAmount = getTotalCash(accounts).toFixed(2);

  return (
    <header className="header-container">
      <div className="bank-name">
        <img src={oakLogo} alt="oaklogo" onClick={() => setRoute(paths.HOME)} />
        <h1>OAK CAPITAL LTD</h1>
      </div>
      <div className="header-info">
        <div>Aktyvių klientų skaičius: {accounts.length}</div>
        <div>Saugoma pinigų suma: {totalAmount} €</div>
      </div>
    </header>
  );
};

export default Header;
