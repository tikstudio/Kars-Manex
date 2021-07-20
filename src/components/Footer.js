import React, {Component} from 'react';
import {Map, Placemark, YMaps} from "react-yandex-maps";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faInstagram,
    faTelegramPlane,
    faTwitter,
    faViber,
    faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import {faPhone, faMapMarkerAlt, faAt, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {animateScroll, Events, scrollSpy} from 'react-scroll';

class Footer extends Component {
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        Events.scrollEvent.register('begin');
        Events.scrollEvent.register('end');
        scrollSpy.update();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    scrollToTop() {
        animateScroll.scrollToTop({
            duration: 800,
            smooth: 'linear',
        });
    }

    handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 300) {
            this.toTop.style.visibility = 'visible';
            this.toTop.style.opacity = 1;
        } else {
            this.toTop.style.visibility = 'hidden';
            this.toTop.style.opacity = 0;
        }
    }

    render() {
        return (
            <footer style={{background: `url('/images/banner/bg-footer.jpg')`}}>
                <div className='container'>
                    <div className='footer__row'>
                        <div className='footer__content'>
                            <section className='footer__section1'>
                                <h3>ԿԱՊ</h3>
                                <div className='row'>
                                    <span>
                                    <FontAwesomeIcon icon={faPhone}/>&ensp;
                                        Հեռ։&ensp;
                                        <a href="tel:+37494313338">+374 94 313338</a>
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faMapMarkerAlt}/>&ensp;Հասցե։&ensp;
                                        <a href="https://yandex.ru/maps/10259/gyumri/house/YEoYfgNlQEMGQFpqfXt4cnhiZQ==/?from=api-maps&ll=43.845960%2C40.793411&origin=jsapi_2_1_78&z=16.82"
                                           target="_blank" rel="noreferrer">Անկախության Հրապարակ 9ա</a>
                                    </span>
                                    <span>
                                    <FontAwesomeIcon icon={faAt}/>&ensp;
                                        Էլ. փոստ։&ensp;
                                        <a href="mailto:karsmanex@gmail.com" target="_blank" rel="noreferrer">
                                            karsmanex@gmail.com
                                        </a>
                                    </span>
                                </div>
                                <img className='footer__logo' src='/images/logos/home.png' alt='logo'/>
                            </section>
                            <section className='YMaps footer__section2 fms2'>
                                <YMaps>
                                    <Map state={{center: [40.793411, 43.845961], zoom: 14}}
                                         width={'100%'}
                                         height={200}
                                    >
                                        <Placemark geometry={[40.793411, 43.845961]}/>
                                    </Map>
                                </YMaps>
                            </section>
                            <section className="footer__section3 fms3">
                                <h3>ՍՈՑ․ <span style={{color: "#ba0101"}}>ԿԱՅՔԵՐ</span></h3>
                                <div className='row'>
                                    <a target="_blank" href="https://www.facebook.com/karsandmanex/"
                                       className="social__item"
                                       rel="noreferrer">
                                        <FontAwesomeIcon icon={faFacebookF} style={{color: '#2d88ff'}}/>
                                    </a>
                                    <a target="_blank" href="https://twitter.com" className="social__item"
                                       rel="noreferrer">
                                        <FontAwesomeIcon icon={faTelegramPlane} style={{color: '#34abe3'}}/>
                                    </a>
                                    <a target="_blank" href="https://plus.google.com/" className="social__item"
                                       rel="noreferrer">
                                        <FontAwesomeIcon icon={faTwitter} style={{color: '#1da1f2'}}/>
                                    </a>
                                </div>
                                <div className='row row2'>
                                    <a target="_blank" href="tel:+37494313338" className="social__item"
                                       rel="noreferrer">
                                        <FontAwesomeIcon icon={faWhatsapp} style={{color: '#00e676'}}/>
                                    </a>
                                    <a target="_blank" href="tel:+37494313338" className="social__item"
                                       rel="noreferrer">
                                        <FontAwesomeIcon icon={faViber} style={{color: '#583ebc'}}/>
                                    </a>
                                </div>
                                <a target="_blank"
                                   href="https://www.instagram.com/karsmanex/?igshid=hpwcft4djsoe&fbclid=IwAR1i8CVKvl2sc64JuXdP8cEMMIyCngpGmlzwIMO9leFSzrfFM7wvNEiOVPk"
                                   className="social__item"
                                   rel="noreferrer">
                                    <FontAwesomeIcon icon={faInstagram} style={{color: '#ee4c4c'}}/>
                                </a>
                            </section>
                            <div className='footer__media_section dNone md769 md480 md320'>
                                <section className='YMaps footer__section2'>
                                    <YMaps>
                                        <Map state={{center: [40.793411, 43.845961], zoom: 14}}
                                             width={'100%'}
                                             height={100}
                                        >
                                            <Placemark geometry={[40.793411, 43.845961]}/>
                                        </Map>
                                    </YMaps>
                                </section>
                                <section className="footer__section3">
                                    <h3>ՍՈՑ․ <span style={{color: "#ba0101"}}>ԿԱՅՔԵՐ</span></h3>
                                    <div className='row'>
                                        <a target="_blank" href="https://www.facebook.com/karsandmanex/"
                                           className="social__item"
                                           rel="noreferrer">
                                            <FontAwesomeIcon icon={faFacebookF} style={{color: '#2d88ff'}}/>
                                        </a>
                                        <a target="_blank" href="https://twitter.com" className="social__item"
                                           rel="noreferrer">
                                            <FontAwesomeIcon icon={faTelegramPlane} style={{color: '#34abe3'}}/>
                                        </a>
                                        <a target="_blank" href="https://plus.google.com/" className="social__item"
                                           rel="noreferrer">
                                            <FontAwesomeIcon icon={faTwitter} style={{color: '#1da1f2'}}/>
                                        </a>
                                    </div>
                                    <div className='row row2'>
                                        <a target="_blank" href="tel:+37494313338" className="social__item"
                                           rel="noreferrer">
                                            <FontAwesomeIcon icon={faWhatsapp} style={{color: '#00e676'}}/>
                                        </a>
                                        <a target="_blank" href="tel:+37494313338" className="social__item"
                                           rel="noreferrer">
                                            <FontAwesomeIcon icon={faViber} style={{color: '#583ebc'}}/>
                                        </a>
                                    </div>
                                    <a target="_blank"
                                       href="https://www.instagram.com/karsmanex/?igshid=hpwcft4djsoe&fbclid=IwAR1i8CVKvl2sc64JuXdP8cEMMIyCngpGmlzwIMO9leFSzrfFM7wvNEiOVPk"
                                       className="social__item"
                                       rel="noreferrer">
                                        <FontAwesomeIcon icon={faInstagram} style={{color: '#ee4c4c'}}/>
                                    </a>
                                </section>
                            </div>
                        </div>
                        <div className='footer__copyright'>
                            &copy; 2021-{new Date().getFullYear()} Kars&Manex.<p>&ensp;Բոլոր իրավունքները պաշտպանված են</p>.
                        </div>
                    </div>
                </div>
                <div className="toTop" onClick={this.scrollToTop}
                     ref={(ref) => this.toTop = ref}>
                    <FontAwesomeIcon icon={faArrowUp}/>
                </div>
            </footer>
        );
    }
}

export default Footer;
