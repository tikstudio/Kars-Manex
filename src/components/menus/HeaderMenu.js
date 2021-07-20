import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import "../../assets/CSS/components/headerMenu.css";
import _ from "lodash";

class HeaderMenu extends Component {
    render() {
        const {data, status} = this.props;
        return (
            <menu className='header__menu'>
                {status === 'request' ? 'Բեռնում․․․' :
                  status === 'success' ? _.map(data.menu, (val, key) => (
                        <NavLink
                            className='header__menu_link'
                            key={key} to={`/${val.link}`}
                            id={val.link}
                        >{val.name}</NavLink>
                    )) : 'Խնդրում ենք թարմացնել էջը'}
            </menu>
        );
    }
}

export default HeaderMenu;
