import React, { Component } from 'react';
import Wrapper from "../components/Wrapper";
import { connect } from "react-redux";
import { getProductRequest } from "../store/actions/products";
import Product from "../components/products/product";
import '../assets/CSS/pages/house.css';
import Sort from "../components/filter/Sort";
import Selects from "../components/form/Select";
import _ from "lodash";
import { getCategory } from "../store/actions/category";
import { getLocationRequest } from "../store/actions/location";
import LocationSelect from "../components/form/LocationSelect";
import Input from "../components/form/Input";
import { getHomeFilter } from "../store/actions/filters";
import SelectNumber from "../components/form/SelectNumber";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

class Houses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      formData: {
        sortKey: 'createdAt', sortValue: 'DESC',
        category_departmentId: this.props.match.params.cd ? this.props.match.params.cd : '',
        c_section: this.props.match.params.cs ? this.props.match.params.cs : '',
        location: '', address: '', priceMin: '',
        priceMax: '', building_type: '', new_built: '',
        floorMin: '', floorMax: '', room_numbers: '',
        bathRoom_numbers: '', areaMin: '', areaMax: '',
        payment: '', renovation: '',
      },
      typing: false,
      typingTimeout: 0,
      changePlace: true,
    }
  }

  componentDidMount() {
    const {formData} = this.state;
    this.props.getCategory(1, 1);
    this.props.getLocationRequest();
    this.props.getHomeFilter();
    this.props.getProductRequest('', formData.sortKey, formData.sortValue,
      formData.category_departmentId, formData.c_section);
  }

  handleSearch = (event) => {
    this.setState({search: event.target.value})
  }
  search = async (event) => {
    const {search} = this.state;
    if (event.code === 'Enter'){
      await this.props.getProductRequest(search);
    }
  }

  handleSelectFilter = async (path, event) => {
    const {formData, search} = this.state;
    _.set(formData, path, event.target.value);
    this.setState({formData});
    if (formData.category_departmentId === ''){
      await this.props.getCategory(1, 1);
      _.set(formData, 'c_section', '');
      this.setState({formData});
    } else{
      await this.props.getCategory(1, formData.category_departmentId);
    }
    await this.props.getProductRequest(search, formData.sortKey, formData.sortValue,
      formData.category_departmentId, formData.c_section, formData.location, formData.address,
      formData.priceMin, formData.priceMax, formData.building_type, formData.new_built,
      formData.floorMin, formData.floorMax, formData.room_numbers, formData.bathRoom_numbers,
      formData.areaMin, formData.areaMax, formData.payment, formData.renovation);
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
        this.props.getProductRequest(search, formData.sortKey, formData.sortValue,
          formData.category_departmentId, formData.c_section, formData.location, formData.address,
          formData.priceMin, formData.priceMax, formData.building_type, formData.new_built,
          formData.floorMin, formData.floorMax, formData.room_numbers, formData.bathRoom_numbers,
          formData.areaMin, formData.areaMax, formData.payment, formData.renovation);
      }, 450)
    });
  }

  handleChangePlace = () => {
    const {changePlace} = this.state;
    this.setState({changePlace: !changePlace});
  }

  render() {
    const {productInfo, category, location, homeFilters} = this.props;
    const {search, formData, changePlace} = this.state;
    return (
      <Wrapper>
        <div className='house__header' style={ {background: `url('/images/banner/bg-house.jpg')`} }
             onKeyPress={ e => this.search(e) }>
          <div className='container'>
            <section className='house__header_content'>
              <div className='search__area'>
                <input id="search-input" placeholder="Փնտրել ..." title="Փնտրել..." type="search"
                       name="search" onChange={ e => this.handleSearch(e) }/>
                <button className='search__button mr480' type='button'
                        onClick={ () => this.props.getProductRequest(search) }
                >Փնտրել
                </button>
                <button className='search__button dNone md480' type='button'
                        onClick={ () => this.props.getProductRequest(search) }
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
                <div className='product__sort_area'>
                  <p className="product__length mr480">Ընդ․ ({ productInfo?.product?.length })</p>
                  <p className="product__length dNone md480">
                    <FontAwesomeIcon icon={ faSearch }/> ({ productInfo?.product?.length })
                  </p>
                  <Sort s={ search } formData={ formData } request={ 'houses' }/>
                  <FontAwesomeIcon icon={ faExchangeAlt }
                                   title="Փոխել տեղերը"
                                   onClick={ this.handleChangePlace }
                                   className="sort__change_place"/>
                </div>
                <section className='product__item_container'>
                  <Product product={ productInfo.product } style={ {width: '33%'} }/>
                </section>
              </div>
              <section className='filter_container'>
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
                <Selects
                  size={ "small" }
                  label={ 'Շինության տիպը' }
                  data={ homeFilters ? homeFilters : null }
                  value={ formData.building_type }
                  title={ formData.building_type }
                  vName={ 'building_type' }
                  keyValue={ 'building_type' }
                  onChange={ (event) => this.handleSelectFilter('building_type', event) }
                /><br/>
                <Selects
                  size={ "small" }
                  label={ 'Նորակառույց' }
                  data={ [{value: 1, new_built: 'Այո'}, {value: 0, new_built: 'Ոչ'}] }
                  value={ formData.new_built }
                  title={ formData.new_built }
                  vName={ 'new_built' }
                  keyValue={ 'value' }
                  onChange={ (event) => this.handleSelectFilter('new_built', event) }
                /><br/>
                <Selects
                  size={ "small" }
                  label={ 'Վերանորոգում' }
                  data={ homeFilters ? homeFilters : null }
                  value={ formData.renovation }
                  title={ formData.renovation }
                  vName={ 'renovation' }
                  keyValue={ 'renovation' }
                  onChange={ (event) => this.handleSelectFilter('renovation', event) }
                />
                <br/>
                <hr/>
                <br/>
                <div className="filter__floor_block">
                  <Input
                    size={ "small" }
                    style={ {width: '48%'} }
                    label={ `Հարկ մին` }
                    value={ formData.floorMin }
                    title={ formData.floorMin }
                    onChange={ (event) => this.handleChangeFilter('floorMin', event) }
                  />
                  <Input
                    size={ "small" }
                    style={ {width: '48%'} }
                    label={ 'Հարկ մաքս' }
                    value={ formData.floorMax }
                    title={ formData.floorMax }
                    onChange={ (event) => this.handleChangeFilter('floorMax', event) }
                  />
                </div>
                <br/>
                <SelectNumber
                  label={ 'Սենյակների քանակ' }
                  value={ formData.room_numbers }
                  data={ homeFilters ? homeFilters : null }
                  optionName={ 'room_numbers' }
                  onChange={ (event) => this.handleChangeFilter('room_numbers', event) }
                />
                <br/>
                <SelectNumber
                  label={ 'Սանհանգույցների քանակ' }
                  value={ formData.bathRoom_numbers }
                  data={ homeFilters ? homeFilters : null }
                  optionName={ 'bathRoom_numbers' }
                  onChange={ (event) => this.handleChangeFilter('bathRoom_numbers', event) }
                />
                <br/>
                <p className="filter__area_label">Ընդհանուր մակերեսը (մ<sup>2</sup>)</p>
                <div className="filter__area_block">
                  <Input
                    size={ "small" }
                    style={ {width: '45%'} }
                    label={ 'մին' }
                    value={ formData.areaMin }
                    title={ formData.areaMin }
                    onChange={ (event) => this.handleChangeFilter('areaMin', event) }
                  />
                  <Input
                    size={ "small" }
                    style={ {width: '45%'} }
                    label={ 'մաքս' }
                    value={ formData.areaMax }
                    title={ formData.areaMax }
                    onChange={ (event) => this.handleChangeFilter('areaMax', event) }
                  />
                </div>
                <br/>
                <hr/>
                <br/>
                <SelectNumber
                  label={ 'Վճարման կարգը' }
                  value={ formData.payment }
                  data={ homeFilters ? homeFilters : null }
                  optionName={ 'payment' }
                  onChange={ (event) => this.handleChangeFilter('payment', event) }
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
  homeFilters: state.filters.homeFilters,
})

const mapDispatchToProps = {
  getProductRequest,
  getCategory,
  getLocationRequest,
  getHomeFilter,
}

const HousesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Houses)

export default HousesContainer;
