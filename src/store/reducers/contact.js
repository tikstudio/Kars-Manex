import {SEND_MAIL} from '../actions/contact';

const initialState = {
    errors: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SEND_MAIL.REQUEST: {
            return {
                ...state,
            };
        }

        case SEND_MAIL.SUCCESS: {
            return {
                ...state,
            };
        }

        case SEND_MAIL.FAIL: {
            return state
        }

        default: {
            return state;
        }
    }
}

