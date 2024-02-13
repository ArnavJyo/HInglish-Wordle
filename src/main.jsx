import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "../contexts/ThemeContext.jsx";
import { ScoreProvider } from "../contexts/ScoreContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <ScoreProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ScoreProvider>
  </ThemeProvider>
);
