import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Routes from "./Routes";

function App() {
  // const [data, setData] = React.useState<any>(null);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   const response = await axios.get("http://localhost:5000/server/api/home");
  //   setData(response.data);
  // };

  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
