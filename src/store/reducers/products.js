import * as actionProduct from "../actions/products";

const initialState = {
  requestStatus: '',
  requestUpStatus: '',
  allProductsReqStatus: '',
  newProductsReqStatus: '',
  errors: {},
  productInfo: [],
  staredInfo: [],
  postProductInfo: [],
  userProducts: [],
  newProducts: [],
  allProducts: [],
  deleteProductInfo: {},
  delErrors: {},
  accessProductInfo: {},
  accessErrors: {},
  updateProductInfo: [],
  upErrors: {},
}

export default function reducer(state = initialState, action) {

  switch ( action.type ) {
    case actionProduct.GET_HOMES.REQUEST: {
      return {
        ...state,
        productInfo: [],
        requestStatus: 'request',
      }
    }
    case actionProduct.GET_HOMES.SUCCESS: {
      return {
        ...state,
        requestStatus: 'success',
        productInfo: action.payload.data
      }
    }
    case actionProduct.GET_HOMES.FAIL: {
      return {
        ...state,
        requestStatus: 'fail',
      }
    }
    case actionProduct.GET_CARS.REQUEST: {
      return {
        ...state,
        productInfo: [],
        requestStatus: 'request',
      }
    }
    case actionProduct.GET_CARS.SUCCESS: {
      return {
        ...state,
        requestStatus: 'success',
        productInfo: action.payload.data
      }
    }
    case actionProduct.GET_CARS.FAIL: {
      return {
        ...state,
        requestStatus: 'fail',
      }
    }
    case actionProduct.STARED_PRODUCT.REQUEST: {
      return {
        ...state,
        staredInfo: [],
        requestStatus: 'request',
      }
    }
    case actionProduct.STARED_PRODUCT.SUCCESS: {
      return {
        ...state,
        requestStatus: 'success',
        staredInfo: action.payload.data
      }
    }
    case actionProduct.STARED_PRODUCT.FAIL: {
      return {
        ...state,
        requestStatus: 'fail',
      }
    }

    case actionProduct.GET_USER_PRODUCTS.REQUEST: {
      return {
        ...state,
        userProducts: [],
        allProductsReqStatus: 'request',
      }
    }
    case actionProduct.GET_USER_PRODUCTS.SUCCESS: {
      return {
        ...state,
        allProductsReqStatus: 'success',
        userProducts: action.payload.data
      }
    }
    case actionProduct.GET_USER_PRODUCTS.FAIL: {
      return {
        ...state,
        allProductsReqStatus: 'fail',
      }
    }

    case actionProduct.GET_ALL_PRODUCTS.REQUEST: {
      return {
        ...state,
        allProducts: [],
        allProductsReqStatus: 'request',
      }
    }
    case actionProduct.GET_ALL_PRODUCTS.SUCCESS: {
      return {
        ...state,
        allProductsReqStatus: 'success',
        allProducts: action.payload.data
      }
    }
    case actionProduct.GET_ALL_PRODUCTS.FAIL: {
      return {
        ...state,
        newProductsReqStatus: 'fail',
      }
    }

    case actionProduct.GET_NEW_PRODUCTS.REQUEST: {
      return {
        ...state,
        newProducts: [],
        newProductsReqStatus: 'request',
      }
    }
    case actionProduct.GET_NEW_PRODUCTS.SUCCESS: {
      return {
        ...state,
        newProductsReqStatus: 'success',
        newProducts: action.payload.data
      }
    }
    case actionProduct.GET_NEW_PRODUCTS.FAIL: {
      return {
        ...state,
        newProductsReqStatus: 'fail',
      }
    }

    case actionProduct.POST_PRODUCT.REQUEST: {
      return {
        ...state,
        postProductInfo: [],
        errors: {},
        requestStatus: 'request',
      }
    }
    case actionProduct.POST_PRODUCT.SUCCESS: {
      return {
        ...state,
        requestStatus: 'success',
        postProductInfo: action.payload.data
      }
    }
    case actionProduct.POST_PRODUCT.FAIL: {
      return {
        ...state,
        requestStatus: 'fail',
        errors: action.payload.data.errors,
      }
    }
    case actionProduct.POST_CARS.REQUEST: {
      return {
        ...state,
        postProductInfo: [],
        errors: {},
        requestStatus: 'request',
      }
    }
    case actionProduct.POST_CARS.SUCCESS: {
      return {
        ...state,
        requestStatus: 'success',
        postProductInfo: action.payload.data
      }
    }
    case actionProduct.POST_CARS.FAIL: {
      return {
        ...state,
        requestStatus: 'fail',
        errors: action.payload.data.errors,
      }
    }

    case actionProduct.UPDATE_PRODUCT.SUCCESS: {
      return {
        ...state,
        requestUpStatus: 'success',
        updateProductInfo: action.payload.data
      }
    }
    case actionProduct.UPDATE_PRODUCT.FAIL: {
      return {
        ...state,
        requestUpStatus: 'fail',
        upErrors: action.payload.data.errors,
      }
    }
    case actionProduct.UPDATE_CARS.SUCCESS: {
      return {
        ...state,
        requestUpStatus: 'success',
        updateProductInfo: action.payload.data
      }
    }
    case actionProduct.UPDATE_CARS.FAIL: {
      return {
        ...state,
        requestUpStatus: 'fail',
        upErrors: action.payload.data.errors,
      }
    }
    case actionProduct.UPDATE_PRODUCT_ACCESS.SUCCESS: {
      return {
        ...state,
        requestUpStatus: 'success',
        accessProductInfo: action.payload.data
      }
    }
    case actionProduct.UPDATE_PRODUCT_ACCESS.FAIL: {
      return {
        ...state,
        requestUpStatus: 'fail',
        accessErrors: action.payload.data.errors,
      }
    }

    case actionProduct.DELETE_PRODUCT.SUCCESS: {
      return {
        ...state,
        requestUpStatus: 'success',
        deleteProductInfo: action.payload.data
      }
    }
    case actionProduct.DELETE_PRODUCT.FAIL: {
      return {
        ...state,
        requestUpStatus: 'fail',
        delErrors: action.payload.data.errors,
      }
    }

    case actionProduct.DELETE_PRODUCT_IMAGE.SUCCESS: {
      return {
        ...state,
        requestUpStatus: 'success',
        deleteProductInfo: action.payload.data
      }
    }
    case actionProduct.DELETE_PRODUCT_IMAGE.FAIL: {
      return {
        ...state,
        requestUpStatus: 'fail',
        delErrors: action.payload.data.errors,
      }
    }

    case actionProduct.DELETE_INFOS: {
      return {
        ...state,
        postProductInfo: [],
        errors: {},
        updateProductInfo: [],
        upErrors: {},
        accessProductInfo: {},
        accessErrors: {},
        deleteProductInfo: {},
        delErrors: {},
      }
    }

    default: {
      return state;
    }
  }
}
