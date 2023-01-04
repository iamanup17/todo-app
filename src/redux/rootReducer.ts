import { combineReducers } from "redux";
import TimerReducer from "./Timer/TimerReducer";
import TodoReducer from "./Todos/TodoReducer";

const rootReducer = combineReducers({
  todos : TodoReducer,
  timer : TimerReducer
});

export default rootReducer;