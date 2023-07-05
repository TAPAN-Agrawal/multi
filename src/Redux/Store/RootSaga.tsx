import { watcher, worker } from "../Sagas/Saga";
import { call, put, takeLatest, all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([watcher()]);
}