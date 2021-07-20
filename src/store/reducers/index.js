import {combineReducers} from "redux";
import users from './users';
import menus from './menus';
import converter from './converter';
import products from './products';
import category from './category';
import contact from './contact';
import location from './location';
import filters from './filters';

export default combineReducers({
    users,
    menus,
    converter,
    products,
    category,
    contact,
    location,
    filters,
})
