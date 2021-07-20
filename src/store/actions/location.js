import Location from '../../Api';
import {define} from '../../helpers/redux-request';

export const GET_LOCATION = define('GET_LOCATION');

export function getLocationRequest() {
    return GET_LOCATION.request(() => Location.getLocation()).takeLatest();
}

