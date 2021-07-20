import {GET_LOCATION} from '../actions/location';

const initialState = {
    requestStatus: '',
    location: {},
    errors: '',
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_LOCATION.SUCCESS: {
            const {data} = action.payload;
            return {
                ...state,
                requestStatus: 'success',
                location: data.location,
            };
        }

        case GET_LOCATION.FAIL: {
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

