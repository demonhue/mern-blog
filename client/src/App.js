import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//import axios from 'axios';

import auth from "./services/authService";

import AppNavbar from './components/navbar.js'
import ArticleList from './components/articleList'
import ArticleForm from './components/article_form'
import RegisterForm from './components/register'
import LoginForm from './components/login'
import Logout from './components/logout'
import ShowArticle from './components/show_article'
import EditArticle from './components/edit_article'
import NotFound from "./common/notFound";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "react-toastify/dist/ReactToastify.css";


class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  
  render() { 
    return (
      <Router>
        <div className="App">
          <AppNavbar user={this.state.user} />
          <ToastContainer />
          <main className="container h-100">
            <Switch>
              <Route path="/edit/:id" component={EditArticle} />
              <Route path="/show/:id" component={ShowArticle} />
              <Route path="/add" render={props => <ArticleForm author={this.state.user.name} />} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route exact path="/" component={ArticleList} />
              <Redirect to="/not-found"/>
            </Switch>
          </main>
        </div>
      </Router>
     );
  }
}
 
export default App;