import React, {Component} from 'react';
import Wrapper from "../components/Wrapper";
import _ from "lodash";
import {Link, Redirect} from "react-router-dom";
import Input from "../components/form/Input";
import {InputAdornment} from "@material-ui/core";
import {AccountCircle} from "@material-ui/icons";
import {postLoginRequest} from "../store/actions/users";
import {connect} from "react-redux";
import "../assets/CSS/pages/login.css";
import InputPassword from "../components/form/InputPassword";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            rememberMe: false,
        }
    }

    handleChange = (path, ev) => {
        const {formData} = this.state;
        _.set(formData, path, ev);
        this.setState({
            formData,
        })
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        const {formData} = this.state;
        this.props.postLoginRequest(formData);
    }

    handleRememberMe = () => {
        const {formData, rememberMe} = this.state;
        _.set(formData, 'remember', !rememberMe);
        this.setState({formData});
    }

    render() {
        const {formData, rememberMe} = this.state;
        const {token, errors} = this.props;
        if (token) {
            return <Redirect to="/"/>
        }
        return (
            <Wrapper showFooter={false}>
                <div className="login__container" style={{background: `url('./images/banner/bg.png')`}}>
                    <div className="container">
                        <div className="login__content">
                            <p/>
                            <br/>
                            <form onSubmit={this.handleSubmit} className="login__form">
                                <Input className={"login__input"}
                                       label={errors.email ? "Էլ. փոստի սխալ" : "Օգտանուն"}
                                       name={"email"}
                                       type={"email"}
                                       errors={errors.email ? errors.email : null}
                                       InputProps={{
                                           startAdornment: (
                                               <InputAdornment position="start">
                                                   <AccountCircle/>
                                               </InputAdornment>
                                           ),
                                       }}
                                       placeholder={"Էլ. փոստ"}
                                       title={formData.email ? formData.email : null}
                                       onChange={(event) => this.handleChange('email', event.target.value)}
                                />
                                <InputPassword className={"login__input"}
                                               value={formData.password ? formData.password : ''}
                                               errors={errors.password ? errors.password : null}
                                               onChange={(event) => this.handleChange('password', event.target.value)}
                                />
                                <div className="remember_block">
                                    <span className="form__remember">
                                        <input id="rememberMe-in-dropdown" name="remember" type="checkbox"
                                           onChange={this.handleRememberMe}
                                           className="in-checkbox" value={rememberMe}
                                           data-parsley-multiple="rememberMe"/>
                                        <label htmlFor="rememberMe-in-dropdown" className="in-label">Հիշել ինձ</label>
                                    </span>
                                </div>
                                <button className="form__submit">Մուտք</button>
                                <br/>
                                <div className="login__rgf_row">
                                    <Link to="/signup" className="form__submit register">
                                        Գրանցում
                                    </Link>
                                    <Link to="/reset_password" className="auth__forgot">
                                        Մոռացել եք գաղտնաբառը?
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
    errors: state.users.errors,
});
const mapDispatchToProps = {
    postLoginRequest,
}
const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login)

export default LoginContainer;
