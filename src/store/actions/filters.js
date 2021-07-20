import Filters from '../../Api';
import {define} from '../../helpers/redux-request';

export const GET_HOME_FILTER = define('GET_HOME_FILTER');

export function getHomeFilter() {
    return GET_HOME_FILTER.request(() => Filters.getHomeFilters()).takeLatest();
}

export const GET_CAR_FILTER = define('GET_CAR_FILTER');

export function getCarFilter() {
    return GET_CAR_FILTER.request(() => Filters.getCarFilters()).takeLatest();
}

export const GET_CAR_MODELS = define('GET_CAR_MODELS');

export function getCarModel(Make, Model) {
    return GET_CAR_MODELS.request(() => Filters.getCarModels(Make, Model)).takeLatest();
}

export const GET_SHOP_FILTER = define('GET_SHOP_FILTER');

export function getShopFilter() {
    return GET_SHOP_FILTER.request(() => Filters.getShopFilters()).takeLatest();
}

