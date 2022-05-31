import { combineReducers } from "redux"
import ui from './ui'
import data from './dta'


const rootReducer = combineReducers({
    ui,
    data,
});

export default rootReducer;