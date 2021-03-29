// import ACTIONS constants 
import * as ActionTypes from '../constants/actionTypes';

let initialState = {
    editRecord : {},
    pageRef: 1
}

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SELECTED_RECORD : 
            return {
                ...state,
                editRecord: {...action.payload}
            };
        case ActionTypes.UPDATE_PAGE : 
            return {
                ...state,
                pageRef: action.payload
            };
            default:
                return state;
    }
}

