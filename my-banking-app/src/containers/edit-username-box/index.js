import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo, updateUserName } from "../../app/slices";
import CollapsibleList from "./../../components/dropdown/index";
import "./../edit-username-box/index.css";
import "./../../Style/index.css";

const EditUserNameBox = ({
  userName,
  setUsername,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  setIsEditBoxOpen,
}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.user);
  

  //to fetch user data
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  //update form inputs
  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
    }
  }, [userInfo, setFirstName, setLastName]);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(updateUserName({ userName, firstName, lastName }));
  };

  
  const closeBox = () => {
    setIsEditBoxOpen(false);
  };

  return (
    <CollapsibleList
      className="edit-user-box"
      title="Edit Username"
    
    >
      <h1 className="title">Edit user info</h1>
      <form id="edit-box">
        <div className="form-group">
          <label htmlFor="username">User name:</label>
          <input
            type="text"
            id="username"
            value={userInfo.userName}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter new username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstname">First name:</label>
          <input className="no-edit-field"
            type="text"
            id="firstname"
            value={firstName}
            readOnly
            placeholder={lastName}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last name:</label>
          <input className="no-edit-field"
            type="text"
            id="lastname"
            value={lastName}
            readOnly
            placeholder={lastName}
          />
        </div>
        <div className="form-button">
          <button
            onClick={handleUpdateUser}
            className="edit-button"
            type="submit"
          >
            Save
          </button>
          <button onClick={closeBox} className="edit-button" type="reset" >
            Cancel
          </button>
        </div>
      </form>
    </CollapsibleList>
  );
};

export default EditUserNameBox;
