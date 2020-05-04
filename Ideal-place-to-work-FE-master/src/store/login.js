
import { createStore} from "redux";
import reducer from "../reducers/loginReducer";

const initialState ={
    userToken: undefined
};

export default function configureStore() {
    return createStore(reducer, initialState)
}
