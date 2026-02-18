import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./app/styles/index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing #root element: app bootstrap cannot continue.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
