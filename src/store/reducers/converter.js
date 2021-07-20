import * as actionTypes from "../actions/converter";

const initialState = {
    requestStatus: '',
    currencyNames: '',
    rateInfo: '',
}

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case actionTypes.GET_CURRENCY.REQUEST: {
            return {
                ...state,
                currencyNames: '',
                requestStatus: 'request',
            }
        }
        case actionTypes.GET_CURRENCY.SUCCESS: {
            return {
                ...state,
                requestStatus: 'success',
                currencyNames: action.payload.data
            }
        }
        case actionTypes.GET_RATES.REQUEST: {
            return {
                ...state,
                rateInfo: '',
                requestStatus: 'request',
            }
        }
        case actionTypes.GET_RATES.SUCCESS: {
            return {
                ...state,
                requestStatus: 'success',
                rateInfo: action.payload.data
            }
        }
        case actionTypes.GET_RATES.FAIL: {
            return {
                ...state,
                requestStatus: 'fail',
            }
        }
        default: {
            return state;
        }
    }
}
