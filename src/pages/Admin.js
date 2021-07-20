import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUserRequest } from "../store/actions/users";
import '../assets/CSS/pages/user.css'
import Product from "../components/products/product";
import { NavLink } from "react-router-dom";
import CircleLoad from "../components/loads/CircularLoading";
import { getUserProductRequest } from "../store/actions/products";
import _ from "lodash";
import Selects from "../components/form/Select";
import { getCategory } from "../store/actions/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCalendarAlt,
  faCog,
  faEnvelope,
  faPhoneAlt,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Avatars from "../components/utils/Avatar";
import Search from "../components/utils/Search";
import AdminWrapper from "../components/AdminWrapper";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
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
        category_departmentId: this.props.match.params.cd ? this.props.match.params.cd : '',
        c_section: this.props.match.params.cs ? this.props.match.params.cs : '',
      }
    }
  }

  async componentDidMount() {
    this.props.getUserRequest();
    this.props.getCategory(1, 1);
    await this.props.getUserProductRequest();
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
    await this.props.getUserProductRequest('', search, formData.sortKey, formData.sortValue,
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
    this.props.getUserProductRequest('', search, formData.sortKey, formData.sortValue,
      formData.category_id, formData.category_departmentId, formData.c_section,
    )
  }
  handleSearch = (event) => {
    this.setState({search: event.target.value})
  }
  search = async (event) => {
    const {search} = this.state;
    if (event.code === 'Enter'){
      await this.props.getUserProductRequest('', search);
    }
  }

  render() {
    const {myAccount, requestStatus, userProducts, aPRStatus, category} = this.props;
    const {user, sortData, formData, search, sorts} = this.state;

    const avatar = "/images/icons/avatar.jpg";
    return (
      <AdminWrapper>
        <menu className='user__header'>
          <img className="user__bg_image" src="/images/banner/user.png" alt="bg"/>
          <div className='container'>
            <div className='admin__header_content'>
              { requestStatus === 'request' ? <CircleLoad/> :
                requestStatus === 'success' ? (
                  <div className="user_profile" id={ myAccount?.id }>
                    <div className='image__name'>
                      <Avatars
                        src={ myAccount?.avatar || avatar }
                        alt={ "avatar" }
                        id={ 'avatar__image' }
                        onError={ ev => {
                          ev.target.src = avatar
                        } }/>
                      <br/>
                      <h4 className='user__name'>{ myAccount?.firstName } &ensp;{ myAccount?.lastName }</h4>
                    </div>
                    <div className='contact__data'>
                      <h4>
                        <FontAwesomeIcon icon={ faBriefcase }/>&ensp;
                        Գործունեթյունը։&ensp;{ myAccount?.work }
                      </h4>
                      <a href={ `tel:${ myAccount?.phone }` }>
                        <FontAwesomeIcon icon={ faPhoneAlt }/>&ensp;
                        Հեռ:&ensp;{ myAccount?.phone }
                      </a>
                      <a href={ `mailto:${ myAccount?.email }` } target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={ faEnvelope }/>&ensp;
                        Էլ. փոստ:&ensp;{ myAccount?.email }
                      </a>
                      <p className="account__create_date">
                        <FontAwesomeIcon icon={ faCalendarAlt }/>&ensp;
                        Ստեղծվել է՝ { moment(myAccount?.createdAt).format('L') }
                      </p>
                    </div>
                  </div>
                ) : 'Տվյալների սխալ կամ բացակայություն' }
              <div className='user__settings'>
                <NavLink to="/add_announcement" className="myAccount__add_announcement">
                  <FontAwesomeIcon icon={ faPlusCircle }/>&ensp;
                  Ավելացնել հայտարարություն
                </NavLink>
                <br/>
                <NavLink to={ `/my_account/${ myAccount?.id }/settings` } className="myAccount__settings">
                  <FontAwesomeIcon icon={ faCog }/>&ensp;
                  Կարգավորումներ
                </NavLink>
              </div>
            </div>
          </div>
          <section className='user__content' onKeyPress={ e => this.search(e) }>
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
                    <p>Ընդհանուր ({ userProducts?.products?.length })</p>
                    <div className='user__search_area'>
                      <Search id={ "user__search_input" }
                              placeholder={ "Փնտրել հայտարարություն..." }
                              title={ "Փնտրել..." }
                              type={ "search" }
                              size={ 'small' }
                              name={ "search" }
                              onChange={ e => this.handleSearch(e) }/>
                      <button className='user__search_button' type='button'
                              onClick={ () => this.props.getUserProductRequest('', search) }
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
                  { user ? <h2>{ user }</h2> : null }
                  <div className='user__product_list'>
                    { aPRStatus === "request" ?
                      <div className='centering'><CircleLoad/></div> : aPRStatus === "success" ?
                        <Product
                          product={ userProducts.products }/> : _.isEmpty(userProducts.products)
                          ? "Հայտարարություն չկա" : "Սխալ"
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
  requestStatus: state.users.requestStatus,
  myAccount: state.users.myAccount,
  token: state.users.token,
  userProducts: state.products.userProducts,
  aPRStatus: state.products.allProductsReqStatus,
  category: state.category.category,
})

const mapDispatchToProps = {
  getCategory,
  getUserRequest,
  getUserProductRequest,
}

const AdminContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Admin)

export default AdminContainer;
