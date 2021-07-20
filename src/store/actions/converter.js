import Currency from '../../Api';
import {define} from '../../helpers/redux-request'

export const GET_CURRENCY = define('GET_CURRENCY');

export function getCurrencyRequest() {
    return GET_CURRENCY.request(() => Currency.getCurrency()).takeLatest();
}

export const GET_RATES = define('GET_RATES');

export function getRatesRequest(rate) {
    return GET_RATES.request(() => Currency.getRates(rate)).takeLatest();
}
