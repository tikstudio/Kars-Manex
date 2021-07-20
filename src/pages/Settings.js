import React, { Component } from 'react';
import { connect } from "react-redux";
import { deleteToken, deleteUser, getUserRequest, updateUser, userInfoDelete } from "../store/actions/users";
import Wrapper from "../components/Wrapper";
import '../assets/CSS/pages/user.css'
import { NavLink, Link, Redirect } from "react-router-dom";
import CircleLoad from "../components/loads/CircularLoading";
import { getUserProductRequest } from "../store/actions/products";
import _ from "lodash";
import Selects from "../components/form/Select";
import { getCategory } from "../store/actions/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCalendarAlt,
  faEdit, faEnvelope,
  faPhoneAlt,
  faPlusCircle,
  faSearch,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Input from "../components/form/Input";
import "../assets/CSS/pages/settings.css";
import "../assets/CSS/components/modal.css";
import Avatars from "../components/utils/Avatar";
import Search from "../components/utils/Search";
import Save, { NormalButton } from "../components/form/Buttons";
import Access from "../components/utils/Modal";
import ResInfo from "../components/utils/ResInfo";
import EditProduct from "../components/products/editProduct";
import { Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "react-modal";
import FileEdit from "../components/form/FileEdit";
import EditAccordion from "../components/utils/EditAccordion";

class Settings extends Component {
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
      },
      userFormData: {},
      updateFormData: {},
      modalIsOpen: false,
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
  handleChange = (path, ev) => {
    const {userFormData} = this.state;
    const {myAccount, upErrors} = this.props;
    _.set(userFormData, path, ev);
    _.set(userFormData, 'id', myAccount?.id);
    if (upErrors && upErrors.image && path !== 'avatar'){
      userFormData.avatar = '';
    }
    this.setState({
      userFormData,
    })
  }
  handleSubmit = () => {
    const {userFormData} = this.state;
    this.props.updateUser(userFormData, (v) => {
      this.setState({process: v.loaded / v.total * 100})
    }, () => {
      console.log()
    }).then(() => this.props.getUserRequest());
    const {updateInfo} = this.props;
    if (updateInfo && updateInfo.result[0] === 1){
      this.setState({modalIsOpen: false})
    }
  }

  handleChangeImage = () => {
    this.setState({modalIsOpen: true});
  }
  closeModal = () => {
    this.setState({modalIsOpen: false})
  }

  render() {
    const {
      myAccount,
      requestStatus,
      token,
      role,
      userProducts,
      aPRStatus,
      category,
      deleteInfo,
      updateInfo,
      upErrors,
    } = this.props;
    const {user, sortData, formData, search, sorts, userFormData, modalIsOpen} = this.state;
    if (!token){
      return <Redirect to="/signing"/>;
    }
    const avatar = "/images/icons/avatar.jpg";
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '575px',
        padding: '0',
        zIndex: 10000,
      },
      overlay: {
        zIndex: 10000,
      }
    };
    return (
      <Wrapper showFooter={ false }>
        <menu className='user__header'>
          <img className="user__bg_image" src="/images/banner/user.png" alt="bg"/>
          <div className='container'>
            <div className='user__header_content'>
              { requestStatus === 'request' ? <CircleLoad/> :
                requestStatus === 'success' ? (
                  <div className="user__update_profile" id={ myAccount?.id }>
                    <div className='image__name'>
                      <Avatars
                        src={ myAccount?.avatar || avatar }
                        alt={ "avatar" }
                        id={ 'avatar__image' }
                        onError={ ev => {
                          ev.target.src = avatar
                        } }/>
                      <Tooltip
                        onClick={ () => this.handleChangeImage() }
                        onFocus={ (event) => event.stopPropagation() }
                        className={ 'delete__icon_button' } title="Փոխել նկարը" arrow>
                        <Button className={ 'product__settings' }>
                          <FontAwesomeIcon style={ {fontSize: '18px', color: 'white'} } icon={ faEdit }/>
                        </Button>
                      </Tooltip>
                      <Modal
                        isOpen={ modalIsOpen }
                        onRequestClose={ this.closeModal }
                        style={ customStyles }
                      >
                        <div className='successMessage'>
                          <h2 className='successText'>{ 'Փոխել նկարը' }</h2>
                          <div className="change__image_content">
                            <div className='change__avatar_block'>
                              <Avatars
                                src={ userFormData.avatar ? userFormData.avatar.preview : myAccount?.avatar || avatar }
                                alt={ "avatar" }
                                id={ 'avatar__image' }
                                onError={ ev => {
                                  ev.target.src = avatar
                                } }/>
                              { userFormData.avatar ? <p title={ userFormData.avatar.name }>
                                { _.truncate(userFormData.avatar.name, {
                                  'length': 20,
                                  'separator': ''
                                }) }</p> : null }
                            </div>
                            <div className="change__avatar_block">
                              <FileEdit accept="image/*"
                                        title={ 'Ընտրել նկար' }
                                        className={ 'fileEdit' }
                                        onChange={ (ev, files) => this.handleChange('avatar', files[0]) }/>
                              { upErrors.image ? <p className="modal__image_error" title={ upErrors.image }>
                                { _.truncate(upErrors.image, {
                                  'length': 50,
                                  'separator': ''
                                }) }</p> : null }
                            </div>
                          </div>
                          <div className='modal__buttons_block'>
                            <Save type="button"
                                  label={ 'Պահպանել' }
                                  onClick={ this.handleSubmit }/>
                            <Button variant="contained" color="secondary"
                                    startIcon={ <CloseIcon/> }
                                    className='close' onClick={ this.closeModal }>
                              Փակել
                            </Button>
                          </div>
                        </div>
                      </Modal>
                    </div>
                    <div className='contact__data dNone mf480'>
                      <h4>
                        { myAccount?.firstName + ' ' + myAccount?.lastName }
                      </h4>
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
                    <div className="user__update_row mr480">
                      <Input
                        className={ 'user__update_input' }
                        size={ 'small' }
                        label={ upErrors.firstName ? "Անունի սխալ" : "Անուն" }
                        name={ "firstName" }
                        type={ "text" }
                        errors={ upErrors.firstName ? upErrors.firstName : null }
                        placeholder={ "Անուն" }
                        title={ userFormData.firstName ? userFormData.firstName : myAccount?.firstName }
                        onChange={ (event) => this.handleChange('firstName', event.target.value) }
                        defaultValue={ myAccount?.firstName }/>
                      <br/>
                      <Input
                        className={ 'user__update_input' }
                        size={ 'small' }
                        label={ upErrors.lastName ? "Ազգանունի սխալ" : "Ազգանուն" }
                        name={ "lastName" }
                        type={ "text" }
                        errors={ upErrors.lastName ? upErrors.lastName : null }
                        placeholder={ "Ազգանուն" }
                        title={ userFormData.lastName ? userFormData.lastName : myAccount?.lastName }
                        onChange={ (event) => this.handleChange('lastName', event.target.value) }
                        defaultValue={ myAccount?.lastName }/>
                    </div>
                    <div className='contact__data mr480'>
                      <Input
                        className={ 'user__update_input' }
                        size={ 'small' }
                        label={ upErrors.work ? "Գործունեության սխալ" : "Գործունեություն" }
                        name={ "work" }
                        type={ "text" }
                        errors={ upErrors.work ? upErrors.work : null }
                        placeholder={ "Գործունեություն" }
                        title={ userFormData.work ? userFormData.work : myAccount?.work }
                        onChange={ (event) => this.handleChange('work', event.target.value) }
                        defaultValue={ myAccount?.work }/>
                      <br/>
                      <Input
                        className={ 'user__update_input' }
                        size={ 'small' }
                        label={ upErrors.phone ? "Հեռախոսահամարի սխալ" : "Հեռախոսահամար" }
                        name={ "phone" }
                        type={ "tel" }
                        errors={ upErrors.phone ? upErrors.phone : null }
                        placeholder={ "+374########" }
                        title={ userFormData.phone ? userFormData.phone : myAccount?.phone }
                        onChange={ (event) => this.handleChange('phone', event.target.value) }
                        defaultValue={ myAccount?.phone }/>
                      <br/>
                      <p className="account__create_date">
                        <FontAwesomeIcon icon={ faCalendarAlt }/>&ensp;
                        Ստեղծվել է՝ { moment(myAccount?.createdAt).format('L') }</p>
                    </div>
                    <div className="settings__buttons mr480">
                      <p>Պահպանել փոփոխությունները</p>
                      <Save type="button"
                            size="small"
                            label={ 'Պահպանել' }
                            onClick={ this.handleSubmit }/>
                    </div>
                  </div>
                ) : 'Տվյալների սխալ կամ բացակայություն' }
              <div className='user__settings'>
                { role === 'admin' ? <>
                    <NavLink to={ `/admin/kars&manex/Arman/7991/${ myAccount?.id }` }
                             className="myAccount__add_announcement mr769">
                      <FontAwesomeIcon icon={ faUser }/>&ensp;
                      Իմ էջը
                    </NavLink>
                    <NavLink to={ `/admin/kars&manex/Arman/7991/${ myAccount?.id }` }
                             className="myAccount__add_announcement dNone md769">
                      <FontAwesomeIcon icon={ faUser }/>
                    </NavLink>
                  </> :
                  <>
                    <NavLink to={ `/my_account/${ myAccount?.id }` } className="myAccount__add_announcement mr769">
                      <FontAwesomeIcon icon={ faUser }/>&ensp;
                      Իմ էջը
                    </NavLink>
                    <NavLink to={ `/my_account/${ myAccount?.id }` }
                             className="myAccount__add_announcement dNone md769">
                      <FontAwesomeIcon icon={ faUser }/>
                    </NavLink>
                  </>
                }
                <br/>
                <NavLink to="/add_announcement" className="myAccount__settings mr769">
                  <FontAwesomeIcon icon={ faPlusCircle }/>&ensp;
                  Ավելացնել հայտարարություն
                </NavLink>
                <NavLink to="/add_announcement" className="myAccount__settings dNone md769">
                  <FontAwesomeIcon icon={ faPlusCircle }/>
                </NavLink>
              </div>
            </div>
          </div>
          <br/>
          <div className='user__edit_row'>
            <EditAccordion
              media={ 'dNone md480' }
              form={
                <>
                  <div className="user__update_row">
                    <Input
                      className={ 'user__update_input' }
                      size={ 'small' }
                      label={ upErrors.firstName ? "Անունի սխալ" : "Անուն" }
                      name={ "firstName" }
                      type={ "text" }
                      errors={ upErrors.firstName ? upErrors.firstName : null }
                      placeholder={ "Անուն" }
                      title={ userFormData.firstName ? userFormData.firstName : myAccount?.firstName }
                      onChange={ (event) => this.handleChange('firstName', event.target.value) }
                      defaultValue={ myAccount?.firstName }/>
                    <br/>
                    <Input
                      className={ 'user__update_input' }
                      size={ 'small' }
                      label={ upErrors.lastName ? "Ազգանունի սխալ" : "Ազգանուն" }
                      name={ "lastName" }
                      type={ "text" }
                      errors={ upErrors.lastName ? upErrors.lastName : null }
                      placeholder={ "Ազգանուն" }
                      title={ userFormData.lastName ? userFormData.lastName : myAccount?.lastName }
                      onChange={ (event) => this.handleChange('lastName', event.target.value) }
                      defaultValue={ myAccount?.lastName }/>
                  </div>
                  <div className='contact__data'>
                    <Input
                      className={ 'user__update_input' }
                      size={ 'small' }
                      label={ upErrors.work ? "Գործունեության սխալ" : "Գործունեություն" }
                      name={ "work" }
                      type={ "text" }
                      errors={ upErrors.work ? upErrors.work : null }
                      placeholder={ "Գործունեություն" }
                      title={ userFormData.work ? userFormData.work : myAccount?.work }
                      onChange={ (event) => this.handleChange('work', event.target.value) }
                      defaultValue={ myAccount?.work }/>
                    <br/>
                    <Input
                      className={ 'user__update_input' }
                      size={ 'small' }
                      label={ upErrors.phone ? "Հեռախոսահամարի սխալ" : "Հեռախոսահամար" }
                      name={ "phone" }
                      type={ "tel" }
                      errors={ upErrors.phone ? upErrors.phone : null }
                      placeholder={ "+374########" }
                      title={ userFormData.phone ? userFormData.phone : myAccount?.phone }
                      onChange={ (event) => this.handleChange('phone', event.target.value) }
                      defaultValue={ myAccount?.phone }/>
                  </div>
                </>
              }
              saveButton={
                <Save type="button"
                      size="small"
                      label={ 'Պահպանել' }
                      onClick={ this.handleSubmit }/>
              }
            />
          </div>
          <section className='user__content' onKeyPress={ e => this.search(e) }>
            <div className='container'>
              <div className='user__content_row'>
                <div className='user__filter_row'>
                  <div className='user__filter_block'>
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
                  <br/>
                  <div className='user__filter_block'>
                    <p>Փոխել գաղտնաբառը</p>
                    <Link to='/reset_password'>
                      <NormalButton
                        label={ 'Փոխել' }
                      />
                    </Link>
                    <p>Հեռացնել հաշիվը</p>
                    <Access
                      label={ "Վստահ եք, որ ուզում եք ջնջել ձեր հաշիվը?" }
                      text={ 'Ջնջելով ձեր հաշիվը, ջնջվում է նաև\n' +
                      'ձեր բոլոր տվյալները և հայտարարությունները։' }
                      onClick={ () => this.props.deleteUser(myAccount?.id) }
                    />
                  </div>
                </div>
                <div className='user__product_area'>
                  <div className='userProduct__sort_area'>
                    <p className='mr480'>Ընդհանուր ({ userProducts?.products?.length })</p>
                    <p className='dNone md480'>
                      <FontAwesomeIcon style={ {fontSize: '12px'} } icon={ faSearch }/>
                      ({ userProducts?.products?.length })
                    </p>
                    <div className='user__search_area'>
                      <Search id={ "user__search_input" }
                              placeholder={ "Փնտրել հայտարարություն..." }
                              title={ "Փնտրել..." }
                              type={ "search" }
                              size={ 'small' }
                              name={ "search" }
                              onChange={ e => this.handleSearch(e) }/>
                      <button className='user__search_button  mr769' type='button'
                              onClick={ () => this.props.getUserProductRequest('', search) }
                      >Փնտրել
                      </button>
                      <button className='user__search_button dNone md769' type='button'
                              onClick={ () => this.props.getUserProductRequest('', search) }
                      >
                        <FontAwesomeIcon icon={ faSearch }/>
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
                  <div className='user__product_list2'>
                    { aPRStatus === "request" ?
                      <div className="centering"><CircleLoad/></div> : aPRStatus === "success" ?
                        <EditProduct style={ {width: '31%'} }
                                     product={ userProducts.products }
                                     thenFunction={ this.props.getUserProductRequest }
                        /> : _.isEmpty(userProducts.products)
                          ? <p className="centering">Հայտարարություն չկա</p> : <p className="centering">Սխալ</p>
                    }
                  </div>
                </div>
              </div>
            </div>
          </section>
          <ResInfo value={ updateInfo.result || updateInfo.p || updateInfo.e ?
            updateInfo.result[0] === 1 || updateInfo.p[0] === 1 || updateInfo.e[0] === 1 : null ? 'on' : null }
                   successFunc={ this.props.userInfoDelete }
                   res={ 'success' } msg={ 'Ձեր տվյալները հաջողությամբ թարմացվել են' }/>
          <ResInfo value={ updateInfo.result && updateInfo.p && updateInfo.e ?
            updateInfo.result[0] === 0 && updateInfo.p[0] === 0 && updateInfo.e[0] === 0 : null ? 'on' : null }
                   res={ 'warning' } msg={ 'Ձեր տվյալները չեն թարմացվել' }/>
          <ResInfo value={ upErrors.image ? 'on' : null }
                   res={ 'error' } msg={ upErrors.image }/>
          <ResInfo value={ deleteInfo.result === 1 ? 'on' : null }
                   successFunc={ this.props.deleteToken }
                   res={ 'error' } msg={ 'Ձեր հաշիվը հաջողությամբ հեռացվել է' }/>
          <ResInfo value={ deleteInfo.result === 0 ? 'on' : null }
                   res={ 'warning' } msg={ 'Հաշվի հեռացման սխալ' }/>
        </menu>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  requestStatus: state.users.requestStatus,
  myAccount: state.users.myAccount,
  token: state.users.token,
  role: state.users.role,
  upErrors: state.users.upErrors,
  delErrors: state.users.delErrors,
  updateInfo: state.users.updateInfo,
  deleteInfo: state.users.deleteInfo,
  userProducts: state.products.userProducts,
  aPRStatus: state.products.allProductsReqStatus,
  category: state.category.category,
})

const mapDispatchToProps = {
  getCategory,
  getUserRequest,
  getUserProductRequest,
  updateUser,
  deleteUser,
  deleteToken,
  userInfoDelete,
}

const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings)

export default SettingsContainer;
