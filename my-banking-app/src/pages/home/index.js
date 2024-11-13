import React from "react";
import DisplayBanner from "../../containers/banner/index.js";
import Feature from "../../containers/features/index.js";
import NavBar from "../../components/nav-bar/index.js";

function Home() {
  return (
    <> 
    <header>
    <NavBar/>
    </header>
       <main>
      <DisplayBanner />
      <Feature />
    </main>
    </>
  );
}
export default Home;
