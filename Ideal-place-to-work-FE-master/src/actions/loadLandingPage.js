import Api from "../Api";

export const loadLandingPage = (user) => {
    return async (dispatch, getState) => {
        dispatch({
            type: "SET_LOADING"
        });

        Api.fetch('/home/' + user + '/landingApi').then((response) => {
            dispatch({
                type: "LOAD_API",
                payload: response
            });
            dispatch({
                type: "RESET_LOADING"
            });
            dispatch({
                type: "HIDE_ERROR",
            });
        });
    }
};
