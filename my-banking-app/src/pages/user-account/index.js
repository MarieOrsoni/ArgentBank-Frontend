import React, { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../../components/nav-bar";
import EditUserNameBox from "../../containers/edit-username-box";
import Account from "../../containers/accounts/account";
import "./../../Style/index.css";
import "./index.css";

const accountDetails = [
  { id: 1, title: "Argent Bank Checking (x8349)", balance: "$2,082.79" },
  { id: 2, title: "Argent Bank Savings (x6712)", balance: "$10,928.42" },
  { id: 3, title: "Argent Bank Credit Card (x8349)", balance: "$184.30" },
];

const UserAccount = () => {
  const user = useSelector((state) => state.user.user);
  const [isEditBoxOpen, setIsEditBoxOpen] = useState(false);

  const handleEditButtonClick = () => {
    setIsEditBoxOpen(!isEditBoxOpen);
  };

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="bg-dark">
        <div className="header">
          {!isEditBoxOpen ? (
            <>
              <h1 className="header">
                Welcome back
                <br />
                {user?.userName}!
              </h1>

              <button className="edit-button" onClick={handleEditButtonClick}>
                Edit Name
              </button>
            </>
          ) : (
            <EditUserNameBox setIsEditBoxOpen={setIsEditBoxOpen} />
          )}
        </div>
        <h2 className="sr-only">Accounts</h2>
        {accountDetails.map((account) => (
          <section key={account.id}>
            <Account account={account} />
          </section>
        ))}
      </main>
    </>
  );
};

export default UserAccount;
