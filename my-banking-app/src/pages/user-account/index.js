import React, { useState, useEffect } from "react";
import { fetchUserInfo } from "../../app/Services/userSlice.js";
import NavMenuUser from "../../components/nav-bar-user-page/index.js";
import EditUserNameBox from "../../containers/edit-username-box";
import "./../../Style/index.css";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";

const UserAccount = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state)=> state.user.user);
  const [isEditBoxOpen, setIsEditBoxOpen] = useState(false);
  
  const initialUserState = {
    userName: "",
    firstName: "",
    lastName: "",
  };
  const [user, setUser] = useState(initialUserState);

  useEffect(()=> {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo){
      setUser({
        userName: userInfo.userName || "",
        firstName: userInfo.firstName || "",
        lastName: userInfo.lastName || "",
      });
    }
  }, [userInfo]);


  const handleEditButtonClick = () => {
    setIsEditBoxOpen(!isEditBoxOpen);
  };

  return (
    <>
      <NavMenuUser username = {user.userName} />
      <main className="main_bg">
        <div className="header_black">
          {!isEditBoxOpen ? (
            <>
              <h1>
                Welcome back
                <br />
                {user.userName}!
              </h1>

              <button className="edit-button" onClick={handleEditButtonClick}>
                Edit Name
              </button>
            </>
          ) : (
            <EditUserNameBox
              username={user.userName}
              firstName={user.firstName}
              lastName={user.lastName}
              setIsEditBoxOpen={setIsEditBoxOpen}
            />
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
