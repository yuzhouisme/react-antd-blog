import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import App from '../components/App';
import NotFound from '../components/NotFound';
import Post from '../components/Front/Post';
import About from '../components/Front/About';
import Dashboard from '../components/Admin/Dashboard';

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Post} />
      <Route path="about" component={About} />
    </Route>
    <Route path="/dashboard" component={Dashboard} />
    <Route path="*" component={NotFound} />
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
