import { define } from "../../helpers/redux-request";
import Product from "../../Api";

export const STARED_PRODUCT = define('STARED_PRODUCT');

export function getStarRequest() {
  return STARED_PRODUCT.request(() => Product.getStarProducts()).takeLatest();
}

export const GET_HOMES = define('GET_HOMES');

export function getProductRequest(search, sortKey, sortValue, category_departmentId, c_section,
                                  location, address, priceMin, priceMax, building_type, new_built,
                                  floorMin, floorMax, room_numbers, bathRoom_numbers,
                                  areaMin, areaMax, payment, renovation) {
  return GET_HOMES.request(() => Product.getHomeProducts(search, sortKey, sortValue,
    category_departmentId, c_section, location, address, priceMin, priceMax, building_type, new_built,
    floorMin, floorMax, room_numbers, bathRoom_numbers, areaMin, areaMax, payment, renovation)).takeLatest();
}

export const GET_CARS = define('GET_CARS');

export function getCarsRequest(search, sortKey, sortValue, category_departmentId, c_section,
                               location, address, priceMin, priceMax, brand, model, bodyType, bYearMin, bYearMax,
                               runMin, runMax, horsepowerMin, horsepowerMax, motor, motorVolumeMin,
                               motorVolumeMax, transmission, traction, color, wheel, customsCleared) {
  return GET_CARS.request(() => Product.getCarProducts(search, sortKey, sortValue, category_departmentId, c_section,
    location, address, priceMin, priceMax, brand, model, bodyType, bYearMin, bYearMax,
    runMin, runMax, horsepowerMin, horsepowerMax, motor, motorVolumeMin,
    motorVolumeMax, transmission, traction, color, wheel, customsCleared)).takeLatest();
}

export const GET_USER_PRODUCTS = define('GET_USER_PRODUCTS');

export function getUserProductRequest(user_id, search, sortKey, sortValue, category_id,
                                      category_departmentId, c_section) {
  if (user_id){
    return GET_USER_PRODUCTS.request(() => Product.getAllUsersProducts(user_id, search, sortKey,
      sortValue, category_id, category_departmentId, c_section)).takeLatest();
  }
  return GET_USER_PRODUCTS.request(() => Product.getMyProducts(search, sortKey,
    sortValue, category_id, category_departmentId, c_section)).takeLatest();
}

export const GET_ALL_PRODUCTS = define('GET_ALL_PRODUCTS');

export function getAllProductRequest(search, sortKey, sortValue, category_id, category_departmentId, c_section) {
  return GET_ALL_PRODUCTS.request(() => Product.getAllUsersProducts("", search, sortKey,
    sortValue, category_id, category_departmentId, c_section)).takeLatest();
}

export const GET_NEW_PRODUCTS = define('GET_NEW_PRODUCTS');

export function getNewProductRequest(search, sortKey, sortValue, category_id, category_departmentId, c_section) {
  return GET_NEW_PRODUCTS.request(() => Product.getNewProducts(search, sortKey,
    sortValue, category_id, category_departmentId, c_section)).takeLatest();
}

export const POST_PRODUCT = define('POST_PRODUCT');

export function postHomeRequest(formData, uploadProcess, cb) {
  return POST_PRODUCT.request(() => Product.postHomes(formData, uploadProcess, cb)).takeLatest();
}

export const POST_CARS = define('POST_CARS');

export function postCarsRequest(formData, uploadProcess, cb) {
  return POST_CARS.request(() => Product.postCars(formData, uploadProcess, cb)).takeLatest();
}

export const UPDATE_PRODUCT = define('UPDATE_PRODUCT');

export function updateHome(formData, uploadProcess, cb) {
  return UPDATE_PRODUCT.request(() => Product.updateHomes(formData, uploadProcess, cb)).takeLatest();
}

export const UPDATE_CARS = define('UPDATE_CARS');

export function updateCar(formData, uploadProcess, cb) {
  return UPDATE_CARS.request(() => Product.updateCars(formData, uploadProcess, cb)).takeLatest();
}

export const UPDATE_PRODUCT_ACCESS = define('UPDATE_PRODUCT_ACCESS');

export function accessProduct(id, access, star) {
  return UPDATE_PRODUCT_ACCESS.request(() => Product.updateProductAccess(id, access, star)).takeLatest();
}

export const DELETE_PRODUCT = define('DELETE_PRODUCT');

export function removeProduct(id) {
  return DELETE_PRODUCT.request(() => Product.deleteProduct(id)).takeLatest();
}

export const DELETE_PRODUCT_IMAGE = define('DELETE_PRODUCT_IMAGE');

export function removeProductImage(id) {
  return DELETE_PRODUCT_IMAGE.request(() => Product.deleteProductImage(id)).takeLatest();
}

export const DELETE_INFOS = 'DELETE_INFOS';

export function deleteInfos() {
  return {
    type: DELETE_INFOS,
    payload: {}
  }
}
