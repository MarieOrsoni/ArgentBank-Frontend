import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/Store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import Footer from "./components/footer";

import "./Style/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <Footer />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
