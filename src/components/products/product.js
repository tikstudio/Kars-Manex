import React, { Component } from 'react';
import Utils from "../../helpers/Utils";
import { connect } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt, faCommentAlt, faLayerGroup,
  faMapMarkedAlt,
  faMapMarkerAlt,
  faPhoneAlt,
  faStar,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import CircleLoad from "../loads/CircularLoading";
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import _ from "lodash";
import { Link } from "react-router-dom";
import Avatars from "../utils/Avatar";
import Breadcrumb from "../utils/Breadcrumb";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: '',
    };
  }

  handleZoom = (e) => {
    const {product} = this.props;
    const i = product.findIndex(r => r.id === e)
    if (i > -1){
      this.setState({products: product[i]})
      this.zoom.className = "zoom__container";
    }
  }

  render() {
    const {requestStatus, product, rateInfo, style} = this.props;
    const {products} = this.state;

    const images = _.map(products.productPictures, (size) => ({
      src: size.link,
      alt: `Announcements`,
    }));
    const avatar = "/images/icons/loginIcon.png";
    return (
      <>
        { requestStatus === 'request' ? <CircleLoad/> :
          requestStatus === 'fail' ? 'Տվյալների սխալ կամ բացակայություն' :
            product?.map((val, key) => (
              <div className="listing__item" key={ key } style={ style }>
                <div className="properties__item" data-sr-id="2">
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
                        <span className="properties__intro ">
                          <FontAwesomeIcon icon={ faCommentAlt}/>&ensp;
                          { val.description?.slice(0, 50).concat('...') }
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
              <div className="slide-container">
                <Carousel images={ images }/>
              </div>
            </div>
            <div className='info__content'>
              <div className="info__content_title_block">
                <div>
                  <h3 className="info__content_title">{ products.p_name }</h3>
                  { rateInfo ? Utils.zoomFormatPrice(products.price, rateInfo) :
                    <div className='priceLoad zoom__price'>
                      { Utils.zoomFormatPrice(products.price, rateInfo) }
                    </div> }
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
                    <h3 className="product__user_name">
                      { products?.productsUser?.firstName } { products?.productsUser?.lastName }
                    </h3>
                    <p className="product__user_work"
                       title={ products?.productsUser?.work }>
                      { _.truncate(products?.productsUser?.work, {
                        'length': 14,
                        'separator': ' '
                      }) }</p>
                    <p className="product__user_email"
                       title={ products?.productsUser?.phone }>
                      { _.truncate(products?.productsUser?.phone, {
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
                      <p title={ products.productsLocate?.name }>
                        { _.truncate(products.productsLocate?.name, {
                          'length': 14,
                          'separator': ' '
                        }) }</p>
                    </div>
                    <div className='product__info_item'>
                      <p>Հասցե</p>
                      <p title={ products.address }>{ _.truncate(products.address, {
                        'length': 14,
                        'separator': ' '
                      }) }</p>
                    </div>
                  </div>
                  <hr/>
                  <div className='product__info_block'>
                    <div className='product__info_item'>
                      <p>Հեռախոսահամար</p>
                      <p>{ products.phone }</p>
                    </div>
                    <div className='product__info_item'>
                      <p>Էլ. փոստ</p>
                      <p title={ products.email }>
                        { _.truncate(products.email, {
                          'length': 25,
                          'separator': ' '
                        }) }</p>
                    </div>
                  </div>
                </div>
                <br/>
                { products.homeFilter ? (
                  <div className='product__info_tbody'>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Շինության տիպը</p>
                        <p>{ products.homeFilter.building_type }</p>
                      </div>
                      <div className='product__info_item'>
                        <p>Սենյակների քանակ</p>
                        <p title={ products.homeFilter.room_numbers }>
                          { _.truncate(products.homeFilter.room_numbers, {
                            'length': 14,
                            'separator': ' '
                          }) }</p>
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Նորակառույց</p>
                        <p>{ products.homeFilter.new_built ? 'Այո' : 'Ոչ' }</p>
                      </div>
                      <div className='product__info_item'>
                        <p>Սանհանգույցների քանակ</p>
                        <p
                          title={ products.homeFilter.bathRoom_numbers }>
                          { _.truncate(products.homeFilter.bathRoom_numbers, {
                            'length': 14,
                            'separator': ' '
                          }) }</p>
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Հարկ</p>
                        <p title={ products.homeFilter.floor }>
                          { _.truncate(products.homeFilter.floor, {
                            'length': 14,
                            'separator': ' '
                          }) }</p>
                      </div>
                      <div className='product__info_item'>
                        <p>Ընդհանուր մակերեսը</p>
                        <p title={ products.homeFilter.area }>
                          { _.truncate(products.homeFilter.area, {
                            'length': 14,
                            'separator': ' '
                          }) }(մ<sup>2</sup>)</p>
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Վերանորոգումը</p>
                        <p title={ products.homeFilter.renovation }>
                          { _.truncate(products.homeFilter.renovation, {
                            'length': 14,
                            'separator': ' '
                          }) }</p>
                      </div>
                      <div className='product__info_item'>
                        <p>Վճարման կարգը</p>
                        <p title={ products.homeFilter.payment }>
                          { _.truncate(products.homeFilter.payment, {
                            'length': 14,
                            'separator': ' '
                          }) }</p>
                      </div>
                    </div>
                  </div>
                ) : products.carFilter ? (
                  <div className='product__info_tbody'>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Մակնիշ</p>
                        <p title={ products.carFilter.brand }>
                          { _.truncate(products.carFilter.brand, {
                            'length': 14,
                            'separator': ' '
                          }) }</p>
                      </div>
                      <div className='product__info_item'>
                        <p>Շարժիչի ծավալը</p>
                        <p title={ products.carFilter.motorVolume }>
                          { _.truncate(products.carFilter.motorVolume, {
                            'length': 14,
                            'separator': ' '
                          }) }</p>
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Մոդել</p>
                        <p title={ products.carFilter.model }>
                          { _.truncate(products.carFilter.model, {
                            'length': 14,
                            'separator': ' '
                          }) }</p></div>
                      <div className='product__info_item'>
                        <p>Փոխանցման տուփը</p>
                        <p title={ products.carFilter.transmission }>
                          { _.truncate(products.carFilter.transmission, {
                            'length': 14,
                            'separator': ' '
                          }) }</p>
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Տարի</p>
                        <p title={ products.carFilter.bYear }>
                          { _.truncate(products.carFilter.bYear, {
                            'length': 14,
                            'separator': ' '
                          }) }</p>
                      </div>
                      <div className='product__info_item'>
                        <p>Քարշակ</p>
                        <p title={ products.carFilter.traction }>
                          { _.truncate(products.carFilter.traction, {
                            'length': 14,
                            'separator': ' '
                          }) }</p>
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Թափքի տարատեսակ</p>
                        <p title={ products.carFilter.bodyType }>
                          { _.truncate(products.carFilter.bodyType, {
                            'length': 14,
                            'separator': ' '
                          }) }</p>
                      </div>
                      <div className='product__info_item'>
                        <p>Գույն</p>
                        <p title={ products.carFilter.color }>
                          { _.truncate(products.carFilter.color, {
                            'length': 14,
                            'separator': ' '
                          }) }</p>
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Վազքը</p>
                        <p title={ products.carFilter.run }>
                          { _.truncate(products.carFilter.run, {
                            'length': 14,
                            'separator': ' '
                          }) }</p>
                      </div>
                      <div className='product__info_item'>
                        <p>Ղեկ</p>
                        <p title={ products.carFilter.wheel }>
                          { _.truncate(products.carFilter.wheel, {
                            'length': 14,
                            'separator': ' '
                          }) }</p>
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Ձիաուժ</p>
                        <p title={ products.carFilter.horsepower }>
                          { _.truncate(products.carFilter.horsepower, {
                            'length': 14,
                            'separator': ' '
                          }) }
                        </p></div>
                      <div className='product__info_item'>
                        <p>Շարժիչ</p>
                        <p title={ products.carFilter.motor }>
                          { _.truncate(products.carFilter.motor, {
                            'length': 14,
                            'separator': ' '
                          }) }</p>
                      </div>
                    </div>
                    <hr/>
                    <div className='product__info_block'>
                      <div className='product__info_item'>
                        <p>Մաքսազերծված է</p>
                        <p>{ products.carFilter.customsCleared ? 'Այո' : 'Ոչ' }</p>
                      </div>
                    </div>
                  </div>
                ) : null }
              </div>
              <br/>
              <p className="info__content_description">{ products.description }</p><br/>
            </div>
            <button className="close__button" type='button'
                    onClick={ () => {
                      this.zoom.className = "zoom_hidden";
                    } }>
              <FontAwesomeIcon className='faWindowClose' icon={ faWindowClose }/>
            </button>
          </div>
        </div>
      </>
    );
  }

}


const mapStateToProps = (state) => ({
  requestStatus: state.products.requestStatus,
  rateInfo: state.converter.rateInfo,
})

const mapDispatchToProps = {}

const ProductContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Product)

export default ProductContainer;
