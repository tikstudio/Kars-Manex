import Categories from '../../Api';
import {define} from '../../helpers/redux-request';

export const GET_CATEGORY = define('GET_CATEGORY');

export function getCategory(id, category_id) {
    return GET_CATEGORY.request(() => Categories.getCategories(id, category_id)).takeLatest();
}

