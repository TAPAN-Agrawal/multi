import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button, DatePicker, Form, Input, Radio } from "antd";
import { useDispatch } from 'react-redux';
import { addUserCredentials } from "../../Redux/Actions/Action";
import { Link, useNavigate } from "react-router-dom";
import classes from './Register.module.css'
import TextArea from "antd/es/input/TextArea";
import { RadioChangeEvent } from "antd/lib/radio";
import moment from "moment";
import { useSelector } from "react-redux";

import { RootState } from '@/Redux/Store/RootReducer';


function Register() {

  interface Info {
    name: string,
    password: string,
    date: string,
    gender: string,
    address: string,
  }

  interface ValidateErrorEntity {
    values: { [name: string]: any };
    errorFields: { name: (string | number)[]; errors: string[] }[];
    outOfDate: boolean;
  }


  const dispatch = useDispatch();
  // const credentialsName = useSelector((state: RootState) => state.todo.name)
  // const credentialsPass = useSelector((state: RootState) => state.todo.password)

  const navigate = useNavigate()


  const [info, setInfo] = useState<Info>({ name: " ", password: " ", date: "", gender: "", address: "" });

  const [nameErr, setnameErr] = useState("")
  const [passwordErr, setpasswordErr] = useState("")
  const [dateErr, setdateErr] = useState("")
  const [genderErr, setgenderErr] = useState("")
  const [addressErr, setaddressErr] = useState("")
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

  }
  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === "") {
      setpasswordErr("Password cannot be empty");
    } else if (value.length < 8) {
      setpasswordErr("Password must be at least 8 characters long");
    } else if (!/[a-z]/.test(value)) {
      setpasswordErr("Password must contain at least one lowercase letter");
    } else if (!/[A-Z]/.test(value)) {
      setpasswordErr("Password must contain at least one uppercase letter");
    } else if (!/[!@#$%^&*]/.test(value)) {
      setpasswordErr("Password must contain at least one special character (!@#$%^&*)");
    } else {
      setpasswordErr("");
      setInfo({ ...info, password: value });
    }
  };

  const dateHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    console.log("first", typeof (value));

    if (value === "") {
      setdateErr("date cannot be empty");
    }
    else {
      setdateErr("")
      setInfo({ ...info, date: value });
    }

  }

  const genderHandler = (e: RadioChangeEvent) => {

    const value = e.target.value;
    if (value === "") {
      setgenderErr("gender cannot be empty");
    }
    else {
      setgenderErr("");
      setInfo({ ...info, gender: value });
    }

  }
  const addressHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value === "") {
      setaddressErr("address cannot be empty")
    }
    else {
      setaddressErr("")
      setInfo({ ...info, address: value })
    }
  }

  // const dupliate = () => {
  //   if (info.name === credentialsName) {
  //     setErr("user  already exists")
      
  //   }
  //   else {
  //     setErr("")
      
  //   }

  // }

  const submitHandler = (e: FormEvent) => {

    e.preventDefault();

    if (info.name === " ") {
      setnameErr("name cannot be empty")
    }
    if (info.password === " ") {
      setpasswordErr("Password cannot be empty")
    }
    if (info.date === "") {
      setdateErr("date cannot be empty")
    }
    if (info.gender === "") {
      setgenderErr("gender cannot be empty")
    }
    if (info.address === "") {
      setaddressErr("Address cannot be empty")
    }

  //   if ((nameErr === "") && (info.name !== " ")
  //   && (passwordErr === "") && (info.password !== " ")
  //   && (dateErr === "") && (info.date !== "")
  //   && (genderErr === "") && (info.gender !== "")
  //   && (addressErr === "") && (info.address !== "")
  //   && (info.name !== credentialsName)
  // ) {
 
  
  //   dispatch(addUserCredentials(info))
  //   navigate("/login")
  
     
  // }
  // else if(
  //   (nameErr === "") && (info.name !== " ")
  //   && (passwordErr === "") && (info.password !== " ")
  //   && (dateErr === "") && (info.date !== "")
  //   && (genderErr === "") && (info.gender !== "")
  //   && (addressErr === "") && (info.address !== "")
  //   && (info.name === credentialsName)
  // ){
  //   alert("user already axists")
  // }
  // else{

  // }

  if ((nameErr === "") && (info.name !== " ")
  && (passwordErr === "") && (info.password !== " ")
  && (dateErr === "") && (info.date !== "")
  && (genderErr === "") && (info.gender !== "")
  && (addressErr === "") && (info.address !== "")
  
) {


  dispatch(addUserCredentials(info))
  navigate("/login")

   
}

else{

}


   


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

        <h1 className={classes.heading}>Register</h1>

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

            {passwordErr}
          </span>
        </Form.Item >
        <Form.Item label="Birthday" className={classes.form_item}>
          <Input type="date" onChange={dateHandler} defaultValue=" " /><br />
          <span className={classes.err}>

            {dateErr}
          </span>

        </Form.Item>

        <Form.Item label="Gender" name="radio" className={classes.form_item}>
          <Radio.Group onChange={genderHandler}
          >
            <Radio value="Male"> Male </Radio>
            <Radio value="Female"> Female </Radio>
          </Radio.Group><br />
          <span className={classes.err}>

            {genderErr}
          </span>
        </Form.Item>
        <Form.Item label="Address" name="textarea" className={classes.form_item} style={{ height: "15vh" }}>
          <TextArea rows={4} onChange={addressHandler} /><br />
          <span className={classes.err}>

            {addressErr}
          </span>
          <span className={classes.err}>

            {err}
          </span>
        </Form.Item>
        <div className={classes.btn}>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
            <Button type="primary" htmlType="submit" onClick={submitHandler} >
              Submit
            </Button>
          </Form.Item>
          <Link to="/login"> have account login?</Link>

        </div>


      </Form>
    </div>
  );
}

export default Register;
