import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScroll, faUsers, faUserCheck, faUser, faCog } from "@fortawesome/free-solid-svg-icons";

class AdminHeader extends Component {
  render() {
    return (
      <header className='admin__header'>
        <div className='container'>
          <div className='header__row'>
            <menu className='header__menu'>
              <NavLink to="/admin/kars&manex/Arman/7991/1" className="header__menu_link">
                <FontAwesomeIcon icon={ faUser }/>&ensp;
                Իմ էջը
              </NavLink>
              <NavLink className='header__menu_link' to="/admin/kars&manex/Arman/9179/announcements">
                <FontAwesomeIcon icon={ faUserCheck }/>&ensp;
                Թույլտվություն
              </NavLink>
              <NavLink className='header__menu_link' to="/admin/kars&manex/Arman/1997/users">
                <FontAwesomeIcon icon={ faUsers }/>&ensp;
                Օգտատերեր
              </NavLink>
              <NavLink className='header__menu_link' to="/admin/kars&manex/Arman/9719/all-products">
                <FontAwesomeIcon icon={ faScroll }/>&ensp;
                Հայտարարություններ
              </NavLink>
              <NavLink to={ `/my_account/1/settings` } className="header__menu_link">
                <FontAwesomeIcon icon={ faCog }/>&ensp;
                Կարգավորումներ
              </NavLink>
            </menu>
          </div>
        </div>
      </header>
    );
  }
}

export default AdminHeader;
