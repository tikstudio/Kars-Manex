import * as categoryAction from "../actions/category";

const initialState = {
    requestStatus: '',
    category: [],
    errors: '',
}

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case categoryAction.GET_CATEGORY.REQUEST: {
            return {
                ...state,
                category: [],
                requestStatus: 'request',
            }
        }
        case categoryAction.GET_CATEGORY.SUCCESS: {
            if (action.payload) {
                return {
                    ...state,
                    requestStatus: 'success',
                    category: action.payload.data,
                }
            }
            return [];
        }
        case categoryAction.GET_CATEGORY.FAIL: {
            return {
                ...state,
                requestStatus: 'fail',
                errors: action.payload.data.errors
            }
        }
        default: {
            return state;
        }
    }
}
