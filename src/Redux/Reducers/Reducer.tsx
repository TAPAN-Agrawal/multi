
interface Action {
    type: string,
    payload: {
        name: string,
        password: string,
        date?: string,
        gender?: string,
        address?: string,
    }

}
export interface Arr {
    id?: number,
    Title: string,
    subTitle: string,
    status?: string
}
export interface U {
    name: string,
    password: string,

    list: Arr[]
}
export interface StateInterface {
    loggedInUser: string,
    loggedInUserId:number ,
    temptodo:any[]
    users: U[]
}




const initialState: StateInterface = {

    loggedInUser: " ",
    loggedInUserId: -1,

    users: [],
    temptodo:[]


}
export const todos = (state: StateInterface = initialState, action: Action) => {
    switch (action.type) {


        // case 'ADD_USER_CREDENTIALS':
        //     return {
        //         ...state,
        //         name: action.payload.name,
        //         password: action.payload.password,
        //         date: action.payload.date,
        //         gender: action.payload.gender,
        //         address: action.payload.address,

        //     }
          case 'ID_SET' :
            return {
                    ...state,
                    loggedInUserId:action.payload
            }


        case 'LOGIN_SETTER':
            return {
                ...state,
                loggedInUser: action.payload
            }


        case 'SET-DATA':
            return {
                ...state,
                temptodo: action.payload
               
            }





        default:
            return state
    }
}