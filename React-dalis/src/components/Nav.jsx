import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { paths } from "../constants/routing";

const Nav = () => {
  const { route, setRoute, authName, logOut } = useContext(GlobalContext);

  console.log(authName);

  return (
    <nav>
      <ul className="navbar">
        <div className="nav-menu">
          <li className="nav-item">
            <button
              onClick={() => setRoute(paths.HOME)}
              className={"nav-link" + (route === paths.HOME ? " active" : "")}
            >
              Home
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => setRoute(authName ? paths.ACCOUNTS : paths.LOGIN)}
              className={
                "nav-link" + (route === paths.ACCOUNTS ? " active" : "")
              }
            >
              Accounts
            </button>
          </li>
        </div>
        <li className="nav-item">
          {authName ? (
            <>
              <span>
                <b>{authName}</b>
              </span>
              <button className="nav-link" onClick={logOut}>
                LogOut
              </button>
            </>
          ) : (
            <button
              onClick={() => setRoute(paths.LOGIN)}
              className={"nav-link" + (route === paths.LOGIN ? " active" : "")}
            >
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
