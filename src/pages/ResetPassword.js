import React, { Component } from 'react';
import Wrapper from "../components/Wrapper";
import Input from "../components/form/Input";
import SendButton from "../components/form/SendButton";
import "../assets/CSS/pages/resetPassword.css";
import { InputAdornment } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import { connect } from "react-redux";
import { resetPassword } from "../store/actions/users";
import ResInfo from "../components/utils/ResInfo";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }
  }

  handleChange = (ev) => {
    this.setState({email: ev.target.value})
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const {email} = this.state;
    this.props.resetPassword(email);
  }

  render() {
    const {email} = this.state;
    const {errors, confirmResponse} = this.props;
    return (
      <Wrapper>
        <div className='container'>
          <div className="reset__password_container">
            <div className="reset__password_block">
              <strong>Հաստատեք ձեր էլ. փոստը</strong>
              { confirmResponse?.errors ? <p>{ confirmResponse?.errors }</p> : null }
              <form onSubmit={ this.handleSubmit } className="reset__password_from">
                <Input label={ errors?.email ? "Էլ. փոստի սխալ" : "Email" }
                       name={ "email" }
                       type={ "email" }
                       required={ true }
                       errors={ errors?.email ? errors?.email : null }
                       InputProps={ {
                         startAdornment: (
                           <InputAdornment position="start">
                             <Email/>
                           </InputAdornment>
                         ),
                       } }
                       placeholder={ "Էլ. փոստ" }
                       title={ email ? email : null }
                       onChange={ (event) => this.handleChange(event) }
                />
                <SendButton type={ 'submit' }/>
              </form>
            </div>
          </div>
          { confirmResponse?.status ?
            <ResInfo res={ 'success' }
                     value={ confirmResponse.status ? 'on' : null }
                     msg={ confirmResponse?.status }
                     msg2={ confirmResponse?.status1 }
            />
            : null }
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.users.confirmErrors,
  confirmResponse: state.users.confirmResponse,
});
const mapDispatchToProps = {
  resetPassword,
}
const ResetPasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword)

export default ResetPasswordContainer;
