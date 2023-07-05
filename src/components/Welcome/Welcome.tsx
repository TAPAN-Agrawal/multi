import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import classes from './Welcome.module.css'
import { LeftOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/Store/RootReducer";

function Welcome() {
  const location = useLocation();
  // const name = useSelector((state: RootState)=>state.todo.name)
  const navigate = useNavigate()

  const backHandler = () => {
    navigate("/login")
  }

  return <div style={{ backgroundColor: "rgb(0,28,255)" }}>
    <Button onClick={backHandler} style={{ backgroundColor: "blue", color: "white" }}>Back</Button>
    <div className={classes.main}>
      {/* <h3 className={classes.h3}>Welcome!  {name}</h3><br /><br /> */}
      <Button onClick={() => { navigate("/dashboard") }} className={classes.Button}>Dashboard</Button>

    </div>
  </div>;
}

export default Welcome;
