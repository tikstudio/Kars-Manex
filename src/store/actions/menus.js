import Menu from '../../Api';
import {define} from '../../helpers/redux-request'

export const GET_MENU = define('GET_MENU');

export function getHeaderMenuRequest() {
    return GET_MENU.request(() => Menu.getHeaderMenu()).takeLatest();
}
