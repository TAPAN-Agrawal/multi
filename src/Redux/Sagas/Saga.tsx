import { call, put, select, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { AddEdit, loginSetter } from "../Actions/Action";

// import * as dotenv from "dotenv"
// dotenv.config()


interface ResponseData {
  id: number;
  Title: string;
  subTitle: string;
  status?: boolean;
  list:any[]
}

interface ActionAddData {
  type: string,
  payload: AddEdit

}
interface ActionDeleteData {
  type: string,
  payload: number
}

interface Status {
  type: string,
  payload :number
}
export function* workerid(action:any) {
  const id =action.payload
  try {
    const response: AxiosResponse<ResponseData> = yield call(
      axios.get,
      `http://localhost:3001/data/${id}`
    );
let arrays=response.data.list
    console.log("data presented",arrays);
    yield put({ type: "SET-DATA", payload: arrays });
  } catch (error) {
    // Handle the error
  }
}

export function* worker() {
  try {
    const response: AxiosResponse<ResponseData> = yield call(
      axios.get,
      "http://localhost:3001/data"
    );

    console.log("api called here data:", process.env.REACT_APP_API_URL);
    // yield put({ type: "SET-DATA", payload: response.data });
  } catch (error) {
    // Handle the error
  }
}


export function* workercred (action:any){

  const names =action.payload.name;
  const passwords=action.payload.password;
  const us={
    name:names,
    password:passwords,
    list:[]
  }

   yield call(
    axios.post,
    "http://localhost:3001/data",
    us
  );

  
}

export function* addworker(action: ActionAddData) {
  const loggedInUser: AxiosResponse<any> = yield select((state) => state.todo.loggedInUser);
  console.log("logs", loggedInUser);
  const data = action.payload;
  const response: AxiosResponse<ResponseData> = yield call(axios.get, "http://localhost:3001/data");
  let resp: any = response.data;
  const obj = resp.find((x: any) => x.name === loggedInUser);
  const id = obj.id;
  console.log("id got", id);

  const newItem = {
    id: Date.now(), // Generate a new ID using the current timestamp
    ...data,
  };

  obj.list.push(newItem);

  yield call(axios.put, `http://localhost:3001/data/${id}`, obj);
}



export function* editworker(action: ActionAddData) {

  try {
    const id = action.payload.id
    const data = action.payload
    yield call(
      axios.put,
      `http://localhost:3001/data/${id}`,
      data
    )
    yield call(worker)
    console.log("edit worker", data);

  } catch (error) {

  }
}

export function* editstatus(action:ActionAddData){
  try {
    const id = action.payload.id
    const data = action.payload
    yield call(
      axios.put,
      `http://localhost:3001/data/${id}`,
      data
    )
    yield call(worker)
    console.log("edit worker", data);

  } catch (error) {

  }

}

export function* deleteworker(action: ActionDeleteData) {

  try {
    const id = action.payload
    yield call(
      axios.delete,
      `http://localhost:3001/data/${id}`
    )
    yield call(worker)

  } catch (error) {

  }
}

export function* loginsetter(action:any)
{
  const response: AxiosResponse<ResponseData> = yield call(axios.get, "http://localhost:3001/data");
  let resp: any = response.data;
  const obj = resp.find((x: any) => x.name === action.payload);
  const id = obj.id;
  console.log("id got login setter", id);
  yield put ({type:"ID_SET",payload:id})
  
}


export function* watcher() {
  yield takeLatest("ADD_CRED",workercred)
  yield takeLatest("GET_DATA", worker);
  yield takeLatest("GET_DATA_ID",workerid)
  yield takeLatest("ADD_DATA", addworker);
  yield takeLatest("DELETE_DATA", deleteworker);
  yield takeLatest("EDIT_DATA", editworker);
  yield takeLatest("STATUS_CHANGE",editstatus)
  yield takeLatest("LOGIN_SETTER",loginsetter)
}
