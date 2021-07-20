import React, {Component} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import LinearLoad from "./loads/LinearLoad";

class Wrapper extends Component {
    static defaultProps = {
        showFooter: true,
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        this.loadTime = setTimeout(() => {
            this.setState({loading: false});
        }, 1500);
    }

    componentWillUnmount() {
        clearTimeout(this.loadTime);
    }

    render() {
        const {showFooter} = this.props;
        const {loading} = this.state;
        return (
            <>
                <Header/>
                {loading ? <LinearLoad className={"linear_loading"}/> : null}
                {this.props.children}
                {showFooter ? <Footer/> : null}
            </>
        );
    }

}

export default Wrapper;
