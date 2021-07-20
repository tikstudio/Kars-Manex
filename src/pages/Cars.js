import React, { Component } from 'react';
import Wrapper from "../components/Wrapper";
import { connect } from "react-redux";
import { getCarsRequest } from "../store/actions/products";
import Product from "../components/products/product";
import '../assets/CSS/pages/cars.css'
import Sort from "../components/filter/Sort";
import Selects from "../components/form/Select";
import LocationSelect from "../components/form/LocationSelect";
import Input from "../components/form/Input";
import SelectNumber from "../components/form/SelectNumber";
import { getCarFilter, getCarModel } from "../store/actions/filters";
import { getCategory } from "../store/actions/category";
import { getLocationRequest } from "../store/actions/location";
import _ from "lodash";
import { faExchangeAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      formData: {
        sortKey: 'createdAt', sortValue: 'DESC',
        category_departmentId: this.props.match.params.cd ? this.props.match.params.cd : '',
        c_section: this.props.match.params.cs ? this.props.match.params.cs : '',
        location: '', address: '', priceMin: '', priceMax: '', brand: '',
        model: '', bodyType: '', bYearMin: '', bYearMax: '',
        runMin: '', runMax: '', horsepowerMin: '', horsepowerMax: '',
        motor: '', motorVolumeMin: '', motorVolumeMax: '', transmission: '',
        traction: '', color: '', wheel: '', customsCleared: '',
      },
      typing: false,
      typingTimeout: 0,
      changePlace: true,
    }
  }

  componentDidMount() {
    const {formData} = this.state;
    this.props.getCategory(2, 2);
    this.props.getCarFilter();
    this.props.getCarModel();
    this.props.getLocationRequest();
    this.props.getCarsRequest('', formData.sortKey, formData.sortValue,
      formData.category_departmentId, formData.c_section);
  }

  handleSearch = (event) => {
    this.setState({search: event})
  }
  search = async (event) => {
    const {search} = this.state;
    if (event.code === 'Enter'){
      await this.props.getCarsRequest(search);
    }
  }

  handleSelectFilter = async (path, event) => {
    const {formData, search} = this.state;
    _.set(formData, path, event.target.value);
    this.setState({formData});
    if (formData.category_departmentId === ''){
      await this.props.getCategory(2, 2);
      _.set(formData, 'c_section', '');
      this.setState({formData});
    } else{
      await this.props.getCategory(2, formData.category_departmentId);
    }
    if (path === 'brand' || path === 'model'){
      await this.props.getCarModel(formData.brand, formData.model);
    }
    await this.props.getCarsRequest(search, formData.sortKey, formData.sortValue,
      formData.category_departmentId, formData.c_section, formData.location, formData.address,
      formData.priceMin, formData.priceMax, formData.brand, formData.model, formData.bodyType,
      formData.bYearMin, formData.bYearMax, formData.runMin, formData.runMax, formData.horsepowerMin,
      formData.horsepowerMax, formData.motor, formData.motorVolumeMin, formData.motorVolumeMax,
      formData.transmission, formData.traction, formData.color, formData.wheel, formData.customsCleared);
  }
  handleChangeFilter = async (path, event) => {
    const {formData, search} = this.state;
    if (this.state.typingTimeout){
      clearTimeout(this.state.typingTimeout);
    }
    _.set(formData, path, event.target.value);
    this.setState({
      formData,
      typing: false,
      typingTimeout: setTimeout(() => {
        this.props.getCarsRequest(search, formData.sortKey, formData.sortValue,
          formData.category_departmentId, formData.c_section, formData.location, formData.address,
          formData.priceMin, formData.priceMax, formData.brand, formData.model, formData.bodyType,
          formData.bYearMin, formData.bYearMax, formData.runMin, formData.runMax, formData.horsepowerMin,
          formData.horsepowerMax, formData.motor, formData.motorVolumeMin, formData.motorVolumeMax,
          formData.transmission, formData.traction, formData.color, formData.wheel, formData.customsCleared);
      }, 450)
    });
  }

  handleChangePlace = () => {
    const {changePlace} = this.state;
    this.setState({changePlace: !changePlace});
  }

  render() {
    const {productInfo, carFilters, category, location, carModels} = this.props;
    const {search, formData, changePlace} = this.state;
    return (
      <Wrapper>
        <div className='cars__header' style={ {background: `url('/images/banner/bg-cars.jpg')`} }
             onKeyPress={ e => this.search(e) }>
          <div className='container'>
            <section className='cars__header_content'>
              <div className='cars__search_area'>
                <input id="cars__search_input" placeholder="Փնտրել ..." title="Փնտրել..." type="search"
                       onChange={ e => this.handleSearch(e.target.value) }/>
                <button className='cars__search_button mr480' type='button'
                        onClick={ () => this.props.getCarsRequest(search) }
                >Փնտրել
                </button>
                <button className='cars__search_button dNone md480' type='button'
                        onClick={ () => this.props.getCarsRequest(search) }
                >
                  <FontAwesomeIcon icon={ faSearch }/>
                </button>
              </div>
              <Link to="/add_announcement" className="add">
                Տեղադրել հայտարարություն
              </Link>
            </section>
          </div>
        </div>
        <main>
          <div className='container'>
            <div className='product__content' style={ {flexDirection: changePlace ? 'row' : 'row-reverse'} }>
              <div className='product__content_row'>
                <div className='cars__sort_area'>
                  <p className="cars__length mr480">Ընդ․ ({ productInfo?.product?.length })</p>
                  <p className="cars__length dNone md480">
                    <FontAwesomeIcon icon={ faSearch }/> ({ productInfo?.product?.length })
                  </p>
                  <Sort s={ search } formData={ formData } request={ 'cars' }/>
                  <FontAwesomeIcon icon={ faExchangeAlt }
                                   title="Փոխել տեղերը"
                                   onClick={ this.handleChangePlace }
                                   className="sort__change_place"/>
                </div>
                <section className='product__item_container'>
                  <Product product={ productInfo.product } style={ {width: '33%'} }/>
                </section>
              </div>
              <section className='cars__filter_container'>
                <Selects
                  size={ "small" }
                  label={ 'ԲԱԺԻՆ' }
                  data={ category ? category.categoryDep : 'Տեղ․ չկա' }
                  value={ formData.category_departmentId }
                  vName={ 'name' }
                  keyValue={ 'id' }
                  onChange={ (event) => this.handleSelectFilter('category_departmentId', event) }
                /><br/>
                <Selects
                  size={ "small" }
                  label={ 'ԳՈՒՅՔԻ ՏԵՍԱԿԸ' }
                  data={ category ? category.categorySec : 'Տեղ․ չկա' }
                  value={ formData.c_section }
                  vName={ 'name' }
                  keyValue={ 'id' }
                  onChange={ (event) => this.handleSelectFilter('c_section', event) }
                /><br/>
                <hr/>
                <br/>
                <LocationSelect
                  size={ "small" }
                  label={ 'Տարածաշրջան' }
                  data={ location ? location : 'Տեղ․ չկա' }
                  value={ formData.location }
                  vName={ 'name' }
                  onChange={ (event) => this.handleSelectFilter('location', event) }
                /><br/>
                <Input
                  size={ "small" }
                  className={ 'filter__address' }
                  label={ 'Հասցե' }
                  value={ formData.address ? formData.address : "" }
                  title={ formData.address ? formData.address : '' }
                  onChange={ (event) => this.handleChangeFilter('address', event) }
                />
                <br/>
                <hr/>
                <br/>
                <div className="filter__price_block">
                  <Input
                    size={ "small" }
                    style={ {width: '45%'} }
                    label={ '$ Գին մին' }
                    value={ formData.priceMin }
                    title={ formData.priceMin }
                    onChange={ (event) => this.handleChangeFilter('priceMin', event) }
                  />
                  <Input
                    size={ "small" }
                    style={ {width: '45%'} }
                    label={ 'Գին մաքս' }
                    value={ formData.priceMax }
                    title={ formData.priceMax }
                    onChange={ (event) => this.handleChangeFilter('priceMax', event) }
                  />
                </div>
                <br/>
                <hr/>
                <br/>
                <Selects
                  size={ "small" }
                  label={ 'Մակնիշ' }
                  data={ carModels?.makes ? carModels.makes : null }
                  value={ formData.brand }
                  title={ formData.brand }
                  vName={ 'Make' }
                  keyValue={ 'Make' }
                  onChange={ (event) => this.handleSelectFilter('brand', event) }
                /><br/>
                <Selects
                  size={ "small" }
                  label={ 'Մոդել' }
                  data={ carModels?.model ? carModels.model : null }
                  value={ formData.model }
                  title={ formData.model }
                  vName={ 'Model' }
                  keyValue={ 'Model' }
                  onChange={ (event) => this.handleSelectFilter('model', event) }
                /><br/>
                <Selects
                  size={ "small" }
                  label={ 'Թափքը' }
                  data={ carModels?.category ? carModels.category : null }
                  value={ formData.bodyType }
                  title={ formData.bodyType }
                  vName={ 'Category' }
                  keyValue={ 'Category' }
                  onChange={ (event) => this.handleSelectFilter('bodyType', event) }
                />
                <br/>
                <hr/>
                <br/>
                <p className="filter__year_label">Տարի</p>
                <div className="filter__year_block">
                  <SelectNumber
                    style={ {width: '40%'} }
                    label={ 'մին' }
                    value={ formData.bYearMin }
                    data={ carModels?.model ? carModels.model : null }
                    optionName={ 'Year' }
                    onChange={ (event) => this.handleSelectFilter('bYearMin', event) }
                  />
                  <SelectNumber
                    style={ {width: '40%', textAlign: 'right'} }
                    label={ 'մաքս' }
                    value={ formData.bYearMax }
                    data={ carModels?.model ? carModels.model : null }
                    optionName={ 'Year' }
                    onChange={ (event) => this.handleSelectFilter('bYearMax', event) }
                  />
                </div>
                <br/>
                <p className="filter__run_label">Վազքը (կմ)</p>
                <div className="filter__floor_block">
                  <SelectNumber
                    style={ {width: '40%'} }
                    label={ 'մին' }
                    value={ formData.runMin }
                    data={ carFilters ? carFilters : null }
                    optionName={ 'run' }
                    onChange={ (event) => this.handleSelectFilter('runMin', event) }
                  />
                  <SelectNumber
                    style={ {width: '40%', textAlign: 'right'} }
                    label={ 'մաքս' }
                    value={ formData.runMax }
                    data={ carFilters ? carFilters : null }
                    optionName={ 'run' }
                    onChange={ (event) => this.handleSelectFilter('runMax', event) }
                  />
                </div>
                <br/>
                <p className="filter__horsepower_label">Ձիաուժ (կմ/ժ)</p>
                <div className="filter__floor_block">
                  <SelectNumber
                    style={ {width: '45%'} }
                    label={ 'մին' }
                    value={ formData.horsepowerMin }
                    data={ carFilters ? carFilters : null }
                    optionName={ 'horsepower' }
                    onChange={ (event) => this.handleSelectFilter('horsepowerMin', event) }
                  />
                  <SelectNumber
                    style={ {width: '45%', textAlign: 'right'} }
                    label={ 'մաքս' }
                    value={ formData.horsepowerMax }
                    data={ carFilters ? carFilters : null }
                    optionName={ 'horsepower' }
                    onChange={ (event) => this.handleSelectFilter('horsepowerMax', event) }
                  />
                </div>
                <br/>
                <hr/>
                <br/>
                <Selects
                  size={ "small" }
                  label={ 'Շարժիչ' }
                  data={ carFilters ? carFilters : null }
                  value={ formData.motor }
                  title={ formData.motor }
                  vName={ 'motor' }
                  keyValue={ 'motor' }
                  onChange={ (event) => this.handleSelectFilter('motor', event) }
                />
                <br/>
                <p className="filter__motor_label">Շարժիչի ծավալը (լ)</p>
                <div className="filter__motor_block">
                  <SelectNumber
                    style={ {width: '45%'} }
                    label={ 'մին' }
                    value={ formData.motorVolumeMin }
                    data={ carFilters ? carFilters : null }
                    optionName={ 'motorVolume' }
                    onChange={ (event) => this.handleSelectFilter('motorVolumeMin', event) }
                  />
                  <SelectNumber
                    style={ {width: '45%', textAlign: 'right'} }
                    label={ 'մաքս' }
                    value={ formData.motorVolumeMax }
                    data={ carFilters ? carFilters : null }
                    optionName={ 'motorVolume' }
                    onChange={ (event) => this.handleSelectFilter('motorVolumeMax', event) }
                  />
                </div>
                <br/>
                <Selects
                  size={ "small" }
                  label={ 'Փոխանցման տուփը' }
                  data={ carFilters ? carFilters : null }
                  value={ formData.transmission }
                  title={ formData.transmission }
                  vName={ 'transmission' }
                  keyValue={ 'transmission' }
                  onChange={ (event) => this.handleSelectFilter('transmission', event) }
                />
                <br/>
                <Selects
                  size={ "small" }
                  label={ 'Քարշակ' }
                  data={ carFilters ? carFilters : null }
                  value={ formData.traction }
                  title={ formData.traction }
                  vName={ 'traction' }
                  keyValue={ 'traction' }
                  onChange={ (event) => this.handleSelectFilter('traction', event) }
                />
                <br/>
                <Selects
                  size={ "small" }
                  label={ 'Գույն' }
                  data={ carFilters ? carFilters : null }
                  value={ formData.color }
                  title={ formData.color }
                  vName={ 'color' }
                  keyValue={ 'color' }
                  onChange={ (event) => this.handleSelectFilter('color', event) }
                />
                <br/>
                <Selects
                  size={ "small" }
                  label={ 'Ղեկ' }
                  data={ carFilters }
                  value={ formData.wheel }
                  title={ formData.wheel }
                  vName={ 'wheel' }
                  keyValue={ 'wheel' }
                  onChange={ (event) => this.handleSelectFilter('wheel', event) }
                />
                <br/>
                <hr/>
                <br/>
                <Selects
                  size={ "small" }
                  label={ 'Մաքսազերծված է' }
                  data={ [{value: 1, customsCleared: 'Այո'}, {value: 0, customsCleared: 'Ոչ'}] }
                  value={ formData.customsCleared }
                  title={ formData.customsCleared }
                  vName={ 'customsCleared' }
                  keyValue={ 'value' }
                  onChange={ (event) => this.handleSelectFilter('customsCleared', event) }
                />
              </section>
            </div>
          </div>
        </main>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  productInfo: state.products.productInfo,
  requestStatus: state.products.requestStatus,
  rateInfo: state.converter.rateInfo,
  category: state.category.category,
  location: state.location.location,
  carFilters: state.filters.carFilters,
  carModels: state.filters.carModels,
})

const mapDispatchToProps = {
  getCarsRequest,
  getCarFilter,
  getCategory,
  getLocationRequest,
  getCarModel,
}

const CarsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cars)

export default CarsContainer;
