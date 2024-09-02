import { FETCH_USER_LOGIN_SUCCESS } from "../actions/userAction";
const initialState = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    image: "",
    role: "",
  },
  isAuthenticated: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return { ...state, account: action.payload, isAuthenticated: true };
    default:
      return state;
  }
}

export default userReducer;
