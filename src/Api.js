import axios from 'axios';
import toFormData from "object-to-formdata";
import Storage from './helpers/Account'
import md5 from 'md5';

const api = axios.create({
  baseURL: 'https://kars-manex-3-dhprn.ondigitalocean.app',
});

api.interceptors.request.use((config) => {
  const token = Storage.getToken();
  if (token){
    config.headers.Authorization = token
  }
  config.headers['X-API-KEY'] = md5(md5(14199077) + 'kars');
  return config;
}, Promise.reject)

class Api {

  static getUsers() {
    return api.get(`/profile`);
  }

  static getUser(id) {
    return api.get(`/user`, {
      params: {
        id,
      }
    });
  }

  static getAllUsers(s, sortKey, sortValue) {
    return api.get(`/all_users`, {
      params: {s, sortKey, sortValue}
    });
  }

  static login(formData) {
    return api.post(`/login`, formData);
  }

  static register(data, uploadProcess) {
    return api.post('/register', toFormData.serialize(data), {
      onUploadProgress: uploadProcess
    })
  }

  static userUpdate(data, uploadProcess) {
    return api.put('/user_update', toFormData.serialize(data), {
      onUploadProgress: uploadProcess
    })
  }

  static userDelete(id) {
    return api.delete(`/user_delete/${ id }`)
  }

  static getHeaderMenu() {
    return api.get(`/headerMenu`)
  }

  static getCurrency() {
    return api.get(`/currency`)
  }


  static async getRates(toCurrency) {
    try {
      return axios.get(`https://api.exchangerate.host/latest`, {
        params: {
          base: 'AMD',
          symbols: toCurrency,
        }
      })
    } catch (e) {
      console.log("Exchange", e);
    }
  }

  static getHomeProducts(search, sortKey, sortValue, category_departmentId, c_section,
                         location, address, priceMin, priceMax, building_type, new_built,
                         floorMin, floorMax, room_numbers, bathRoom_numbers,
                         areaMin, areaMax, payment, renovation) {
    return api.get(`/allHomes`, {
      params: {
        search, sortKey, sortValue, category_departmentId, c_section,
        location, address, priceMin, priceMax, building_type, new_built,
        floorMin, floorMax, room_numbers, bathRoom_numbers,
        areaMin, areaMax, payment, renovation,
      }
    })
  }

  static getCarProducts(search, sortKey, sortValue, category_departmentId, c_section,
                        location, address, priceMin, priceMax, brand, model, bodyType, bYearMin, bYearMax,
                        runMin, runMax, horsepowerMin, horsepowerMax, motor, motorVolumeMin,
                        motorVolumeMax, transmission, traction, color, wheel, customsCleared) {
    return api.get(`/allCars`, {
      params: {
        search, sortKey, sortValue, category_departmentId, c_section,
        location, address, priceMin, priceMax, brand, model, bodyType, bYearMin, bYearMax,
        runMin, runMax, horsepowerMin, horsepowerMax, motor, motorVolumeMin,
        motorVolumeMax, transmission, traction, color, wheel, customsCleared,
      }
    })
  }

  static getAllUsersProducts(user_id, search, sortKey, sortValue, category_id, category_departmentId, c_section) {
    if (user_id){
      return api.get(`/get_user_products`, {
        params: {
          user_id, search, sortKey, sortValue, category_id, category_departmentId, c_section
        }
      })
    }
    return api.get(`/get_user_products`, {
      params: {
        search, sortKey, sortValue, category_id, category_departmentId, c_section
      }
    })
  }

  static getMyProducts(search, sortKey, sortValue, category_id, category_departmentId, c_section) {
    return api.get(`/get_my_products`, {
      params: {
        search, sortKey, sortValue, category_id, category_departmentId, c_section
      }
    })
  }

  static getNewProducts(search, sortKey, sortValue, category_id, category_departmentId, c_section) {
    return api.get(`/get_new_products`, {
      params: {
        search, sortKey, sortValue, category_id, category_departmentId, c_section
      }
    })
  }

  static getStarProducts() {
    return api.get(`/starProducts`)
  }

  static postHomes(data, uploadProcess) {
    return api.post('/create_home', toFormData.serialize(data, {indices: true}), {
      onUploadProgress: uploadProcess
    })
  }

  static postCars(data, uploadProcess) {
    return api.post('/create_car', toFormData.serialize(data, {indices: true}), {
      onUploadProgress: uploadProcess
    })
  }

  static updateHomes(data, uploadProcess) {
    return api.put('/update_home', toFormData.serialize(data, {indices: true}), {
      onUploadProgress: uploadProcess
    })
  }

  static updateCars(data, uploadProcess) {
    return api.put('/update_car', toFormData.serialize(data, {indices: true}), {
      onUploadProgress: uploadProcess
    })
  }

  static updateProductAccess(id, access, star) {
    return api.put(`/update_access`, {id, access, star})
  }

  static deleteProduct(id) {
    return api.delete(`/delete_product/${ id }`)
  }

  static deleteProductImage(id) {
    return api.delete(`/delete_product_image/${ id }`)
  }

  static getCategories(id, category_id) {
    return api.get(`/categories`, {
      params: {
        id,
        category_id,
      }
    }).catch(err => {
      console.log('Category' + err)
    })
  }

  static sendMail(formData) {
    return api.post('/send', formData);
  }

  static getLocation() {
    return api.get('/get_location');
  }

  static getHomeFilters() {
    return api.get('/get_home_filters');
  }

  static getCarFilters() {
    return api.get('/get_car_filters');
  }

  static getCarModels(Make, Model) {
    return api.get('/get_cars', {
      params: {
        Make,
        Model
      }
    });
  }

  static getShopFilters() {
    return api.get('/get_shop_filters');
  }

  static sendEmail(email) {
    return api.post('/reset_password', {email});
  }

  static changePasswordRequest(activationCode, password) {
    return api.put('/confirm_email', {activationCode, password});
  }
}

export default Api;
