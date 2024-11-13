import React, { useState } from "react";
import { useSelector } from "react-redux";
import NavMenuUser from "../../components/nav-bar-user-page/index.js";
import EditUserNameBox from "../../containers/edit-username-box";
import "./../../Style/index.css";
import "./index.css";

const UserAccount = () => {
  const user = useSelector((state) => state.user.user);
  const [isEditBoxOpen, setIsEditBoxOpen] = useState(false);

  const handleEditButtonClick = () => {
    setIsEditBoxOpen(!isEditBoxOpen);
  };

  return (
    <>
    <header>
      <NavMenuUser />
      </header>
      <main className="main_bg">
        <div className="header_black">
          {!isEditBoxOpen ? (
            <>
              <h1>
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
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <i className="fa-solid fa-chevron-right"></i>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserAccount;
