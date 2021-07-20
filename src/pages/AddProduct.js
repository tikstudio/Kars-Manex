import React, { Component } from 'react';
import Wrapper from "../components/Wrapper";
import '../assets/CSS/pages/addProduct.css'
import { postCarsRequest, postHomeRequest } from "../store/actions/products";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import HorizontalStepper from "../components/slides/HorizontalStepper";
import Selects from "../components/form/Select";
import LocationSelect from "../components/form/LocationSelect";
import Input from "../components/form/Input";
import { InputAdornment } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { getCategory } from "../store/actions/category";
import { getLocationRequest } from "../store/actions/location";
import FileInput from "../components/form/FileInput";
import _ from "lodash";
import Save from "../components/form/Buttons";
import ResInfo from "../components/utils/ResInfo";
import { getCarModel } from "../store/actions/filters";
import SelectNumber from "../components/form/SelectNumber";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        category_id: 1,
        category_departmentId: '',
        brand: '',
        model: '',
        bodyType: '',
        bYear: '',
      },
      process: '',
    }
  }

  async componentDidMount() {
    await this.props.getCategory(1, 1);
    await this.props.getLocationRequest();
    await this.props.getCarModel();
  }

  handleSelectCategory = async (path, event) => {
    const {formData} = this.state;
    _.set(formData, path, event.target.value);
    this.setState({formData});
    if (path === 'category_id' && (event.target.value === '' || event.target.value > 0)){
      await this.props.getCategory(1, 1);
      _.set(formData, 'category_departmentId', '');
      _.set(formData, 'c_section', '');
      this.setState({formData});
    } else if (path === 'category_departmentId' && event.target.value === ''){
      await this.props.getCategory(1, 1);
      _.set(formData, 'c_section', '');
      this.setState({formData});
    } else{
      await this.props.getCategory(formData.category_id, formData.category_departmentId);
    }
  }

  handleChange = async (path, ev) => {
    const {formData} = this.state;
    _.set(formData, path, ev);
    this.setState({formData})
    if (path === 'brand' || path === 'model'){
      await this.props.getCarModel(formData.brand, formData.model);
    }
  }

  handleSubmit = () => {
    const {formData} = this.state;
    if (+formData.category_id === 1){
      this.props.postHomeRequest(formData, (v) => {
        this.setState({process: v.loaded / v.total * 100})
      }, () => {
        console.log()
      });
    } else if (+formData.category_id === 2){
      this.props.postCarsRequest(formData, (v) => {
        this.setState({process: v.loaded / v.total * 100})
      }, () => {
        console.log()
      });
    }
  }

  render() {
    const {formData} = this.state;
    const {token, locations, category, errors, postProductInfo, carModels} = this.props;
    if (!token){
      return <Redirect to="/signing"/>;
    }
    return (
      <Wrapper showFooter={ false }>
        <menu className='add__product' style={ {background: `url('/images/banner/user.png')`} }>
          <div className='container'>
            <div className='add__product_content'>
              <HorizontalStepper>
                <div className='add__product_area'>
                  <div className='add__product_categories sc'>
                    <Selects
                      label={ 'ՍԵՓԱԿԱՆՈՒԹՅՈՒՆ' }
                      size={ 'small' }
                      required={ true }
                      data={ category ? category.category : 'Տեղ․ չկա' }
                      value={ formData.category_id ? formData.category_id : '' }
                      errors={ errors?.category_id ? errors.category_id : null }
                      vName={ 'c_name' }
                      keyValue={ 'id' }
                      onChange={ (event) => this.handleSelectCategory('category_id', event) }
                    />
                    <br/>
                    <Selects
                      label={ 'ԲԱԺԻՆ' }
                      size={ 'small' }
                      required={ true }
                      data={ category ? category.categoryDep : 'Տեղ․ չկա' }
                      value={ formData.category_departmentId ? formData.category_departmentId : "" }
                      errors={ errors?.category_departmentId ? errors.category_departmentId : null }
                      vName={ 'name' }
                      keyValue={ 'id' }
                      onChange={ (event) => this.handleSelectCategory('category_departmentId', event) }
                    />
                    <br/>
                    <Selects
                      label={ 'ԳՈՒՅՔԻ ՏԵՍԱԿԸ' }
                      size={ 'small' }
                      data={ category ? category.categorySec : 'Տեղ․ չկա' }
                      value={ formData.c_section ? formData.c_section : '' }
                      errors={ errors?.c_section ? errors.c_section : null }
                      required={ true }
                      vName={ 'name' }
                      keyValue={ 'id' }
                      onChange={ (event) => this.handleSelectCategory('c_section', event) }
                    />
                  </div>
                  <div className='add__product_categories'>
                    <Input
                      size={ "small" }
                      className={ 'filter__address' }
                      type={ 'text' }
                      label={ 'Կոդ / Անուն' }
                      required={ true }
                      value={ formData.p_name ? formData.p_name : '' }
                      errors={ errors?.p_name ? errors.p_name : null }
                      title={ formData.p_name ? formData.p_name : '' }
                      onChange={ (event) => this.handleChange('p_name', event.target.value) }
                    />
                    <br/>
                    <LocationSelect
                      className={ 'location__select' }
                      size={ "small" }
                      label={ 'Տարածաշրջան' }
                      data={ locations ? locations : 'Տեղ․ չկա' }
                      value={ formData.location ? formData.location : '' }
                      errors={ errors?.location ? errors.location : null }
                      vName={ 'name' }
                      required={ true }
                      onChange={ (event) => this.handleChange('location', event.target.value) }
                    />
                    <br/>
                    <Input
                      size={ "small" }
                      className={ 'filter__address' }
                      label={ 'Հասցե' }
                      value={ formData.address ? formData.address : "" }
                      title={ formData.address ? formData.address : '' }
                      errors={ errors?.address ? errors.address : null }
                      onChange={ (event) => this.handleChange('address', event.target.value) }
                    />
                    <br/>
                    <Input className={ "add__product_contact" }
                           label={ errors?.phone ? "Հեռախոսահամարի սխալ" : "Հեռախոսահամար" }
                           name={ "phone" }
                           type={ "tel" }
                           size={ "small" }
                           required={ true }
                           value={ formData.phone ? formData.phone : "" }
                           errors={ errors?.phone ? errors.phone : null }
                           placeholder={ "+374########" }
                           title={ formData.phone ? formData.phone : null }
                           onChange={ (event) => this.handleChange('phone', event.target.value) }
                    />
                    <br/>
                    <Input className={ "add__product_contact" }
                           label={ errors?.email ? "Էլ. փոստի սխալ" : "Էլ. փոստ" }
                           name={ "email" }
                           type={ "email" }
                           size={ "small" }
                           value={ formData.email ? formData.email : "" }
                           errors={ errors?.email ? errors.email : null }
                           InputProps={ {
                             startAdornment: (
                               <InputAdornment position="start">
                                 <AccountCircle/>
                               </InputAdornment>
                             ),
                           } }
                           placeholder={ "email" }
                           title={ formData.email ? formData.email : null }
                           onChange={ (event) => this.handleChange('email', event.target.value) }
                    />
                  </div>
                  <div className='add__product_images'>
                    <p>Գլխավոր նկար</p>
                    <FileInput accept="image/*"
                               onChange={ (ev, files) => this.handleChange('image', files[0]) }
                    />
                    <br/>
                    <p>Ավելացնել լուսանկարներ</p>
                    <FileInput accept="image/*"
                               multiple
                               onChange={ (ev, files) => this.handleChange('pictures', files) }
                    />
                  </div>
                </div>
                { +formData.category_id === 1 ? (
                  <div className="add__product_area">
                    <div className='add__product_section'>
                      <Selects
                        label={ 'Շինության տիպը' }
                        size={ 'small' }
                        data={ [
                          {name: 'Քարե'},
                          {name: 'Պանելային'},
                          {name: 'Մոնոլիտ'},
                          {name: 'Աղյուսե'},
                          {name: 'Կասետային'},
                          {name: 'Փայտե'},
                        ] }
                        className={ 'product__types_select' }
                        value={ formData.building_type ? formData.building_type : '' }
                        errors={ errors?.building_type ? errors.building_type : null }
                        vName={ 'name' }
                        keyValue={ 'name' }
                        onChange={ (event) => this.handleChange('building_type', event.target.value) }
                      />
                      <br/>
                      <Selects
                        label={ 'Նորակառույց' }
                        size={ 'small' }
                        data={ [
                          {name: 'Այո', value: true},
                          {name: 'Ոչ', value: false},
                        ] }
                        className={ 'product__types_select' }
                        value={ formData.new_built ? formData.new_built : '' }
                        errors={ errors?.new_built ? errors.new_built : null }
                        vName={ 'name' }
                        keyValue={ 'value' }
                        onChange={ (event) => this.handleChange('new_built', event.target.value) }
                      />
                      <br/>
                      <Input className={ "add__product_contact" }
                             label={ errors?.floor ? "Հարկի սխալ" : "Հարկ" }
                             name={ "floor" }
                             type={ "number" }
                             size={ "small" }
                             errors={ errors?.floor ? errors.floor : null }
                             placeholder={ "Հարկ" }
                             title={ formData.floor ? formData.floor : null }
                             onChange={ (event) => this.handleChange('floor', event.target.value) }
                      />
                      <br/>
                      <Input className={ "add__product_contact" }
                             label={ errors?.room_numbers ? "Սենյակների քանակի սխալ" : "Սենյակների քանակ" }
                             name={ "room_numbers" }
                             type={ "number" }
                             size={ "small" }
                             errors={ errors?.room_numbers ? errors.room_numbers : null }
                             placeholder={ "Սենյակների քանակ" }
                             title={ formData.room_numbers ? formData.room_numbers : null }
                             onChange={ (event) => this.handleChange('room_numbers', event.target.value) }
                      />
                    </div>
                    <div className='add__product_section'>
                      <Input className={ "add__product_contact" }
                             label={ errors?.bathRoom_numbers ? "Սանհանգույցների քանակի սխալ" : "Սանհանգույցների քանակ" }
                             name={ "bathRoom_numbers" }
                             type={ "number" }
                             size={ "small" }
                             errors={ errors?.bathRoom_numbers ? errors.bathRoom_numbers : null }
                             placeholder={ "Սանհանգույցների քանակ" }
                             title={ formData.bathRoom_numbers ? formData.bathRoom_numbers : null }
                             onChange={ (event) => this.handleChange('bathRoom_numbers', event.target.value) }
                      />
                      <br/>
                      <Input className={ "add__product_contact" }
                             label={ errors?.area ? "Ընդհանուր մակերեսըի սխալ" : "Ընդհանուր մակերեսը" }
                             name={ "area" }
                             type={ "number" }
                             size={ "small" }
                             errors={ errors?.area ? errors.area : null }
                             placeholder={ `Ընդ. մակերեսը (մ/ք)` }
                             InputProps={ {
                               endAdornment: <InputAdornment position="end">մ<sup>2</sup></InputAdornment>,
                             } }
                             title={ formData.area ? formData.area : null }
                             onChange={ (event) => this.handleChange('area', event.target.value) }
                      />
                      <br/>
                      <Selects
                        label={ 'Վերանորոգում' }
                        size={ 'small' }
                        data={ [
                          {name: 'Չվերանորոգված'},
                          {name: 'Հին վերանորոգում'},
                          {name: 'Մասնակի վերանորոգում'},
                          {name: 'Կոսմետիկ վերանորոգում'},
                          {name: 'Եվրովերանորոգված'},
                          {name: 'Դիզայներական ոճով վերանորոգված'},
                          {name: 'Կապիտալ վերանորոգված'},
                        ] }
                        value={ formData.renovation ? formData.renovation : '' }
                        errors={ errors?.renovation ? errors.renovation : null }
                        vName={ 'name' }
                        className={ 'product__types_select' }
                        keyValue={ 'name' }
                        onChange={ (event) => this.handleChange('renovation', event.target.value) }
                      />
                      <br/>
                      <Selects
                        label={ 'Վճարման կարգը' }
                        size={ 'small' }
                        data={ [
                          {name: 'Կանխիկ'},
                          {name: 'Հիփոթեքով'},
                          {name: 'Մասնակի'},
                        ] }
                        className={ 'product__types_select' }
                        value={ formData.payment ? formData.payment : '' }
                        errors={ errors?.payment ? errors.payment : null }
                        vName={ 'name' }
                        keyValue={ 'name' }
                        onChange={ (event) => this.handleChange('payment', event.target.value) }
                      />
                    </div>
                    <div className='add__product_section'>
                      <Input className={ "add__product_contact" }
                             label={ errors?.price ? "Գնի սխալ" : "Գինը" }
                             type={ "number" }
                             size={ "small" }
                             value={ formData.price ? formData.price : '' }
                             InputProps={ {
                               endAdornment: <InputAdornment position="end">AMD</InputAdornment>,
                             } }
                             errors={ errors?.price ? errors.price : null }
                             placeholder={ 'Գինը (դրամ)' }
                             title={ formData?.price ? formData.price : null }
                             onChange={ (event) => this.handleChange('price', event.target.value) }
                      />
                      <br/>
                      <Input className={ "add__product_contact" }
                             label={ errors?.description ? "Նկարագրի սխալ" : "Նկարագիր" }
                             name={ "description" }
                             type={ "number" }
                             size={ "small" }
                             multiline
                             rows={ 5 }
                             errors={ errors?.description ? errors.description : null }
                             placeholder={ `Մանրամասն նկարագրեք ձեր հայտարարությունը ավելի մեծ հետաքրքրություն առաջացնելու համար:` }
                             title={ formData.description ? formData.description : null }
                             onChange={ (event) => this.handleChange('description', event.target.value) }
                      />
                    </div>
                  </div>
                ) : +formData.category_id === 2 ? (
                  <div className="add__product_area">
                    <div className='add__product_section'>
                      <Selects
                        className={ 'product__types_select' }
                        size={ "small" }
                        label={ 'Մակնիշ' }
                        data={ carModels?.makes ? carModels.makes : null }
                        errors={ errors?.brand ? errors.brand : null }
                        value={ formData.brand }
                        title={ formData.brand }
                        vName={ 'Make' }
                        keyValue={ 'Make' }
                        onChange={ (event) => this.handleChange('brand', event.target.value) }
                      /><br/>
                      <Selects
                        className={ 'product__types_select' }
                        size={ "small" }
                        label={ 'Մոդել' }
                        data={ carModels?.model ? carModels.model : null }
                        errors={ errors?.model ? errors.model : null }
                        value={ formData.model }
                        title={ formData.model }
                        vName={ 'Model' }
                        keyValue={ 'Model' }
                        onChange={ (event) => this.handleChange('model', event.target.value) }
                      /><br/>
                      <Selects
                        className={ 'product__types_select' }
                        size={ "small" }
                        label={ 'Թափքի տարատեսակ' }
                        data={ carModels?.category ? carModels.category : null }
                        errors={ errors?.bodyType ? errors.bodyType : null }
                        value={ formData.bodyType }
                        title={ formData.bodyType }
                        vName={ 'Category' }
                        keyValue={ 'Category' }
                        onChange={ (event) => this.handleChange('bodyType', event.target.value) }
                      /><br/>
                      <SelectNumber
                        className={ 'product__types_select' }
                        style={ {width: '100%'} }
                        label={ errors?.bYear ? 'Տարվա սխալ' : 'Տարի' }
                        value={ formData.bYear }
                        data={ carModels?.model ? carModels.model : null }
                        errors={ errors?.bYear ? errors.bYear : null }
                        optionName={ 'Year' }
                        onChange={ (event) => this.handleChange('bYear', event.target.value) }
                      />
                      <hr/>
                      <Input
                        size={ "small" }
                        type={ "number" }
                        className={ "add__product_contact" }
                        label={ errors?.bYear ? 'Տարվա սխալ' : 'Տարի' }
                        errors={ errors?.bYear ? errors.bYear : null }
                        value={ formData.bYear ? formData.bYear : "" }
                        title={ formData.bYear ? formData.bYear : '' }
                        onChange={ (event) => this.handleChange('bYear', event.target.value) }
                      /><br/>
                      <Input
                        size={ "small" }
                        type={ "number" }
                        className={ "add__product_contact" }
                        label={ errors?.run ? 'Վազքի սխալ' : 'Վազքը (կմ)' }
                        errors={ errors?.run ? errors.run : null }
                        value={ formData.run ? formData.run : "" }
                        title={ formData.run ? formData.run : '' }
                        onChange={ (event) => this.handleChange('run', event.target.value) }
                      />
                    </div>
                    <div className='add__product_section'>
                      <Input
                        size={ "small" }
                        type={ "number" }
                        className={ "add__product_contact" }
                        label={ errors?.horsepower ? 'Ձիաուժի սխալ' : 'Ձիաուժ (կմ/ժ)' }
                        errors={ errors?.horsepower ? errors.horsepower : null }
                        value={ formData.horsepower ? formData.horsepower : "" }
                        title={ formData.horsepower ? formData.horsepower : '' }
                        onChange={ (event) => this.handleChange('horsepower', event.target.value) }
                      /><br/>
                      <Input
                        size={ "small" }
                        className={ "add__product_contact" }
                        label={ errors?.motor ? 'Շարժիչի սխալ' : 'Շարժիչ' }
                        errors={ errors?.motor ? errors.motor : null }
                        value={ formData.motor ? formData.motor : "" }
                        title={ formData.motor ? formData.motor : '' }
                        onChange={ (event) => this.handleChange('motor', event.target.value) }
                      /><br/>
                      <Input
                        size={ "small" }
                        type={ "number" }
                        className={ "add__product_contact" }
                        label={ errors?.motorVolume ? 'Շարժիչի ծավալի սխալ' : 'Շարժիչի ծավալը (լ)' }
                        errors={ errors?.motorVolume ? errors.motorVolume : null }
                        value={ formData.motorVolume ? formData.motorVolume : "" }
                        title={ formData.motorVolume ? formData.motorVolume : '' }
                        onChange={ (event) => this.handleChange('motorVolume', event.target.value) }
                      /><br/>
                      <Input
                        size={ "small" }
                        className={ "add__product_contact" }
                        label={ errors?.transmission ? 'Փոխանցման տուփի սխալ' : 'Փոխանցման տուփը' }
                        errors={ errors?.transmission ? errors.transmission : null }
                        value={ formData.transmission ? formData.transmission : "" }
                        title={ formData.transmission ? formData.transmission : '' }
                        onChange={ (event) => this.handleChange('transmission', event.target.value) }
                      /><br/>
                      <Input
                        size={ "small" }
                        className={ "add__product_contact" }
                        label={ errors?.traction ? 'Քարշակի սխալ' : 'Քարշակ' }
                        errors={ errors?.traction ? errors.traction : null }
                        value={ formData.traction ? formData.traction : "" }
                        title={ formData.traction ? formData.traction : '' }
                        onChange={ (event) => this.handleChange('traction', event.target.value) }
                      /><br/>
                      <Input
                        size={ "small" }
                        className={ "add__product_contact" }
                        label={ errors?.color ? 'Գույնի սխալ' : 'Գույն' }
                        errors={ errors?.color ? errors.color : null }
                        value={ formData.color ? formData.color : "" }
                        title={ formData.color ? formData.color : '' }
                        onChange={ (event) => this.handleChange('color', event.target.value) }
                      />
                    </div>
                    <div className='add__product_section'>
                      <Input
                        size={ "small" }
                        className={ "add__product_contact" }
                        label={ errors?.wheel ? 'Ղեկի սխալ' : 'Ղեկ' }
                        errors={ errors?.wheel ? errors.wheel : null }
                        value={ formData.wheel ? formData.wheel : "" }
                        title={ formData.wheel ? formData.wheel : '' }
                        onChange={ (event) => this.handleChange('wheel', event.target.value) }
                      /><br/>
                      <Selects
                        className={ 'product__types_select' }
                        size={ "small" }
                        label={ 'Մաքսազերծված է' }
                        errors={ errors?.customsCleared ? errors.customsCleared : null }
                        data={ [{value: 1, customsCleared: 'Այո'}, {value: 0, customsCleared: 'Ոչ'}] }
                        value={ formData.customsCleared }
                        title={ formData.customsCleared }
                        vName={ 'customsCleared' }
                        keyValue={ 'value' }
                        onChange={ (event) => this.handleChange('customsCleared', event.target.value) }
                      /><br/>
                      <Input className={ "add__product_contact" }
                             label={ errors?.price ? "Գնի սխալ" : "Գինը" }
                             type={ "number" }
                             size={ "small" }
                             value={ formData.price ? formData.price : '' }
                             InputProps={ {
                               endAdornment: <InputAdornment position="end">AMD</InputAdornment>,
                             } }
                             errors={ errors?.price ? errors.price : null }
                             placeholder={ 'Գինը (դրամ)' }
                             title={ formData?.price ? formData.price : null }
                             onChange={ (event) => this.handleChange('price', event.target.value) }
                      />
                      <br/>
                      <Input className={ "add__product_contact" }
                             label={ errors?.description ? "Նկարագրի սխալ" : "Նկարագիր" }
                             name={ "description" }
                             type={ "number" }
                             size={ "small" }
                             multiline
                             rows={ 5 }
                             errors={ errors?.description ? errors.description : null }
                             placeholder={ `Մանրամասն նկարագրեք ձեր հայտարարությունը ավելի մեծ հետաքրքրություն առաջացնելու համար:` }
                             title={ formData.description ? formData.description : null }
                             onChange={ (event) => this.handleChange('description', event.target.value) }
                      />
                    </div>
                  </div>
                ) : <div className="centering"><h1>Շուտով</h1></div> }
                <div className="add__product_row">
                  <strong>
                    Սեղմեք Ավելացնել կոճակը հայտարարությունը ավելացնելու համար։
                  </strong>
                  <p>
                    Ավելացնելուց հետո ձեր հայտարարությունը կհաստատվի 24 ժամվա ընթացքում։
                  </p>
                  <Save type='button'
                        label={ 'Ավելացնել' }
                        onClick={ () => this.handleSubmit() }/>
                </div>
              </HorizontalStepper>
            </div>
          </div>
        </menu>
        { !_.isEmpty(postProductInfo) ?
          <ResInfo value={ postProductInfo.status === "ok" ? 'on' : null }
                   successFunc={ this.props.deleteInfos }
                   res={ 'success' }
                   msg={ 'Հայտարարությունը ավելացվել է, սպասեք հաստատման' }/> : null }
        { !_.isEmpty(errors) ?
          <ResInfo value={ !_.isEmpty(errors) ? 'on' : null }
                   successFunc={ this.props.deleteInfos }
                   res={ 'error' }
                   msg={ 'Ճիշտ լրացրեք դաշտերը' }/> : null }
      </Wrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  postProductInfo: state.products.postProductInfo,
  requestStatus: state.products.requestStatus,
  errors: state.products.errors,
  token: state.users.token,
  category: state.category.category,
  locations: state.location.location,
  carModels: state.filters.carModels,
})

const mapDispatchToProps = {
  getCategory,
  getLocationRequest,
  getCarModel,
  postHomeRequest,
  postCarsRequest,
}

const AddProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProduct)

export default AddProductContainer;
