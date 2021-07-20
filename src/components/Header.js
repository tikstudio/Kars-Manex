import React, { Component } from 'react';
import HeaderMenu from "./menus/HeaderMenu";
import Converter from "./converter/converter";
import LoginButton from "./login/LoginButton";
import { NavLink } from "react-router-dom";
import { getHeaderMenuRequest } from "../store/actions/menus";
import { connect } from "react-redux";
import MenuButton from "./menus/MenuButton";

class Header extends Component {
  componentDidMount() {
    this.props.getHeaderMenuRequest();
  }

  render() {
    const {headerMenuInfo, requestStatus} = this.props;

    return (
      <header className='header header--dark'>
        <div className='container'>
          <div className='header__row'>
            <NavLink to='/' className="header__logo">
              <img src="/images/logos/km.png" alt='KM'/>
            </NavLink>
            <Converter/>
            <h3 className='dNone md769 md480 mr320'>Kars&Manex</h3>
            <HeaderMenu data={ headerMenuInfo } status={ requestStatus }/>
            <div className="navLink__buttons_block">
              <LoginButton/>
              <MenuButton data={ headerMenuInfo } status={ requestStatus }/>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  headerMenuInfo: state.menus.headerMenuInfo,
  requestStatus: state.menus.requestStatus,
})

const mapDispatchToProps = {
  getHeaderMenuRequest,
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header)

export default HeaderContainer;
