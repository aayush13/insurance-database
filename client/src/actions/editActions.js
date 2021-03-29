import * as ActionTypes from '../constants/actionTypes';

const setRecord = (data) => (dispatch) => {
    dispatch({
        type : ActionTypes.SELECTED_RECORD,
        payload : data
    });
};

const updatePageRef =(data) => (dispatch) => {
    dispatch({
        type : ActionTypes.UPDATE_PAGE,
        payload : data
    })
}

export default {
    setRecord,
    updatePageRef
}