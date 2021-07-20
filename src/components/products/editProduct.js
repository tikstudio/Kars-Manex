import React, { Component } from 'react';
import Utils from "../../helpers/Utils";
import { connect } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt, faCamera,
  faCheckSquare, faCommentAlt,
  faLayerGroup, faMapMarkedAlt, faMapMarkerAlt,
  faPen,
  faPhoneAlt,
  faStar,
  faTimes, faTimesCircle,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import CircleLoad from "../loads/CircularLoading";
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import _ from "lodash";
import { Link } from "react-router-dom";
import Avatars from "../utils/Avatar";
import Breadcrumb from "../utils/Breadcrumb";
import Input from "../form/Input";
import { InputAdornment, Tooltip } from "@material-ui/core";
import LocationSelect from "../form/LocationSelect";
import { getLocationRequest } from "../../store/actions/location";
import { AccountCircle } from "@material-ui/icons";
import Selects from "../form/Select";
import {
  accessProduct,
  deleteInfos,
  removeProduct,
  removeProductImage,
  updateCar,
  updateHome
} from "../../store/actions/products";
import Access from "../utils/Modal";
import Button from "@material-ui/core/Button";
import ResInfo from "../utils/ResInfo";
import Save from "../form/Buttons";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import { getCarModel } from "../../store/actions/filters";
import Modal from "react-modal";
import FileEdit from "../form/FileEdit";
import CloseIcon from "@material-ui/icons/Close";

class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: '',
      formData: {},
      modalIsOpen: false,
      removeImage: [],
    };
  }

  async componentDidMount() {
    await this.props.getLocationRequest();
    await this.props.getCarModel();
  }

  handleZoom = (e) => {
    const {product} = this.props;
    const i = product.findIndex(r => r.id === e)
    if (i > -1){
      this.setState({products: product[i]})
      this.zoom.className = "zoom__container";
    }
  }

  handleChange = async (path, ev) => {
    const {formData} = this.state;
    const {upErrors} = this.props;
    _.set(formData, path, ev);
    if (upErrors && upErrors.image && path !== 'image'){
      formData.image = '';
    }
    if (upErrors && upErrors.image && path !== 'pictures'){
      formData.pictures = ''
    }
    this.setState({formData})
    if (path === 'brand' || path === 'model'){
      await this.props.getCarModel(formData.brand, formData.model);
    }
  }

  handleSubmit = () => {
    const {formData, products} = this.state;
    const {thenFunction} = this.props;
    _.set(formData, 'id', products.id);
    _.set(formData, 'category_id', products.category_id);
    _.set(formData, 'oldImage', products.image);
    this.setState({formData})
    if (+formData.category_id === 1){
      this.props.updateHome(formData, (v) => {
        this.setState({process: v.loaded / v.total * 100})
      }, () => {
        console.log()
      }).then(() => {
        thenFunction()
      })
    } else if (+formData.category_id === 2){
      this.props.updateCar(formData, (v) => {
        this.setState({process: v.loaded / v.total * 100})
      }, () => {
        console.log()
      }).then(() => {
        thenFunction()
      })
    }
  }

  handleChangeImage = () => {
    this.setState({modalIsOpen: true});
  }
  closeModal = () => {
    this.setState({modalIsOpen: false})
  }

  handleRemoveImage = (id) => {
    const {removeImage} = this.state;
    this.props.removeProductImage(id);
    removeImage.push(id);
    this.setState({removeImage})
  }

  handleRemoveNewImage = (key) => {
    const {formData} = this.state;
    formData.pictures.splice(key, 1);
    this.setState({formData})
  }

  render() {
    const {
      requestStatus, product, rateInfo, style, errors, locations, role, updateProductInfo, upErrors,
      accessProductInfo, accessErrors, deleteProductInfo, delErrors, thenFunction, carModels,
    } = this.props;
    const {products, formData, modalIsOpen, removeImage} = this.state;
    const avatar = "/images/icons/loginIcon.png";

    const images = _.map(products.productPictures, (size) => ({
      src: size.link,
      alt: `Announcements`,
    }));
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        padding: '0',
        zIndex: 10000,
      },
      overlay: {
        zIndex: 10000,
      }
    };
    return (
      <>
        { requestStatus === 'request' ? <div className="centering"><CircleLoad/></div> :
          requestStatus === 'fail' ? <div className='centering'>Տվյալների սխալ կամ բացակայություն</div> :
            product?.map((val, key) => (
              <div className="listing__item" key={ key } style={ style }>
                <div className="product__setting_container">
                  { role === 'admin' ? (<>
                    <div className="product__setting_block">
                      <Tooltip
                        onClick={ () => this.props.accessProduct(val.id, true).then(() => thenFunction()) }
                        onFocus={ (event) => event.stopPropagation() }
                        className={ 'delete__icon_button' } title="Հաստատել" arrow>
                        <Button className={ 'product__settings' }>
                          <FontAwesomeIcon style={ {color: val.access ? 'grey' : 'green', fontSize: '24px'} }
                                           icon={ faCheckSquare }/>
                        </Button>
                      </Tooltip>
                      <br/>
                      <Tooltip
                        onClick={ () => this.props.accessProduct(val.id, false).then(() => thenFunction()) }
                        onFocus={ (event) => event.stopPropagation() }
                        className={ 'delete__icon_button' } title="Չեղարկել" arrow>
                        <Button className={ 'product__settings' }>
                          <FontAwesomeIcon style={ {color: 'orangered', fontSize: '24px'} } icon={ faTimes }/>
                        </Button>
                      </Tooltip>
                      <br/>
                      <Tooltip
                        onClick={ () => this.props.accessProduct(val.id, val.access, !val.star).then(() => thenFunction()) }
                        onFocus={ (event) => event.stopPropagation() }
                        className={ 'delete__icon_button' } title={ `Լավագույն${ val.star ? ' (on)' : ' (off)' }` }
                        arrow>
                        <Button className={ 'product__settings' }>
                          <FontAwesomeIcon style={ {color: val.star ? 'grey' : '#f8b62c'} } icon={ faStar }/>
                        </Button>
                      </Tooltip>
                    </div>
                    <br/></>) : null }
                  <div className="product__setting_block">
                    <Tooltip
                      onClick={ () => this.handleZoom(val.id) }
                      onFocus={ (event) => event.stopPropagation() }
                      className={ 'delete__icon_button' } title="Թարմացնել" arrow>
                      <Button className={ 'product__settings' }>
                        <FontAwesomeIcon style={ {color: 'rgb(81, 81, 175)', fontSize: '17px'} } icon={ faPen }/>
                      </Button>
                    </Tooltip>
                    <br/>
                    <Access
                      className={ 'product__settings' }
                      label={ 'Վստահ եք, որ ուզում եք ջնջել այս հայտարարությունը?' }
                      text={ 'Ջնջելով այս հայտարարությունը, այլևս չեք կարող վերականգնել այն։' }
                      onClick={ () => this.props.removeProduct(val.id).then(() => thenFunction()) }
                      button={ true }
                    />
                  </div>
                </div>
                <div className="properties__item" data-sr-id="3">
                  <div className="properties__thumb">
                    <div data-id={ val.id } onClick={ () => this.handleZoom(val.id) }
                         className="item-photo">
                      <img
                        onError={ ev => {
                          ev.target.src = "/images/icons/icon.png"
                          ev.target.className = 'product__img_err'
                        } }
                        className={ val.image ? null : 'product__img_err' }
                        src={ val.image ? val.image : '/images/icons/icon.png' }
                        alt={ val.p_name }
                      />
                      <figure className="item-photo__hover item-photo__hover--params">
                        <span className="properties__params">
                          <FontAwesomeIcon icon={ faLayerGroup }/>&ensp;
                          { val.categorySec?.name }
                        </span>
                        <span
                          className="properties__params">
                          <FontAwesomeIcon icon={ faProductHunt }/>&ensp;
                          { val.p_name }
                        </span>
                        <span
                          className="properties__params">
                           <FontAwesomeIcon icon={ faPhoneAlt }/>&ensp;
                          { val.phone }
                        </span>
                        <span className="properties__intro mr480">
                          <FontAwesomeIcon icon={ faCommentAlt }/>&ensp;
                          { val.description?.slice(0, 50).concat('...') }
                        </span>
                        <span className="properties__intro dNone md480">
                          <FontAwesomeIcon icon={ faCommentAlt }/>&ensp;
                          { val.description?.slice(0, 20).concat('...') }
                        </span>
                        <span className="properties__time">
                          <FontAwesomeIcon icon={ faCalendarAlt }/>&ensp;
                          Ավելացվել է՝ { val.createdAt ? moment(val.createdAt).format('L') : 'տեղ․ չկա' }
                        </span>
                        <span className="properties__more">ՄԱՆՐԱՄԱՍՆԵՐԸ</span>
                      </figure>
                    </div>
                    <span className="properties__ribon">{ val.categoryDep?.name }</span>
                  </div>
                  <div className="properties__info">
                    <div className="properties__address ">
                      <div>
                        <span className="properties__address-street">
                           <FontAwesomeIcon icon={ faMapMarkedAlt }/>&ensp;
                          { val.address }
                        </span>
                        <span className="properties__address-city">
                           <FontAwesomeIcon icon={ faMapMarkerAlt }/>&ensp;
                          { val.productsLocate?.name }
                        </span>
                      </div>
                      { val.star === true ? <FontAwesomeIcon style={ {color: '#f8b62c'} } icon={ faStar }/> : null }
                    </div>
                    <hr className="divider--dotted properties__divider"/>
                    <div className="properties__offer">
                      <div className="properties__offer-column">
                        <div className="properties__offer-value">
                          <strong>
                            { rateInfo ? Utils.formatPrice(val.price, rateInfo) :
                              <div className='priceLoad'>
                                { Utils.formatPrice(val.price, rateInfo) }
                              </div> }
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )) }
        <div ref={ (ref) => this.zoom = ref } className='container zoom_hidden'>
          <Modal
            isOpen={ modalIsOpen }
            onRequestClose={ this.closeModal }
            style={ customStyles }
          >
            <div className='pictureModal__block'>
              <h2 className='successText'>{ 'Փոխել նկարը' }</h2>
              <div className='images__modal_title'>
                <h4>Գլխավոր նկար</h4>
                <h4>Ավելացնել նկարներ</h4>
              </div>
              { upErrors.image ? <p className="modal__image_error" title={ upErrors.image }>
                { _.truncate(upErrors.image, {
                  'length': 50,
                  'separator': ''
                }) }</p> : null }
              <div className="change__image_content">
                <div style={ {borderRight: '1px solid gray'} } className="change__image_block">
                  <div className='change__image_item'>
                    <img
                      onError={ ev => {
                        ev.target.src = "/images/icons/icon.png"
                      } }
                      className={ 'product__edit_image' }
                      src={ formData.image ? formData.image.preview : products.image ? products.image : '/images/icons/icon.png' }
                      alt={ products.p_name }
                    />
                    { products.image ? <p title={ products.image.name }>
                      { _.truncate(products.image.name, {
                        'length': 20,
                        'separator': ''
                      }) }</p> : null }
                  </div>
                  <div className="change__image_item">
                    <FileEdit accept="image/*"
                              title={ 'Ընտրել նկար' }
                              className={ 'imageEdit' }
                              onChange={ (ev, files) => this.handleChange('image', files[0]) }/>
                  </div>
                </div>
                <div style={ {padding: '20px'} } className="change__image_block">
                  <div className="change__image_item2">
                    <FileEdit accept="image/*"
                              multiple
                              title={ 'Ընտրել նկար' }
                              className={ 'picturesEdit' }
                              onChange={ (ev, files) => this.handleChange('pictures', files) }/>
                    { formData.pictures ?
                      _.map(formData.pictures, (v, k) => (
                        <div key={ k } className='modal__pictures_block'>
                          <img
                            onError={ ev => {
                              ev.target.src = "/images/icons/icon.png"
                            } }
                            className={ 'product__edit_pictures' }
                            src={ v.preview ? v.preview : '/images/icons/icon.png' }
                            alt={ v.name }
                          />
                          <FontAwesomeIcon
                            title={ 'Չավելացնել' }
                            style={ {color: 'limegreen'} }
                            onClick={ () => this.handleRemoveNewImage(k) }
                            className={ 'modal__picture_remove' } icon={ faTimesCircle }/>
                        </div>
                      ))
                      : null }
                    { products.productPictures ?
                      _.map(products.productPictures, (v, k) => (
                        <div key={ k } className='modal__pictures_block'
                             style={ removeImage.includes(v.id) ? {display: 'none'} : null }>
                          <img
                            onError={ ev => {
                              ev.target.src = "/images/icons/icon.png"
                            } }
                            className={ 'product__edit_pictures' }
                            src={ v.link ? v.link : '/images/icons/icon.png' }
                            alt={ products.p_name }
                          />
                          <FontAwesomeIcon
                            title={ 'Հեռացնել' }
                            onClick={ () => this.handleRemoveImage(v.id) }
                            className={ 'modal__picture_remove' } icon={ faTimesCircle }/>
                        </div>
                      ))
                      : null }
                  </div>
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
          <div className='zoom__content'>
            <div className='photos__content'>
              <Breadcrumb
                section1={ products.category ? products.category?.link : '' }
                section2={ products.category ? products.categoryDep?.id : '' }
                section3={ products.category ? products.categorySec?.id : '' }
                label1={ products.category ? products.category?.c_name : '' }
                label2={ products.category ? products.categoryDep?.name : '' }
                label3={ products.category ? products.categorySec?.name : '' }
              />
              <br/>
              <Tooltip
                onClick={ () => this.handleChangeImage() }
                onFocus={ (event) => event.stopPropagation() }
                title="Ավելացնել/ջնջել նկար" arrow>
                <Button>
                  <FontAwesomeIcon style={ {color: 'white', fontSize: '20px'} } icon={ faCamera }/>
                </Button>
              </Tooltip>
              <br/>
              <div className="slide-container">
                <Carousel images={ images }/>
              </div>
            </div>
            <div className='info__content m'>
              <div className="info__content_title_block">
                <div className='edit__price_block'>
                  <Input
                    size={ "small" }
                    className={ 'info__content_title' }
                    label={ `Կոդ ${ products.p_name }` }
                    errors={ errors?.p_name ? errors.p_name : null }
                    value={ formData.p_name ? formData.p_name : "" }
                    title={ formData.p_name ? formData.p_name : '' }
                    onChange={ (event) => this.handleChange('p_name', event.target.value) }
                    defaultValue={ products.p_name }
                  />
                  <br/>
                  <br/>
                  <Input className={ "info__content_title" }
                         label={ errors?.price ? "Գնի սխալ" : `Գինը ${ Utils.zoomFormatPrice(products.price, rateInfo) }` }
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
                         defaultValue={ products?.price }
                  />
                </div>
                <Link to={ `/user/${ products?.productsUser?.id }` } className="product__user_row">
                  <Avatars
                    src={ products?.productsUser?.avatar || avatar }
                    alt={ "avatar" }
                    id={ 'menu__user_avatar' }
                    onError={ ev => {
                      ev.target.src = avatar
                    } }/>
                  <div className="product__info_row">
                    <h3
                      className="product__user_name">{ products?.productsUser?.firstName } { products?.productsUser?.lastName }</h3>
                    <p className="product__user_work"
                       title={ products?.productsUser?.work }>{ _.truncate(products?.productsUser?.work, {
                      'length': 14,
                      'separator': ' '
                    }) }</p>
                    <p className="product__user_email"
                       title={ products?.productsUser?.phone }>{ _.truncate(products?.productsUser?.phone, {
                      'length': 14,
                      'separator': ' '
                    }) }</p>
                  </div>
                </Link>
              </div>
              <div className='product__info_table'>
                <div className='product__info_tbody'>
                  <div className='product__info_block'>
                    <div className='product__info_item'>
                      <p>Տարածաշրջան</p>
                      <LocationSelect
                        className={ 'location__select' }
                        size={ "small" }
                        label={ products.productsLocate?.name }
                        data={ locations ? locations : 'Տեղ․ չկա' }
                        value={ formData.location }
                        errors={ errors?.location ? errors.location : null }
                        vName={ 'name' }
                        required={ true }
                        onChange={ (event) => this.handleChange('location', event.target.value) }
                      />
                    </div>
                    <div className='product__info_item'>
                      <p>Հասցե</p>
                      <Input
                        size={ "small" }
                        className={ 'filter__address' }
                        label={ products.address }
                        value={ formData.address ? formData.address : "" }
                        title={ formData.address ? formData.address : '' }
                        errors={ errors?.address ? errors.address : null }
                        onChange={ (event) => this.handleChange('address', event.target.value) }
                      />
                    </div>
                  </div>
                  <hr/>
                  <div className='product__info_block'>
                    <div className='product__info_item'>
                      <p>Հեռախոսահամար</p>
                      <Input className={ "add__product_contact" }
                             label={ errors?.phone ? "Հեռախոսահամարի սխալ" : products.phone }
                             name={ "phone" }
                             type={ "tel" }
                             size={ "small" }
                             errors={ errors?.phone ? errors.phone : null }
                             placeholder={ "+374########" }
                             title={ formData.phone ? formData.phone : null }
                             onChange={ (event) => this.handleChange('phone', event.target.value) }
                      />
                    </div>
                    <div className='product__info_item'>
                      <p>Էլ. փոստ</p>
                      <Input className={ "add__product_contact" }
                             label={ errors?.email ? "Էլ. փոստի սխալ" : products.email }
                             name={ "email" }
                             type={ "email" }
                             size={ "small" }
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
                  </div>
                </div>
                <br/>
                { products.homeFilter ? (
                  <div className='product__info_tbody'>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Շինության տիպը</p>
                        <Selects
                          label={ products.homeFilter.building_type }
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
                          value={ formData.building_type ? formData.building_type : undefined }
                          errors={ errors?.building_type ? errors.building_type : null }
                          vName={ 'name' }
                          keyValue={ 'name' }
                          onChange={ (event) => this.handleChange('building_type', event.target.value) }
                        />
                      </div>
                      <div className='product__info_item'>
                        <p>Սենյակների քանակ</p>
                        <Input className={ "add__product_contact" }
                               label={ errors?.room_numbers ? "Սենյակների քանակի սխալ" : products.homeFilter.room_numbers }
                               name={ "room_numbers" }
                               type={ "number" }
                               size={ "small" }
                               errors={ errors?.room_numbers ? errors.room_numbers : null }
                               placeholder={ "Սենյակների քանակ" }
                               title={ formData.room_numbers ? formData.room_numbers : null }
                               onChange={ (event) => this.handleChange('room_numbers', event.target.value) }
                        />
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Նորակառույց</p>
                        <Selects
                          label={ products.homeFilter.new_built ? 'Այո' : 'Ոչ' }
                          size={ 'small' }
                          data={ [
                            {name: 'Այո', value: true},
                            {name: 'Ոչ', value: false},
                          ] }
                          className={ 'product__types_select' }
                          value={ formData.new_built ? formData.new_built : undefined }
                          errors={ errors?.new_built ? errors.new_built : null }
                          vName={ 'name' }
                          keyValue={ 'value' }
                          onChange={ (event) => this.handleChange('new_built', event.target.value) }
                        />
                      </div>
                      <div className='product__info_item'>
                        <p>Սանհանգույցների քանակ</p>
                        <Input className={ "add__product_contact" }
                               label={ errors?.bathRoom_numbers ? "Սանհանգույցների քանակի սխալ" : products.homeFilter.bathRoom_numbers }
                               name={ "bathRoom_numbers" }
                               type={ "number" }
                               size={ "small" }
                               errors={ errors?.bathRoom_numbers ? errors.bathRoom_numbers : null }
                               placeholder={ "Սանհանգույցների քանակ" }
                               title={ formData.bathRoom_numbers ? formData.bathRoom_numbers : null }
                               onChange={ (event) => this.handleChange('bathRoom_numbers', event.target.value) }
                        />
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Հարկ</p>
                        <Input className={ "add__product_contact" }
                               label={ errors?.floor ? "Հարկի սխալ" : products.homeFilter.floor }
                               name={ "floor" }
                               type={ "number" }
                               size={ "small" }
                               errors={ errors?.floor ? errors.floor : null }
                               placeholder={ "Հարկ" }
                               title={ formData.floor ? formData.floor : null }
                               onChange={ (event) => this.handleChange('floor', event.target.value) }
                        />
                      </div>
                      <div className='product__info_item'>
                        <p>Ընդհանուր մակերեսը</p>
                        <Input className={ "add__product_contact" }
                               label={ errors?.area ? "Ընդհանուր մակերեսըի սխալ" : products.homeFilter.area }
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
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Վերանորոգումը</p>
                        <Selects
                          label={ products.homeFilter.renovation }
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
                          value={ formData.renovation ? formData.renovation : undefined }
                          errors={ errors?.renovation ? errors.renovation : null }
                          vName={ 'name' }
                          className={ 'product__types_select' }
                          keyValue={ 'name' }
                          onChange={ (event) => this.handleChange('renovation', event.target.value) }
                        />
                      </div>
                      <div className='product__info_item'>
                        <p>Վճարման կարգը</p>
                        <Selects
                          label={ products.homeFilter.payment }
                          size={ 'small' }
                          data={ [
                            {name: 'Կանխիկ'},
                            {name: 'Հիփոթեքով'},
                            {name: 'Մասնակի'},
                          ] }
                          className={ 'product__types_select' }
                          value={ formData.payment ? formData.payment : undefined }
                          errors={ errors?.payment ? errors.payment : null }
                          vName={ 'name' }
                          keyValue={ 'name' }
                          onChange={ (event) => this.handleChange('payment', event.target.value) }
                        />
                      </div>
                    </div>
                  </div>
                ) : products.carFilter ? (
                  <div className='product__info_tbody'>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Մակնիշ</p>
                        <Selects
                          className={ 'product__types_select' }
                          size={ "small" }
                          label={ products.carFilter.brand }
                          data={ carModels?.makes ? carModels.makes : null }
                          errors={ errors?.brand ? errors.brand : null }
                          value={ formData.brand }
                          title={ formData.brand }
                          vName={ 'Make' }
                          keyValue={ 'Make' }
                          onChange={ (event) => this.handleChange('brand', event.target.value) }
                        />
                      </div>
                      <div className='product__info_item'>
                        <p>Շարժիչի ծավալը</p>
                        <Input
                          size={ "small" }
                          type={ "number" }
                          className={ "add__product_contact" }
                          label={ errors?.motorVolume ? 'Շարժիչի ծավալի սխալ' : products.carFilter.motorVolume }
                          errors={ errors?.motorVolume ? errors.motorVolume : null }
                          value={ formData.motorVolume ? formData.motorVolume : "" }
                          title={ formData.motorVolume ? formData.motorVolume : '' }
                          onChange={ (event) => this.handleChange('motorVolume', event.target.value) }
                        />
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Մոդել</p>
                        <Selects
                          className={ 'product__types_select' }
                          size={ "small" }
                          label={ products.carFilter.model }
                          data={ carModels?.model ? carModels.model : null }
                          errors={ errors?.model ? errors.model : null }
                          value={ formData.model }
                          title={ formData.model }
                          vName={ 'Model' }
                          keyValue={ 'Model' }
                          onChange={ (event) => this.handleChange('model', event.target.value) }
                        />
                      </div>
                      <div className='product__info_item'>
                        <p>Փոխանցման տուփը</p>
                        <Input
                          size={ "small" }
                          className={ "add__product_contact" }
                          label={ errors?.transmission ? 'Փոխանցման տուփի սխալ' : products.carFilter.transmission }
                          errors={ errors?.transmission ? errors.transmission : null }
                          value={ formData.transmission ? formData.transmission : "" }
                          title={ formData.transmission ? formData.transmission : '' }
                          onChange={ (event) => this.handleChange('transmission', event.target.value) }
                        />
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Տարի</p>
                        <Input
                          size={ "small" }
                          type={ "number" }
                          className={ "add__product_contact" }
                          label={ errors?.bYear ? 'Տարվա սխալ' : products.carFilter.bYear }
                          errors={ errors?.bYear ? errors.bYear : null }
                          value={ formData.bYear ? formData.bYear : "" }
                          title={ formData.bYear ? formData.bYear : '' }
                          onChange={ (event) => this.handleChange('bYear', event.target.value) }
                        />
                      </div>
                      <div className='product__info_item'>
                        <p>Քարշակ</p>
                        <Input
                          size={ "small" }
                          className={ "add__product_contact" }
                          label={ errors?.traction ? 'Քարշակի սխալ' : products.carFilter.traction }
                          errors={ errors?.traction ? errors.traction : null }
                          value={ formData.traction ? formData.traction : "" }
                          title={ formData.traction ? formData.traction : '' }
                          onChange={ (event) => this.handleChange('traction', event.target.value) }
                        />
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Թափքի տարատեսակ</p>
                        <Selects
                          className={ 'product__types_select' }
                          size={ "small" }
                          label={ products.carFilter.bodyType }
                          data={ carModels?.category ? carModels.category : null }
                          errors={ errors?.bodyType ? errors.bodyType : null }
                          value={ formData.bodyType }
                          title={ formData.bodyType }
                          vName={ 'Category' }
                          keyValue={ 'Category' }
                          onChange={ (event) => this.handleChange('bodyType', event.target.value) }
                        />
                      </div>
                      <div className='product__info_item'>
                        <p>Գույն</p>
                        <Input
                          size={ "small" }
                          className={ "add__product_contact" }
                          label={ errors?.color ? 'Գույնի սխալ' : products.carFilter.color }
                          errors={ errors?.color ? errors.color : null }
                          value={ formData.color ? formData.color : "" }
                          title={ formData.color ? formData.color : '' }
                          onChange={ (event) => this.handleChange('color', event.target.value) }
                        />
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Վազքը</p>
                        <Input
                          size={ "small" }
                          type={ "number" }
                          className={ "add__product_contact" }
                          label={ errors?.run ? 'Վազքի սխալ' : products.carFilter.run }
                          errors={ errors?.run ? errors.run : null }
                          value={ formData.run ? formData.run : "" }
                          title={ formData.run ? formData.run : '' }
                          onChange={ (event) => this.handleChange('run', event.target.value) }
                        />
                      </div>
                      <div className='product__info_item'>
                        <p>Ղեկ</p>
                        <Input
                          size={ "small" }
                          className={ "add__product_contact" }
                          label={ errors?.wheel ? 'Ղեկի սխալ' : products.carFilter.wheel }
                          errors={ errors?.wheel ? errors.wheel : null }
                          value={ formData.wheel ? formData.wheel : "" }
                          title={ formData.wheel ? formData.wheel : '' }
                          onChange={ (event) => this.handleChange('wheel', event.target.value) }
                        />
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Ձիաուժ</p>
                        <Input
                          size={ "small" }
                          type={ "number" }
                          className={ "add__product_contact" }
                          label={ errors?.horsepower ? 'Ձիաուժի սխալ' : products.carFilter.horsepower }
                          errors={ errors?.horsepower ? errors.horsepower : null }
                          value={ formData.horsepower ? formData.horsepower : "" }
                          title={ formData.horsepower ? formData.horsepower : '' }
                          onChange={ (event) => this.handleChange('horsepower', event.target.value) }
                        />
                      </div>
                      <div className='product__info_item'>
                        <p>Շարժիչ</p>
                        <Input
                          size={ "small" }
                          className={ "add__product_contact" }
                          label={ errors?.motor ? 'Շարժիչի սխալ' : products.carFilter.motor }
                          errors={ errors?.motor ? errors.motor : null }
                          value={ formData.motor ? formData.motor : "" }
                          title={ formData.motor ? formData.motor : '' }
                          onChange={ (event) => this.handleChange('motor', event.target.value) }
                        />
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Մաքսազերծված է</p>
                        <Selects
                          className={ 'product__types_select' }
                          size={ "small" }
                          label={ products.carFilter.customsCleared ? 'Այո' : 'Ոչ' }
                          errors={ errors?.customsCleared ? errors.customsCleared : null }
                          data={ [{value: 1, customsCleared: 'Այո'}, {value: 0, customsCleared: 'Ոչ'}] }
                          value={ formData.customsCleared }
                          title={ formData.customsCleared }
                          vName={ 'customsCleared' }
                          keyValue={ 'value' }
                          onChange={ (event) => this.handleChange('customsCleared', event.target.value) }
                        />
                      </div>
                    </div>
                  </div>
                ) : null }
              </div>
              <br/>
              <Input className={ "add__product_contact" }
                     label={ errors?.description ? "Նկարագրի սխալ" : "Նկարագիր" }
                     name={ "description" }
                     type={ "number" }
                     size={ "small" }
                     multiline
                     rows={ 5 }
                     defaultValue={ products.description }
                     errors={ errors?.description ? errors.description : null }
                     placeholder={ `Մանրամասն նկարագրեք ձեր հայտարարությունը ավելի մեծ հետաքրքրություն առաջացնելու համար:` }
                     title={ formData.description ? formData.description : null }
                     onChange={ (event) => this.handleChange('description', event.target.value) }
              />
              <br/>
              <Save type='button'
                    label={ 'Պահպանել' }
                    onClick={ () => this.handleSubmit() }/>
              <br/>
            </div>
            <button className="close__button" type='button'
                    onClick={ () => {
                      this.zoom.className = "zoom_hidden";
                    } }>
              <FontAwesomeIcon className='faWindowClose' icon={ faWindowClose }/>
            </button>
          </div>
        </div>
        <ResInfo value={ updateProductInfo.result ? updateProductInfo.result[0] === 1 :
          updateProductInfo.result2 ? updateProductInfo.result2[0] === 1 : null ? 'on' : null }
                 successFunc={ this.props.deleteInfos }
                 res={ 'success' } msg={ updateProductInfo?.msg }/>
        <ResInfo value={ updateProductInfo.result3 ? !_.isEmpty(updateProductInfo.result3) : null ? 'on' : null }
                 successFunc={ this.props.deleteInfos }
                 res={ 'success' } msg={ "Նկար(ներ)ը ավելացվել Է(են)" }/>
        <ResInfo value={ updateProductInfo.result && updateProductInfo.result2 && updateProductInfo.result3 ?
          updateProductInfo.result[0] === 0 && updateProductInfo.result2[0] === 0 && _.isEmpty(updateProductInfo.result3) :
          null ? 'on' : null }
                 successFunc={ this.props.deleteInfos }
                 res={ 'warning' }
                 msg={ 'Հայտարարությունը չի թարմացվել' }/>
        <ResInfo value={ !_.isEmpty(upErrors) ? 'on' : null }
                 successFunc={ this.props.deleteInfos }
                 res={ 'error' } msg={ 'Հայտարարության թարմացման սխալ' }/>
        <ResInfo value={ upErrors.image ? 'on' : null }
                 successFunc={ this.props.deleteInfos }
                 res={ 'error' } msg={ upErrors.image }/>
        <ResInfo value={ accessProductInfo.result ? accessProductInfo.result[0] === 1 : null ? 'on' : null }
                 successFunc={ this.props.deleteInfos }
                 res={ 'success' } msg={ 'Հայտարարությունը հաստատված է' }/>
        <ResInfo value={ accessProductInfo.result ? accessProductInfo.result[0] === 0 : null ? 'on' : null }
                 successFunc={ this.props.deleteInfos }
                 res={ 'warning' }
                 msg={ accessProductInfo.access ? 'Հայտարարությունը մերժվել է' : 'Հայտարարությունը չի հաստատվել' }/>
        <ResInfo value={ !_.isEmpty(accessErrors) ? 'on' : null }
                 successFunc={ this.props.deleteInfos }
                 res={ 'error' } msg={ 'Հայտարարության հաստատման սխալ' }/>
        <ResInfo value={ deleteProductInfo.result === 1 ? 'on' : null }
                 successFunc={ this.props.deleteInfos }
                 res={ 'warning' } msg={ 'Հայտարարությունը հաջողությամբ հեռացվել է' }/>
        <ResInfo value={ deleteProductInfo.result === 0 || !_.isEmpty(delErrors) ? 'on' : null }
                 successFunc={ this.props.deleteInfos }
                 res={ 'error' } msg={ 'Հայտարարության հեռացման սխալ' }/>
      </>
    );
  }

}


const mapStateToProps = (state) => ({
  requestStatus: state.products.requestStatus,
  updateProductInfo: state.products.updateProductInfo,
  upErrors: state.products.upErrors,
  accessProductInfo: state.products.accessProductInfo,
  accessErrors: state.products.accessErrors,
  deleteProductInfo: state.products.deleteProductInfo,
  delErrors: state.products.delErrors,
  rateInfo: state.converter.rateInfo,
  locations: state.location.location,
  role: state.users.role,
  carModels: state.filters.carModels,
})

const mapDispatchToProps = {
  getCarModel,
  getLocationRequest,
  updateHome,
  updateCar,
  accessProduct,
  removeProduct,
  deleteInfos,
  removeProductImage,
}

const EditProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProduct)

export default EditProductContainer;
