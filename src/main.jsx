import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { RepairContextProvider } from "./contexts/RepairContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthContextProvider>
    <RepairContextProvider>
      <App />
    </RepairContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
