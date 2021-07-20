import React, { Component } from 'react';
import "../../assets/CSS/components/loginButton.css"
import Emitter from "../../helpers/Emitter";
import { deleteToken, getUserRequest, postLoginRequest } from "../../store/actions/users";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretLeft,
  faCog,
  faPlusCircle,
  faSignInAlt,
  faSignOutAlt,
  faSortDown,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import Input from "../form/Input";
import { AccountCircle } from "@material-ui/icons";
import { InputAdornment } from "@material-ui/core";
import InputPassword from "../form/InputPassword";
import _ from "lodash";
import Avatars from "../utils/Avatar";

class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      formData: {},
      arrowIcon: faSortDown,
      remember: false,
    }
  }

  componentDidMount() {
    const {token} = this.props;
    if (token){
      this.props.getUserRequest();
    }
    Emitter.on('toggle-login', this.handleOpen);
  }

  componentWillUnmount() {
    Emitter.remove('toggle-login', this.handleOpen);
  }

  handleOpen = () => {
    const {status} = this.state;
    this.setState({status: !status});
  }
  handleUserOpen = () => {
    const {status, arrowIcon} = this.state;
    this.setState({status: !status});
    if (arrowIcon !== faSortDown){
      this.setState({arrowIcon: faSortDown})
    } else{
      this.setState({arrowIcon: faCaretLeft})
    }
  }

  handleChange = (event) => {
    const {formData} = this.state;
    _.set(formData, event.target.name, event.target.value);
    this.setState({
      formData,
    })
  }

  handleSubmit = async (ev) => {
    ev.preventDefault();
    const {formData} = this.state;
    await this.props.postLoginRequest(formData);
    const {token} = this.props;
    if (token){
      this.setState({status: false});
      this.props.getUserRequest();
    }
    this.setState({formData: {}});
  }

  handleRemember = () => {
    const {formData, remember} = this.state;
    _.set(formData, 'remember', !remember);
    this.setState({formData});
  }

  render() {
    let {status, arrowIcon, formData, remember} = this.state;
    let className;
    if (status === true){
      className = 'open'
    } else{
      className = 'close'
    }
    const {token, myAccount, role, errors} = this.props;
    const avatar = "/images/icons/loginIcon.png";
    if (token){
      return (
        <div>
          <div style={ {position: "absolute", transform: 'translate(-50%, -50%)'} } className="user__button_container">
            <button onClick={ this.handleUserOpen } type="button" className="dropdown-toggle auth__nav-btn">
              <svg className="auth__icon-user user_login">
                <use xlinkHref="#icon-user">
                  <svg viewBox="-7 377 16 16" id="icon-user">
                    <path
                      d="M-7 393v-.9s0-.7.1-1.4c.2-1.1.5-1.9.9-2.4.5-.5 1.4-.8 2.2-1 .4-.1.8-.2 1.1-.3.3-.1.4-.2.5-.3v-.1c.1-.3 0-.6-.5-1.3-.2-.3-.5-.7-.7-1.2-.6-1.4-.7-2.9-.3-4.3.3-.9.9-1.6 1.7-2.1 1-.4 1.9-.7 3-.7s2 .2 2.8.7c.8.5 1.4 1.2 1.7 2.1.4 1.4.3 2.9-.3 4.3-.2.5-.4.8-.7 1.2-.4.7-.6 1-.5 1.3v.1c.1.1.2.2.5.3.3.1.7.2 1.1.3.8.2 1.7.5 2.2 1 .5.5.8 1.2.9 2.4.1.8.1 1.4.1 1.4v.9H-7zm2.3-3.5c-.1.1-.3.5-.4 1.4v.2l.3-.1h12v-.2c-.2-1.1-.4-1.3-.4-1.3-.2-.2-.7-.3-1.5-.5-1.1-.3-2.4-.6-2.8-1.7-.5-1.2.1-2.2.6-2.9.2-.3.4-.6.5-.9.4-1.1.5-2.1.2-3.1-.4-1.4-1.9-1.6-2.8-1.6s-2.3.2-2.8 1.6c-.3 1-.2 2 .2 3.1.1.3.3.6.5.9.5.8 1.1 1.7.6 2.9-.4 1-1.7 1.4-2.8 1.7-.7.2-1.2.3-1.4.5z"/>
                  </svg>
                </use>
              </svg>
              <span className="header__span">
                                { myAccount?.firstName }
                            </span>
              <FontAwesomeIcon icon={ arrowIcon } className="user_login_down"/>
            </button>
            <div className={ `${ className } dropdown__menu auth__dropdown--login` }>
              <div className="user__menuHeader_row">
                <Avatars src={ myAccount?.avatar || avatar }
                         alt="avatar"
                         id={ "menu__user_avatar" }
                         onError={ ev => {
                           ev.target.src = avatar
                         } }/>
                <div className="user__info_row">
                  <h3 className="myAccount__name">{ myAccount?.firstName } { myAccount?.lastName }</h3>
                  <p className="myAccount__email"
                     title={ myAccount?.email }>{ _.truncate(myAccount?.email, {
                    'length': 14,
                    'separator': ' '
                  }) }</p>
                </div>
              </div>
              <div className='myAccount__menu_links'>
                { role === 'admin' ?
                  <NavLink to={ `/admin/kars&manex/Arman/7991/${ myAccount?.id }` } className="myAccount__menu_link">
                    <FontAwesomeIcon icon={ faUser }/>&ensp;
                    Իմ էջը
                  </NavLink> :
                  <NavLink to={ `/my_account/${ myAccount?.id }` } className="myAccount__menu_link">
                    <FontAwesomeIcon icon={ faUser }/>&ensp;
                    Իմ էջը
                  </NavLink>
                }
                <NavLink to="/add_announcement" className="myAccount__menu_link">
                  <FontAwesomeIcon icon={ faPlusCircle }/>&ensp;
                  Ավելացնել հայտ․
                </NavLink>
                <NavLink to={ `/my_account/${ myAccount?.id }/settings` } className="myAccount__menu_link">
                  <FontAwesomeIcon icon={ faCog }/>&ensp;
                  Կարգավորումներ
                </NavLink>
              </div>
              <button onClick={ () => this.props.deleteToken() }
                      type="button"
                      className="form__submit">
                <FontAwesomeIcon icon={ faSignOutAlt }/>
                ԵԼՔ
              </button>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div style={ {position: "absolute", transform: 'translate(-50%, -50%)'} } className="login__button_container">
          <div onClick={ this.handleOpen } className="dropdown-toggle auth__nav-btn">
            <FontAwesomeIcon icon={ faSignInAlt } className="auth__icon-login user_login"/>
            <span className="header__span">ՄՈՒՏՔ</span>
          </div>
          <div className={ `${ className } dropdown__menu auth__dropdown--login` }>
            <h5 className="auth__title">Մուտք գործեք ձեր հաշիվ</h5>
            <form className="form form--auth js-login-form">
              <div className="row">
                <div className="form-group">
                  <Input className={ "form-control" }
                         label={ errors.email ? "Էլ. փոստի սխալ" : "Օգտանուն" }
                         name={ "email" }
                         type={ "email" }
                         errors={ errors.email ? errors.email : null }
                         InputProps={ {
                           startAdornment: (
                             <InputAdornment position="start">
                               <AccountCircle/>
                             </InputAdornment>
                           ),
                         } }
                         placeholder={ "Էլ. փոստ" }
                         title={ formData.email ? formData.email : null }
                         onChange={ this.handleChange }
                  />
                </div>
                <div className="form-group">
                  <InputPassword
                    className={ "form-control" }
                    value={ formData.password ? formData.password : '' }
                    errors={ errors.password ? errors.password : null }
                    onChange={ this.handleChange }
                  />
                </div>
              </div>
              <div className="row submit__buttons">
                <button onClick={ this.handleSubmit }
                        type="button"
                        className="form__submit">
                  Մուտք
                </button>
                <NavLink to="/signup" className="form__submit register">
                  Գրանցում
                </NavLink>
              </div>
              <div className='login_footer'>
                                <span className="form__remember">
                                    <input id="remember-in-dropdown" name="rememberme" type="checkbox"
                                           onChange={ this.handleRemember }
                                           className="in-checkbox" value={ remember }
                                           data-parsley-multiple="rememberme"/>
                                    <label htmlFor="remember-in-dropdown" className="in-label">Հիշել ինձ</label>
                                </span>
                <div className="form__options form__options--forgot">
                  <Link to="/reset_password"
                        className="auth__forgot">Մոռացել եք գաղտնաբառը?</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  token: state.users.token,
  requestStatus: state.users.requestStatus,
  myAccount: state.users.myAccount,
  role: state.users.role,
  errors: state.users.errors,
})

const mapDispatchToProps = {
  postLoginRequest,
  getUserRequest,
  deleteToken,
}

const LoginButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginButton)

export default LoginButtonContainer;
