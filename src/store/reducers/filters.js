import {GET_HOME_FILTER, GET_CAR_FILTER, GET_SHOP_FILTER, GET_CAR_MODELS} from '../actions/filters';

const initialState = {
    requestStatus: '',
    homeFilters: [],
    carFilters: [],
    shopFilters: [],
    carMakes: [],
    carModels: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_HOME_FILTER.SUCCESS: {
            const {data} = action.payload;
            return {
                ...state,
                requestStatus: 'success',
                homeFilters: data.homeFilters,
            };
        }
        case GET_CAR_FILTER.SUCCESS: {
            const {data} = action.payload;
            return {
                ...state,
                requestStatus: 'success',
                carFilters: data.carFilters,
            };
        }
        case GET_CAR_MODELS.SUCCESS: {
            const {data} = action.payload;
            return {
                ...state,
                requestStatus: 'success',
                carModels: data,
            };
        }
        case GET_SHOP_FILTER.SUCCESS: {
            const {data} = action.payload;
            return {
                ...state,
                requestStatus: 'success',
                shopFilters: data.shopFilters,
            };
        }

        default: {
            return state;
        }
    }
}

