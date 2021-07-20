import React, { Component } from 'react';
import { changePassword } from "../store/actions/users";
import { connect } from "react-redux";
import SendButton from "../components/form/SendButton";
import Wrapper from "../components/Wrapper";
import InputPassword from "../components/form/InputPassword";
import Modal from "react-modal";
import { CheckCircleOutline } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activationCode: this.props.match.params.key,
      password: '',
      repeatPassword: '',
      repeatError: '',
      modalIsOpen: false,
    }
  }

  handleChange = (ev) => {
    this.setState({repeatError: '', password: ev.target.value})
  }
  handleRepeatPassword = (ev) => {
    this.setState({repeatError: '', repeatPassword: ev.target.value})
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const {activationCode, password, repeatPassword} = this.state;
    if (repeatPassword !== password){
      this.setState({repeatError: 'Կրկնության սխալ'})
    } else{
      this.props.changePassword(activationCode, password).then((status) => {
        if (status.status){
          this.setState({modalIsOpen: true});
        }
      });
    }
  }

  closeModal = () => {
    this.setState({modalIsOpen: false})
    const {changePasswordInfo} = this.props;
    if (changePasswordInfo.status === 'Ok'){
      this.props.history.push('/signing')
    }
  }

  render() {
    const {password, repeatPassword, repeatError, modalIsOpen} = this.state;
    const {errors, changePasswordInfo} = this.props;
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
        <div className="reset__password_container">
          <div className="reset__password_block" style={ {height: '75%'} }>
            <strong>Փոխել գաղտնաբառը</strong>
            { changePasswordInfo?.errors ? <p>{ changePasswordInfo?.errors }</p> : null }
            { repeatError ? <p>{ repeatError }</p> : null }
            { errors ? <p>{ errors }</p> : null }
            <form onSubmit={ this.handleSubmit } className="change__password_form">
              <label className={ "change__password_input" }>
                Նոր գաղտնաբառ
                <InputPassword
                  value={ password ? password : '' }
                  errors={ errors.password ? errors.password : null }
                  onChange={ this.handleChange }
                />
              </label>
              <br/>
              <label className={ "change__password_input" }>
                Կրկնել գաղտնաբառը
                <InputPassword
                  value={ repeatPassword ? repeatPassword : '' }
                  errors={ errors.password ? errors.password : null }
                  onChange={ this.handleRepeatPassword }
                />
              </label>
              <br/>
              <SendButton type={ 'submit' }/>
            </form>
          </div>
        </div>
        <Modal
          isOpen={ modalIsOpen }
          onRequestClose={ this.closeModal }
          style={ customStyles }
        >
          <div className='successMessage'>
            <CheckCircleOutline style={ {
              fontSize: 100,
              color: 'green',
              margin: "0 auto",
              display: 'flex',
            } }/>
            <span
              className='successText'>{ changePasswordInfo.msg ? changePasswordInfo.msg : 'Ձեր գաղտնաբառը փոխվել է' }</span>
            <Button variant="contained" color="secondary"
                    startIcon={ <CloseIcon/> }
                    className='close' onClick={ this.closeModal }>
              Փակել
            </Button>
          </div>
        </Modal>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.users.changePasswordError,
  changePasswordInfo: state.users.changePasswordInfo,
});
const mapDispatchToProps = {
  changePassword,
}
const ChangePasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePassword)

export default ChangePasswordContainer;
