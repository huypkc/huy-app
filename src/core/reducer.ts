import { combineReducers } from "redux";
import ListReducer from "./reducers/ListReducer";
import NasaReducer from "./reducers/NasaReducer";
const rootReducer = combineReducers({
  ListReducer,
  NasaReducer
});

export default rootReducer;