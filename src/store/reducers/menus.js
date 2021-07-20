import {GET_MENU} from '../actions/menus';

const initialState = {
    requestStatus: '',
    headerMenuInfo: {},
    errors: '',
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_MENU.REQUEST: {
            return {
                ...state,
                requestStatus: 'request',
                headerMenuInfo: {},
            };
        }

        case GET_MENU.SUCCESS: {
            const {data} = action.payload;
            return {
                ...state,
                requestStatus: 'success',
                headerMenuInfo: data,
            };
        }

        case GET_MENU.FAIL: {
            const {data} = action.payload;
            return {
                ...state,
                requestStatus: 'fail',
                errors: data.errors,
            }
        }

        default: {
            return state;
        }
    }
}

