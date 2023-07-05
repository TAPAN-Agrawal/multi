import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Button, Space, Table, Tag } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { addData, deleteData, editData, getData, getDataId, statusChange } from "../../Redux/Actions/Action";
import { RootState } from "@/Redux/Store/RootReducer";
import classes from './Dashboard.module.css'
import Cardcomp from "../Card/Cardcomp";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

function Dashboard() {

  interface Record {
    id: number,
    Title: string,
    subTitle: string,
    status?: string

  }


  
  interface Info {
    Title: string,
    subTitle: string,
    status?: string
  }


  const username = useSelector((state: RootState) => state.todo.loggedInUser);
  const userId = useSelector((state: RootState) => state.todo.loggedInUserId);
  const todolist = useSelector((state: RootState) => state.todo.temptodo)

  console.log("user das",username);
  
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [info, setInfo] = useState<Info>({ Title: "", subTitle: "", status: "inprogress" });
  const [type, setType] = useState("add");
  const [titleErr, settitleErr] = useState("")
  const [subtitleErr, setsubtitleErr] = useState("")

  const TitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();




    if (value === "") {
      settitleErr("Title is required")
    }
    else {
      settitleErr("")
    }
    setInfo({ ...info, Title: value });
  };
  const subTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === "") {
      setsubtitleErr("SubTitle is required")
    }
    else {
      setsubtitleErr("")
    }
    setInfo({ ...info, subTitle: value });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {

    if (info.Title === "") {
      settitleErr("Title is required")
    }
    if (info.subTitle === "") {
      setsubtitleErr("Subtitle is required")
    }
    if (info.Title !== "" && info.subTitle !== "" && titleErr === "" && subtitleErr === "") {
      setIsModalOpen(false);
      if (type === "add") {
        dispatch(addData(info));


      } else {
        setType("add")
        dispatch(editData(info));
      }
    }

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const addHandler = () => {
    setInfo({ Title: "", subTitle: "", status: "inprogress", })
    settitleErr("")
    setsubtitleErr("")

    showModal()
  }

  const handleEdit = (record: Record) => {
    setIsModalOpen(true);
    setType("edit");
    setInfo(record);
  };
  const handleDelete = (id: number) => {
    dispatch(deleteData(id));
  };

  const backHandler = () => {
    navigate("/welcome");
  }

  const handleStatus = (record: Record) => {
    const newrecord = record;
    if (newrecord.status === "inprogress") {
      newrecord.status = "completed"
    }
    else {
      newrecord.status = "inprogress"
    }

    dispatch(statusChange(newrecord))
  }

  const columns = [
    {
      title: "Task",
      dataIndex: "Title",
    },
    {
      title: "subTask",
      dataIndex: "subTitle",
    },

    {
      title: "Actions",
      render: (record: Record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  // const data = userData;

  useEffect(() => {
console.log("use Effect",userId);

    // dispatch(setid())
    // dispatch(getData());
    dispatch(getDataId(userId));
    console.log("temp",todolist)
  }, []);

  return (

    <div className={classes.main}>
      <Button onClick={backHandler} style={{ backgroundColor: "blue", color: "white" }} className={classes.back}>Back</Button>




      <Button type="primary" onClick={addHandler} style={{ backgroundColor: "blue" }} className={classes.add}>
        ADD
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={classes.inp}>
          <label style={{ marginRight: "22px" }}>Title:</label>
          <input name="title" value={info.Title} onChange={TitleHandler} style={{ marginBottom: "2px" }} />
          <br />
          <span style={{ color: "red" }}>
            {titleErr}
          </span>
        </div>
        {/* <br/> */}
        <div className={classes.inp}>
          <label>subTitle:</label>

          <input name="title" onChange={subTitle} value={info.subTitle} />
          <br />
          <span style={{ color: "red" }}>
            {subtitleErr}
          </span>
        </div>
      </Modal>
      {/* <Table columns={columns} dataSource={data} /> */}
      <div className={classes.todocontainer}>
        {
          todolist.map((item) => (
            <Cardcomp

              id={item.id}
              Title={item.Title}
              subTitle={item.subTitle}
              status={item.status}
              // onEdit={() => { handleEdit(item) }}
              // onDelete={() => { handleDelete(item.id) }}
              // onStatus={() => { handleStatus(item) }}
            />
          ))
        }
      </div>


    </div>
  );
}

export default Dashboard;
