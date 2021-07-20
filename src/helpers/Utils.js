import _ from 'lodash'

class Utils {

    static formatPrice(price, rate) {
        return rate?.rates ?
            (Object.keys(rate?.rates) + " " + _.toNumber(price * Object.values(rate?.rates).toString()).toFixed(2))
            : `AMD ${price}`;
    }
    static zoomFormatPrice(price, rate) {
        return rate?.rates ?
            (Object.keys(rate?.rates) + " " + _.toNumber(price * Object.values(rate?.rates).toString()).toFixed(2))
            : `${price} ԱՄԴ`;
    }
}

export default Utils;
