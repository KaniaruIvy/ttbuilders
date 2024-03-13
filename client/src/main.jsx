import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Auth0Provider} from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-yoj2e2mu5bmlatbn.us.auth0.com"
    clientId="ORz32kwrjQmBi7rZYfBo1zFkcB34FHv2"
    authorizationParams={{
      redirect_uri:"https://supreme-adventure-559vjrp4pj62xj7-5173.app.github.dev"
    }}
    audience="http://localhost:8000"
    scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
