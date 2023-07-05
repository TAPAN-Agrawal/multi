import { combineReducers } from 'redux';
import { StateInterface, todos } from '../Reducers/Reducer';
export const rootReducer = combineReducers({

    todo: todos

})

export type RootState = {
    todo: StateInterface
};