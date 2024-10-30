import React from "react";
import LoginForm from "../../containers/sign-in-box";
import NavBar from "../../components/nav-bar";

import "./index.css";

function SignIn() {
  return (
    <> 
    <NavBar/> 
    <main className="sign-in-dark">
      <LoginForm />
    </main>
    </>
  );
}

export default SignIn;
