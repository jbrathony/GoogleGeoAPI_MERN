import Api from "../Api";

export const loadDetailsPage = (user) => {
    return async (dispatch, getState) => {
        dispatch({
            type: "SET_LOADING"
        });

        Api.fetch('/details/' + user).then((response) => {
            dispatch({
                type: "LOAD_DETAILS",
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
