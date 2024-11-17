import React from "react";


import "./../../Style/index.css";


function Feature({feature}) {
  return (
   
        <div className="feature-item">
          <img src={feature.image} alt={feature.alt} className="feature-icon" />
          <h3 className="feature-item-title">{feature.title}</h3>
          <p>{feature.text}</p>
        </div>

  );
}
export default Feature;
