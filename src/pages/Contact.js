import React, {Component} from 'react';
import Wrapper from "../components/Wrapper";
import {connect} from "react-redux";
import {sendMessage} from "../store/actions/contact";
import _ from "lodash"
import Modal from 'react-modal';
import {CheckCircleOutline} from '@material-ui/icons';
import Input from "../components/form/Input";
import "../assets/CSS/pages/contact.css";
import Send from "../components/form/SendButton";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            errors: {},
            modalIsOpen: false,
            status: ""
        }
    }

    handleChange = (path, ev) => {
        const {formData} = this.state;
        _.set(formData, path, ev);
        this.setState({
            formData,
        })
    }

    handleSubmit = async (ev) => {
        ev.preventDefault();
        const {formData} = this.state;
        const {payload: {data}} = await this.props.sendMessage(formData);
        if (data.status === "Ձեր նամակը հաջողությամբ ուղարկված է") {
            this.openModal();
            this.setState({status: data.status})
        } else {
            this.setState({
                errors: data.errors || {}
            })
        }

    }
    openModal = () => this.setState({modalIsOpen: true})
    closeModal = () => this.setState({modalIsOpen: false})

    render() {
        const {formData, errors, modalIsOpen, status} = this.state;
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
            }
        };
        return (
            <Wrapper>
                <div className="contact__container" style={{background: `url('./images/banner/bg.png')`}}>
                    <div className="container">
                        <div className="contact__content">
                            <form className='contact__form' noValidate autoComplete="on"
                                  onSubmit={this.handleSubmit}>
                                <h3>Կապ մեզ հետ</h3>
                                <br/>
                                <Input className={"contact__input"}
                                       label={errors.name ? "Անունի սխալ" : "Անուն"}
                                       name={"name"}
                                       type={"text"}
                                       required={true}
                                       errors={errors.name ? errors.name : null}
                                       placeholder={"Անուն"}
                                       title={formData.name ? formData.name : null}
                                       onChange={(event) => this.handleChange('name', event.target.value)}
                                />
                                <Input className={"contact__input"}
                                       label={errors.email ? "Էլ․ փոստի սխալ" : "Էլ․ փոստ"}
                                       name={"email"}
                                       type={"email"}
                                       required={true}
                                       errors={errors.email ? errors.email : null}
                                       placeholder={"Էլ․ փոստ"}
                                       title={formData.email ? formData.email : null}
                                       onChange={(event) => this.handleChange('email', event.target.value)}
                                />
                                <Input className={"contact__input"}
                                       label={errors.themes ? "Թեմայի սխալ" : "Թեման"}
                                       name={"themes"}
                                       type={"text"}
                                       errors={errors.themes ? errors.themes : null}
                                       placeholder={"Թեման"}
                                       title={formData.themes ? formData.themes : null}
                                       onChange={(event) => this.handleChange('themes', event.target.value)}
                                />
                                <Input className={"contact__input"}
                                       label={errors.message ? "Հաղորդագրության սխալ" : "Հաղորդագրություն"}
                                       name={"message"}
                                       multiline
                                       rows={3}
                                       required={true}
                                       errors={errors.message ? errors.message : null}
                                       placeholder={"Հաղորդագրություն"}
                                       title={formData.message ? formData.message : null}
                                       onChange={(event) => this.handleChange('message', event.target.value)}
                                />
                                <Send className='registerBut' type="submit"/>
                            </form>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                            >
                                <div className='successMessage'>
                                    <CheckCircleOutline style={{
                                        fontSize: 100,
                                        color: 'green',
                                        margin: "0 auto",
                                        display: 'flex',
                                    }}/>
                                    <span className='successText'>{status}</span>
                                    <Button variant="contained" color="secondary"
                                            startIcon={<CloseIcon/>}
                                            className='close' onClick={this.closeModal}>
                                        Փակել
                                    </Button>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    errors: state.contact.errors,
});

const mapDispatchToProps = {
    sendMessage,
};

const ContactContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Contact);

export default ContactContainer;
