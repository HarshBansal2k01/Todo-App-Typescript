import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { TodosProvider } from "./store/Todos";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TodosProvider>
        {/* now we can easily access the data from anywhere */}
        <App />
      </TodosProvider>
    </BrowserRouter>
  </React.StrictMode>
);
