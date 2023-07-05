import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { StateInterface } from "@/Redux/Reducers/Reducer";
import { RootState } from "../../Redux/Store/RootReducer";
import classes from './Login.module.css'
import { addUserCredentials, loginSetter } from "../../Redux/Actions/Action";



function Login() {

  interface Info {
    name: string,
    password: string
  }

  interface ValidateErrorEntity {
    values: { [name: string]: any };
    errorFields: { name: (string | number)[]; errors: string[] }[];
    outOfDate: boolean;
  }




const dispatch = useDispatch()
  // const userName = useSelector((state: RootState) => state.todo.name);
  // const userPassword = useSelector((state: RootState) => state.todo.password);
  const navigate = useNavigate()

  const [info, setInfo] = useState<Info>({ name: "", password: "" });
  const [nameErr, setnameErr] = useState("")
  const [passwordErr, setpasswordErr] = useState("")
  const [err, setErr] = useState("")
  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === "") {
      setnameErr("name cannot be empty")
    }
    else {
      setnameErr("")
      setInfo({ ...info, name: value });
    }
    // console.log(info.name);

  }
  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setpasswordErr("Password cannot be empty");
    } else if (value.length < 8) {
      setpasswordErr("Password should be at least 8 characters long");
    } else if (!/[a-z]/.test(value)) {
      setpasswordErr("Password should contain at least one lowercase letter");
    } else if (!/[A-Z]/.test(value)) {
      setpasswordErr("Password should contain at least one uppercase letter");
    } else if (!/[!@#$%^&*]/.test(value)) {
      setpasswordErr("Password should contain at least one special character (!@#$%^&*)");
    } else {
      setpasswordErr("");
      setInfo({ ...info, password: value });
    }
  };
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    dispatch(loginSetter(info.name))
    // if (info.name === "") {
    //   setnameErr("name cannot be empty")
    // }
    // if (info.password === "") {
    //   setpasswordErr("Password cannot be empty")
    // }
    // if ((userName === info.name)
    //   && (userPassword === info.password)
    //   && (userName !== "")
    //   && (userPassword !== "")
    //   && (nameErr === "")
    //   && (info.name !== "")
    //   && (passwordErr === "")
    //   && (info.password !== "")) {

    //  navigate('/welcome', { state: userName });

    // }
    // else if ((userName === info.name) &&  (userPassword !== info.password) && info.name !== "" && info.password !== ""){
    //   setErr("Password does not match")
    // }
    // else if (info.name !== "" && info.password !== "") {
    //   setErr("invalid user")
    // }
    // else {
    //   console.log("first");

    // }

  };

  const onFinish = (values: ValidateErrorEntity) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={classes.main}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className={classes.forms}

      >

        <h1 className={classes.heading}>Login</h1>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
          className={classes.form_item}
        >
          <Input onChange={nameHandler} />
          <span className={classes.err}>
            {nameErr}

          </span>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          className={classes.form_item}
        >
          <Input.Password onChange={passwordHandler} />
          <span className={classes.err}>

            {passwordErr}<br />
            <span className={classes.err}>{err}</span>
          </span>
        </Form.Item>
        <div className={classes.btnmain}>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} className={classes.form_item}>
            <Button type="primary" htmlType="submit" onClick={submitHandler} className={classes.btn}>
              Submit
            </Button>
          </Form.Item>
          <div className={classes.link}>
            <Link to="/">dont have account register</Link>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Login;
