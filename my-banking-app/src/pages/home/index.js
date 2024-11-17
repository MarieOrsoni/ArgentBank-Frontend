import React from "react";
import DisplayBanner from "../../containers/banner/index.js";
import Feature from "../../containers/features/index.js";
import iconChat from "./../../assets/icon-chat.png";
import iconMoney from "./../../assets/icon-money.png";
import iconSecurity from "./../../assets/icon-security.png";
import NavBar from "./../../components/nav-bar/index.js";

const featureList = [
  {
    id: 1,
    title: "You are our #1 priority",
    image: iconChat,
    alt: "Chat Icon",
    text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
  },
  {
    id: 2,
    title: "More savings means higher rates",
    image: iconMoney,
    alt: "Money icon",
    text: "The more you save with us, the higher your interest rate will be!",
  },
  {
    id: 3,
    title: "Security you can trust",
    image: iconSecurity,
    alt: "Security icon",
    text: "We use top of the line encryption to make sure your data and money is always safe.",
  },
];

function Home() {
  return (
    <>
    <header>
      <NavBar />
    </header>
    
      <main>
        <DisplayBanner />
        <div className="features">
          <h2 className="sr-only">Features</h2>
          {featureList.map((feature) => (
            <Feature feature={feature} key={feature.id} />
          ))}
        </div>
      </main>
    </>
  );
}
export default Home;
