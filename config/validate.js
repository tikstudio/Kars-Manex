const {Validator} = require('node-input-validator');
const httpErrors = require('http-errors');
const _ = require('lodash');

async function Validate(inputs, rules, regex, customError, messages) {
  let v = new Validator(inputs, rules, messages);
  if (!await v.check()){
    const errors = {};
    _.forEach(regex, (value, key) => {
      if (key === 'phone' && !/^(374|\+374|0|)?(\d{2})(\d{2})(\d{2})(\d{2})$/.test(value)){
        errors.phone = 'Խնդրում ենք գրել ճիշտ համար (+374|374|0)+8 թիվ';
      }
      if (key === 'files' && value.length > 12){
        errors.image = 'Դուք կարող եք վերբեռնել ամենաշատը 12 նկար';
      }
    });
    _.forEach(v.errors, (e, k) => {
      errors[k] = e.message || e;
    });
    v.errors = errors;
    if (customError){
      v = customError(v);
    }
    if (v){
      throw httpErrors(422, v);
    }
  }
}

module.exports = Validate;
