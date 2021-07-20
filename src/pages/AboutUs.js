import React, {Component} from 'react';
import Wrapper from "../components/Wrapper";
import '../assets/CSS/pages/aboutUs.css'
import {NavLink} from "react-router-dom";
import VerticalStepper from "../components/slides/VerticalStepper";

class AboutUs extends Component {
    render() {
        return (
            <Wrapper>
                <div className='container'>
                    <div className='aboutUs' style={{background: `url('./images/banner/map.gif')`}}>
                        <div className='aboutUsText'>
                            <div className='about__header_section'>
                                <NavLink to='/home' className='aboutUs_logo'>
                                    <img src="/images/logos/km.png" alt='KM'/>
                                </NavLink>
                                <h2 className='aboutUs_title'>Ողջույն և բարի գալուստ «Kar's & Manex».</h2>
                            </div>
                            <p>«Kar's &Manex»-ը միջնորդ կազմակերպություն է և հիմնադրվել է 2019 թվականին։
                                Հիմնադրումից ի վեր մենք իրականացնում ենք միջնորդային գործունեություն և հանդես ենք
                                գալիս երեք հիմնական ենթաճյուղերով՝</p>
                            <VerticalStepper/>
                            <p>Կայքում կարող եք ծանոթանալ մեր ծառայությունների շրջանակներին, վաճառքի և վարձակալության
                                համար
                                նախատեսված բազմազան տեսականուն։ Մեր կողմից մատուցվող ծառայությունների շրջանակն անընդհատ
                                համալրվում է և մենք շարունակում ենք կատարելագործվել՝ մեր հաճախորդներին առավելագույնս
                                գոհացնելու համար։</p>
                        </div>
                    </div>
                </div>
            </Wrapper>
        );
    }
}

export default AboutUs;
