import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import MyAccount from "./pages/MyAccount";
import Houses from "./pages/Houses";
import Cars from "./pages/Cars";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import AddProduct from "./pages/AddProduct";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Announcements from "./pages/Announcements";
import AllUsers from "./pages/AllUsers";
import AllProducts from "./pages/AllProducts";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ Home }/>
          <Route path="/home" exact component={ Home }/>
          <Route path="/house" exact component={ Houses }/>
          <Route path="/house/:cd/:cs" exact component={ Houses }/>
          <Route path="/house/:cd/:cs/:page" exact component={ Houses }/>
          <Route path="/cars" exact component={ Cars }/>
          <Route path="/cars/:cd/:cs" exact component={ Cars }/>
          <Route path="/cars/:cd/:cs/:page" exact component={ Cars }/>
          <Route path="/shop" exact component={ Shop }/>
          <Route path="/shop/:cd/:cs" exact component={ Shop }/>
          <Route path="/shop/:cd/:cs/:page" exact component={ Shop }/>
          <Route path="/aboutUs" exact component={ AboutUs }/>
          <Route path="/contact" exact component={ Contact }/>
          <Route path="/user/:userId" exact component={ User }/>
          <Route path="/my_account/:userId" exact component={ MyAccount }/>
          <Route path="/my_account/:userId/settings" exact component={ Settings }/>
          <Route path="/signing" exact component={ Login }/>
          <Route path="/signup" exact component={ Register }/>
          <Route path="/add_announcement" exact component={ AddProduct }/>
          <Route path="/reset_password" exact component={ ResetPassword }/>
          <Route path="/user/confirm/:key" exact component={ ChangePassword }/>
          <Route path="/admin/kars&manex/Arman/7991/:userId" exact component={ Admin }/>
          <Route path="/admin/kars&manex/Arman/9179/announcements" exact component={ Announcements }/>
          <Route path="/admin/kars&manex/Arman/1997/users" exact component={ AllUsers }/>
          <Route path="/admin/kars&manex/Arman/9719/all-products" exact component={ AllProducts }/>

          <Route exact component={ NotFound }/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
