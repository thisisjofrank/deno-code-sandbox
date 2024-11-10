import React from "react";
import "./App.css";

function App(props: { children: React.ReactNode }) {
  return (
    <div className="App">
      {props.children}
    </div>
  );
}

export default App;
