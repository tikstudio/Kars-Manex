import React, { Component } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import LinearLoad from "./loads/LinearLoad";
import { getUserRequest } from "../store/actions/users";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AdminHeader from "./AdminHeader";

class AdminWrapper extends Component {
  static defaultProps = {
    showFooter: false,
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
    const {myAccount, token, role} = this.props;
    if (!token){
      return <Redirect to="/signing"/>;
    }
    if (role !== 'admin' && myAccount.id !== 1){
      return <Redirect to="/user"/>;
    }
    if (role !== 'admin'){
      return (<h1 className="admin no data">Տվյալներ չկան</h1>)
    }
    const {showFooter} = this.props;
    const {loading} = this.state;
    return (
      <>
        <Header/>
        <AdminHeader/>
        { loading ? <LinearLoad className={ "linear_loading" }/> : null }
        { this.props.children }
        { showFooter ? <Footer/> : null }
      </>
    );
  }

}


const mapStateToProps = (state) => ({
  myAccount: state.users.myAccount,
  token: state.users.token,
  role: state.users.role,
})

const mapDispatchToProps = {
  getUserRequest,
}

const AdminWrapperContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminWrapper)

export default AdminWrapperContainer;
