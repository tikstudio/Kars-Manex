import React, { Component } from 'react';
import { connect } from "react-redux";
import '../assets/CSS/pages/user.css'
import '../assets/CSS/pages/announcements.css'
import _ from "lodash";
import Selects from "../components/form/Select";
import { getCategory } from "../store/actions/category";
import Search from "../components/utils/Search";
import AdminWrapper from "../components/AdminWrapper";
import { getAllProductRequest } from "../store/actions/products";
import CircleLoad from "../components/loads/CircularLoading";
import EditProduct from "../components/products/editProduct";

class AllProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortData: [
        {title: 'Ամենաթարմերը', value: 'createdAt-DESC'},
        {title: 'Գին՝  էժանից - թանկ', value: 'price-ASC'},
        {title: 'Գին՝  թանկից - էժան', value: 'price-DESC'},
        {title: 'Թարմացված՝  ամենահները', value: 'updatedAt-ASC'},
        {title: 'Թարմացված՝  ամենանորերը', value: 'updatedAt-DESC'},
      ],
      sorts: 'createdAt-DESC',
      search: '',
      formData: {
        sortKey: 'createdAt', sortValue: 'DESC',
        category_departmentId: '',
        c_section: '',
      }
    }
  }

  async componentDidMount() {
    this.props.getCategory(1, 1);
    await this.props.getAllProductRequest();
  }

  handleSelectFilter = async (path, event) => {
    const {formData, search} = this.state;
    _.set(formData, path, event.target.value);
    this.setState({formData});
    if (formData.category_id === ''){
      await this.props.getCategory(1, 1);
      _.set(formData, 'category_departmentId', '');
      _.set(formData, 'c_section', '');
      this.setState({formData});
    } else if (formData.category_departmentId === ''){
      await this.props.getCategory(1, 1);
      _.set(formData, 'c_section', '');
      this.setState({formData});
    } else{
      await this.props.getCategory(formData.category_id, formData.category_departmentId);
    }
    await this.props.getAllProductRequest(search, formData.sortKey, formData.sortValue,
      formData.category_id, formData.category_departmentId, formData.c_section,
    )
  }

  handleSorting = (ev) => {
    this.setState({sorts: ev.target.value});
    let res = _.split(ev.target.value, '-', 2);
    const {formData, search} = this.state;
    _.set(formData, 'sortKey', res[0]);
    _.set(formData, 'sortValue', res[1]);
    this.setState({formData});
    this.props.getAllProductRequest(search, formData.sortKey, formData.sortValue,
      formData.category_id, formData.category_departmentId, formData.c_section,
    )
  }

  handleSearch = (event) => {
    this.setState({search: event.target.value})
  }
  search = async (event) => {
    const {search} = this.state;
    if (event.code === 'Enter'){
      await this.props.getAllProductRequest(search);
    }
  }

  render() {
    const {category, allProducts, allProductsReqStatus} = this.props;
    const {sortData, formData, search, sorts} = this.state;
    return (
      <AdminWrapper>
        <menu className='user__header'>
          <img className="user__bg_image" src="/images/banner/user.png" alt="bg"/>
          <section className='new_announcements' onKeyPress={ e => this.search(e) }>
            <div className='container'>
              <div className='user__content_row'>
                <div className='user__filter_area'>
                  <Selects
                    label={ 'ՍԵՓԱԿԱՆՈՒԹՅՈՒՆ' }
                    data={ category ? category.category : 'Տեղ․ չկա' }
                    value={ formData.category_id }
                    vName={ 'c_name' }
                    keyValue={ 'id' }
                    onChange={ (event) => this.handleSelectFilter('category_id', event) }
                  />
                  <br/>
                  <Selects
                    label={ 'ԲԱԺԻՆ' }
                    data={ category ? category.categoryDep : 'Տեղ․ չկա' }
                    value={ formData.category_departmentId }
                    vName={ 'name' }
                    keyValue={ 'id' }
                    onChange={ (event) => this.handleSelectFilter('category_departmentId', event) }
                  />
                  <br/>
                  <Selects
                    label={ 'ԳՈՒՅՔԻ ՏԵՍԱԿԸ' }
                    data={ category ? category.categorySec : 'Տեղ․ չկա' }
                    value={ formData.c_section }
                    vName={ 'name' }
                    keyValue={ 'id' }
                    onChange={ (event) => this.handleSelectFilter('c_section', event) }
                  />
                </div>
                <div className='user__product_area'>
                  <div className='userProduct__sort_area'>
                    <p>Ընդհանուր ({ allProducts?.products?.length })</p>
                    <div className='user__search_area'>
                      <Search id={ "user__search_input" }
                              placeholder={ "Փնտրել հայտարարություն..." }
                              title={ "Փնտրել..." }
                              type={ "search" }
                              size={ 'small' }
                              name={ "search" }
                              onChange={ e => this.handleSearch(e) }/>
                      <button className='user__search_button' type='button'
                              onClick={ () => this.props.getAllProductRequest(search) }
                      >Փնտրել
                      </button>
                    </div>
                    <div className='user__sort_block'>
                      <Selects
                        size={ "small" }
                        label={ 'Ամենաթարմերը' }
                        data={ sortData }
                        value={ sorts }
                        title={ _.find(sortData, ['value', sorts])?.title }
                        vName={ 'title' }
                        keyValue={ 'value' }
                        onChange={ (event) => this.handleSorting(event) }
                      />
                    </div>
                  </div>
                  <div className='user__product_list2'>
                    { allProductsReqStatus === "request" ? <div className="centering"><CircleLoad/></div> :
                      allProductsReqStatus === "success" ?
                        <EditProduct style={ {width: '31%'} } product={ allProducts.products }
                                     thenFunction={ this.props.getAllProductRequest }
                        /> :
                        _.isEmpty(allProducts.products) ? <p className="centering">Հայտարարություն չկա</p> :
                          <p className="centering">Սխալ</p>
                    }
                  </div>
                </div>
              </div>
            </div>
          </section>
        </menu>
      </AdminWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  allProducts: state.products.allProducts,
  allProductsReqStatus: state.products.allProductsReqStatus,
  category: state.category.category,
})

const mapDispatchToProps = {
  getCategory,
  getAllProductRequest,
}

const AllProductsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllProducts)

export default AllProductsContainer;
