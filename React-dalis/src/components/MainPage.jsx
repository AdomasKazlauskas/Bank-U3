import { useContext, useEffect, useState } from "react";
import "../BankApp.scss";
import AddNewAccount from "./AddNewAccount";
import AccountListItem from "./AccountListItem";
import sortClients from "../functions/sortClients";
import PopUp from "./PopUp";
import Filter from "./Filter";
import TableTop from "./TableTop";
import { GlobalContext } from "../context/GlobalContext";

const MainPage = () => {
  const { accounts, setStatus } = useContext(GlobalContext);
  const [showPopUp, setShowPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState();
  const [displayedAccounts, setDisplayedAccounts] = useState([]);

  useEffect(() => {
    const sortedAccounts = sortClients(accounts);
    setDisplayedAccounts(sortedAccounts);
  }, [accounts]);

  const handlePopUp = (isOpen, type) => {
    setShowPopUp(isOpen);
    setPopUpType(type);
  };

  return (
    <>
      {showPopUp && <PopUp setShowPopUp={setShowPopUp} type={popUpType} />}
      <section className="frame">
        <AddNewAccount handlePopUp={handlePopUp} setStatus={setStatus} />
        <Filter
          accounts={accounts}
          setDisplayedAccounts={setDisplayedAccounts}
        />
        <table>
          <TableTop />
          <tbody>
            {displayedAccounts.map((account) => (
              <AccountListItem
                key={account.id}
                account={account}
                handlePopUp={handlePopUp}
                setStatus={setStatus}
              />
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default MainPage;
