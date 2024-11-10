import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as ReactRoutes,
} from "react-router-dom";
import App from "./App.tsx";
import ViewCode from "./pages/ViewCode.tsx";
import EditCode from "./pages/EditCode.tsx";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <ReactRoutes>
          <Route path="/view" element={<ViewCode />} />
          <Route path="/edit/:id" element={<EditCode />} />
          <Route path="/" element={<Navigate to="/view" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </ReactRoutes>
      </App>
    </BrowserRouter>
  </React.StrictMode>,
);
