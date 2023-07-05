interface Cred {
  name: string,
  password: string,
  date: string,
  gender: string,
  address: string,
}

export interface AddEdit {
  id?: number,
  Title: string,
  subTitle: string,
 status?: string,
}

export const loginSetter =(data:string)=>{

  return {
    type:"LOGIN_SETTER",
    payload: data
  }
}




export const addUserCredentials = (data: Cred) => {
  return {
    type: "ADD_CRED",
    payload: data,
  }
}

export const getData = () => {
  return {
    type: "GET_DATA",
  }
}
export const getDataId = (id:number) => {
  return {
    type: "GET_DATA_ID",
    payload: id,
  }
}



export const addData = (data: AddEdit) => {

  return {
    type: 'ADD_DATA',
    payload: data
  }
}

export const editData = (data: AddEdit) => {
  return {
    type: 'EDIT_DATA',
    payload: data
  }
}

export const deleteData = (id: number) => {
  return {
    type: 'DELETE_DATA',
    payload: id
  }
}

export const statusChange = (data: AddEdit) => {
  return {
    type: 'STATUS_CHANGE',
    payload: data
  }
}