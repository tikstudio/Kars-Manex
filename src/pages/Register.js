import React, { Component } from 'react';
import _ from 'lodash';
import { registerRequest } from "../store/actions/users";
import { connect } from "react-redux";
import FileInput from "../components/form/FileInput";
import Wrapper from "../components/Wrapper";
import "../assets/CSS/pages/register.css";
import { Link, Redirect } from "react-router-dom";
import { InputAdornment } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Input from "../components/form/Input";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      process: '',
      formData: {}
    }
  }

  handleChange = (path, ev) => {
    const { formData } = this.state;
    _.set(formData, path, ev);
    this.setState({
      formData,
    })
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { formData } = this.state;
    this.props.registerRequest(formData, (v) => {
      this.setState({ process: v.loaded / v.total * 100 })
    }, () => {
      console.log()
    });
  }

  render() {
    const { formData, process } = this.state;
    const { token, registerInfo, errors } = this.props;
    if (token) {
      return <Redirect to="/"/>
    }
    if (registerInfo.status === 'registered') {
      return <Redirect to="/signing"/>
    }
    return (
      <Wrapper showFooter={ false }>
        <div className="register__container">
          <img className='register__bg_image' src='/images/banner/bg.png' alt='bg'/>
          <div className="container">
            <div className="register__content">
              <p/>
              <br/>
              <form onSubmit={ this.handleSubmit } className="register__form">
                <Input className={ "register__input" }
                       label={ errors.firstName ? "Անունի սխալ" : "Անուն" }
                       name={ "firstName" }
                       type={ "text" }
                       required={ true }
                       errors={ errors.firstName ? errors.firstName : null }
                       placeholder={ "Անուն" }
                       title={ formData.firstName ? formData.firstName : null }
                       onChange={ (event) => this.handleChange('firstName', event.target.value) }
                />
                <Input className={ "register__input" }
                       label={ errors.lastName ? "Ազգանունի սխալ" : "Ազգանուն" }
                       name={ "lastName" }
                       type={ "text" }
                       required={ true }
                       errors={ errors.lastName ? errors.lastName : null }
                       placeholder={ "Ազգանուն" }
                       title={ formData.lastName ? formData.lastName : null }
                       onChange={ (event) => this.handleChange('lastName', event.target.value) }
                />
                <Input className={ "register__input" }
                       label={ errors.work ? "Գործունեության սխալ" : "Գործունեություն" }
                       name={ "work" }
                       type={ "text" }
                       required={ true }
                       errors={ errors.work ? errors.work : null }
                       placeholder={ "Գործունեություն" }
                       title={ formData.work ? formData.work : null }
                       onChange={ (event) => this.handleChange('work', event.target.value) }
                />
                <Input className={ "register__input" }
                       label={ errors.phone ? "Հեռախոսահամարի սխալ" : "Հեռախոսահամար" }
                       name={ "phone" }
                       type={ "tel" }
                       required={ true }
                       errors={ errors.phone ? errors.phone : null }
                       placeholder={ "+374########" }
                       title={ formData.phone ? formData.phone : null }
                       onChange={ (event) => this.handleChange('phone', event.target.value) }
                />
                <Input className={ "register__input" }
                       label={ errors.email ? "Էլ. փոստի սխալ" : "Օգտանուն" }
                       name={ "email" }
                       type={ "email" }
                       required={ true }
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
                       onChange={ (event) => this.handleChange('email', event.target.value) }
                />
                <Input className={ "register__input" }
                       label={ errors.password ? "Գաղտնաբառի սխալ" : "Գաղտնաբառ" }
                       name={ "password" }
                       type={ "password" }
                       required={ true }
                       errors={ errors.password ? errors.password : null }
                       placeholder={ "Գաղտնաբառ" }
                       title={ formData.password ? formData.password : null }
                       value={ formData.password ? formData.password : '' }
                       onChange={ (event) => this.handleChange('password', event.target.value) }
                />
                <FileInput accept="image/*"
                           onChange={ (ev, files) => this.handleChange('avatar', files[0]) }/>
                <br/>
                { process ? <progress id="file" max="100" value={ process }>{ process }%</progress> : null }
                <div className="register__submit_row">
                  <button className="form__submit">Գրանցում</button>
                  <Link to="/signing" className="form__submit">
                    Մուտք
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.users.token,
  registerInfo: state.users.registerInfo,
  errors: state.users.errors,
});
const mapDispatchToProps = {
  registerRequest
}
const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register)

export default RegisterContainer;
