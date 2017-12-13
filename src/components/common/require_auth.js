import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkAuth } from '../../actions/index';

export default function (ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        // if not authenticated, go to login page
        this.context.router.push('/login');
      }
    }

    render() {
        return <ComposedComponent {...this.props} />;
      }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps, { checkAuth })(Authentication);
}
