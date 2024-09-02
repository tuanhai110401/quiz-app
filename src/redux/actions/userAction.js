const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";

// Action Creators

const fetchUserLoginSuccess = (userData) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: userData,
  };
};

export { FETCH_USER_LOGIN_SUCCESS, fetchUserLoginSuccess };
