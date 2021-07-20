import React, { Component } from 'react';
import { connect } from "react-redux";
import { getCarsRequest, getProductRequest } from "../../store/actions/products";
import '../../assets/CSS/components/sort.css';
import { faCalendarAlt, faSearchDollar, faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Sort extends Component {

  componentDidMount() {
    document.addEventListener('click', this.handleClose, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClose, true);
  }

  handleSortASC = (ev, selected) => {
    const x = document.querySelectorAll('.sortNoSelected');
    const {s, formData, request} = this.props;
    for ( let i = 0; i < x.length; i++ ){
      x[i].style.background = "white";
    }
    selected.style.background = "#ba0101";
    this.setState({selected: ev});
    if (request === 'houses'){
      this.props.getProductRequest(s, ev, 'ASC', formData.category_departmentId, formData.c_section,
        formData.location, formData.address, formData.priceMin, formData.priceMax, formData.building_type,
        formData.new_built, formData.floorMin, formData.floorMax, formData.room_numbers, formData.bathRoom_numbers,
        formData.areaMin, formData.areaMax, formData.payment, formData.renovation);
    } else if (request === 'cars'){
      this.props.getCarsRequest(s, ev, 'ASC', formData.category_departmentId, formData.c_section,
        formData.location, formData.address, formData.priceMin, formData.priceMax, formData.brand,
        formData.model, formData.bodyType, formData.bYearMin, formData.bYearMax, formData.runMin,
        formData.runMax, formData.horsepowerMin, formData.horsepowerMax, formData.motor,
        formData.motorVolumeMin, formData.motorVolumeMax, formData.transmission, formData.traction,
        formData.color, formData.wheel, formData.customsCleared);
    }
  }
  handleSortDESC = (ev, selected) => {
    const {s, formData, request} = this.props;
    const y = document.querySelectorAll('.sortNoSelected');
    for ( let j = 0; j < y.length; j++ ){
      y[j].style.background = "white";
    }
    selected.style.background = "#ba0101";
    this.setState({selected: ev});
    if (request === 'houses'){
      this.props.getProductRequest(s, ev, 'DESC', formData.category_departmentId, formData.c_section,
        formData.location, formData.address, formData.priceMin, formData.priceMax, formData.building_type,
        formData.new_built, formData.floorMin, formData.floorMax, formData.room_numbers, formData.bathRoom_numbers,
        formData.areaMin, formData.areaMax, formData.payment, formData.renovation);
    } else if (request === 'cars'){
      this.props.getCarsRequest(s, ev, 'ASC', formData.category_departmentId, formData.c_section,
        formData.location, formData.address, formData.priceMin, formData.priceMax, formData.brand,
        formData.model, formData.bodyType, formData.bYearMin, formData.bYearMax, formData.runMin,
        formData.runMax, formData.horsepowerMin, formData.horsepowerMax, formData.motor,
        formData.motorVolumeMin, formData.motorVolumeMax, formData.transmission, formData.traction,
        formData.color, formData.wheel, formData.customsCleared);
    }
  }
  handleSortOpen = (ev) => {
    const z = document.querySelectorAll('.sortOpen');
    if (ev.className === "sortOpen"){
      ev.className = "sortClose";
    } else{
      for ( let i = 0; i < z.length; i++ ){
        z[i].className = "sortClose";
      }
      ev.className = "sortOpen";
    }
  }
  handleClose = () => {
    const all = document.querySelectorAll('.sortOpen');
    window.onclick = () => {
      for ( let i = 0; i < all.length; i++ ){
        all[i].className = "sortClose";
      }
    }
  }

  render() {
    const all = document.querySelectorAll('.sortOpen');
    window.onclick = () => {
      for ( let i = 0; i < all.length; i++ ){
        all[i].className = "sortClose";
      }
    }
    return (
      <div className='sort_area'>
        <div className="sort_content" onClick={ () => this.handleSortOpen(this.sortPName) }>
          <p className="sort_title mr480">Դասավորությունը</p>
          <FontAwesomeIcon className="sort_title dNone md480" icon={ faSortAlphaUp }/>
          <div ref={ (ref) => this.sortPName = ref } className="sortClose">
            <input type="checkbox" id="pNameDefault"
                   value="id"
                   onChange={ (event) => this.handleSortASC(event.target.value, this.pNameDefault) }/>
            <label htmlFor="pNameDefault"
                   ref={ (ref) => this.pNameDefault = ref }
                   className="sortNoSelected"
            >Ոչ մեկ</label>
            <input type="checkbox" id="pNameAsc"
                   value="p_name"
                   onChange={ (event) => this.handleSortASC(event.target.value, this.pNameAsc) }/>
            <label htmlFor="pNameAsc"
                   ref={ (ref) => this.pNameAsc = ref }
                   className="sortNoSelected"
            >Ա-Ֆ</label>
            <input type="checkbox" id="pNameDesc"
                   value="p_name"
                   onChange={ (event) => this.handleSortDESC(event.target.value, this.pNameDesc) }/>
            <label htmlFor="pNameDesc"
                   ref={ (ref) => this.pNameDesc = ref }
                   className="sortNoSelected"
            >Ֆ-Ա</label>
          </div>
        </div>
        <div className="sort_content" onClick={ () => this.handleSortOpen(this.sortPrice) }>
          <p className="sort_title mr480">Գին</p>
          <FontAwesomeIcon className="sort_title dNone md480" icon={ faSearchDollar }/>
          <div ref={ (ref) => this.sortPrice = ref } className="sortClose">
            <input type="checkbox" id="priceDefault"
                   value="id"
                   onChange={ (event) => this.handleSortASC(event.target.value, this.priceDefault) }/>
            <label htmlFor="priceDefault"
                   ref={ (ref) => this.priceDefault = ref }
                   className="sortNoSelected"
            >Ոչ մեկ</label>
            <input type="checkbox" id="priceAsc"
                   value="price"
                   onChange={ (event) => this.handleSortASC(event.target.value, this.priceAsc) }/>
            <label htmlFor="priceAsc"
                   ref={ (ref) => this.priceAsc = ref }
                   className="sortNoSelected"
            >Էժանից - Թանկ</label>
            <input type="checkbox" id="priceDesc"
                   value="price"
                   onChange={ (event) => this.handleSortDESC(event.target.value, this.priceDesc) }/>
            <label htmlFor="priceDesc"
                   ref={ (ref) => this.priceDesc = ref }
                   className="sortNoSelected"
            >Թանկից - Էժան</label>
          </div>
        </div>
        <div className="sort_content" onClick={ () => this.handleSortOpen(this.sortDate) }>
          <p className="sort_title mr480">Տարեթիվ</p>
          <FontAwesomeIcon className="sort_title dNone md480" icon={ faCalendarAlt }/>
          <div ref={ (ref) => this.sortDate = ref } className="sortClose">
            <input type="checkbox" id="createdAtDefault"
                   value="id"
                   onChange={ (event) => this.handleSortASC(event.target.value, this.createdAtDefault) }/>
            <label htmlFor="createdAtDefault"
                   ref={ (ref) => this.createdAtDefault = ref }
                   className="sortNoSelected"
            >Ոչ մեկ</label>
            <input type="checkbox" id="createdAtAsc"
                   value="createdAt"
                   onChange={ (event) => this.handleSortASC(event.target.value, this.createdAtAsc) }/>
            <label htmlFor="createdAtAsc"
                   ref={ (ref) => this.createdAtAsc = ref }
                   className="sortNoSelected"
            >Ամենահները</label>
            <input type="checkbox" id="createdAtDesc"
                   value="createdAt"
                   onChange={ (event) => this.handleSortDESC(event.target.value, this.createdAtDesc) }/>
            <label htmlFor="createdAtDesc"
                   ref={ (ref) => this.createdAtDesc = ref }
                   className="sortNoSelected"
            >Ամենանորերը</label>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  requestStatus: state.products.requestStatus,
})

const mapDispatchToProps = {
  getProductRequest,
  getCarsRequest,
}

const SortContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sort)

export default SortContainer;
