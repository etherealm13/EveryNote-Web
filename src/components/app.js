import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { verifyEmail, logoutUser } from '../actions/index';
import CustomModal from './modal';

class App extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        // Firebase configuration
        
        const config = {
            apiKey: 'AIzaSyAZGghgaxoX5vN_YCjMjVi5IMEfam1as1o',
            authDomain: 'everynote-1e6a4.firebaseapp.com',
            databaseURL: 'https://everynote-1e6a4.firebaseio.com',
            projectId: 'everynote-1e6a4',
            storageBucket: 'everynote-1e6a4.appspot.com',
            messagingSenderId: '631530737487'
        };
        
        firebase.initializeApp(config);
    }

    componentDidMount() {
        // Firebase configuration
        
        let mode = this.getParameterByName("mode");

        // Get the one-time code from the query parameter.
        let actionCode = this.getParameterByName("oobCode");

        // (Optional) Get the API key from the query parameter.
        // let apiKey = this.getParameterByName("apiKey");

        // (Optional) Get the continue URL from the query parameter if available.
        let continueUrl = this.getParameterByName("continueUrl");
        
        // Handle the user management action.
        switch (mode) {
          case 'resetPassword':
            // Display reset password handler and UI.
            this.context.router.push({
                pathname: '/verify-user',
                state: {
                    actionCode: actionCode, 
                    continueUrl: continueUrl
                } 
            });
            break;
          case 'recoverEmail':
            // Display email recovery handler and UI.
            // handleRecoverEmail(auth, actionCode);
            break;
          case 'verifyEmail':
            this.handleVerifyEmail(actionCode);
            break;
          default:
            // Error: invalid mode.
        }
    }

    handleVerifyEmail(code) {
    // Verify the password reset code is valid.
        if (code !== '') {
            this.props.verifyEmail(code);
            // .then(() => {
            //     this.context.router.push('/login');
            //     this.props.logoutUser();
            // });
        }
    }
        


    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


    render() {
        return (
            <div>
            {this.props.children}
            <CustomModal />
            </div>
        );
    }
}


function mapStateToProps(state) {
  if(state.post.postDetail != null){  
    // const { title, description, dateStamp } = state.post.postDetail;
    return { post: state.post.postDetail,  modal: state.modal, editing: state.post.editing, uid: state.post.postId, number: state.post.postNumber };
  }
  return { post: state.post, modalShow: state.modal.modalShow, editing: state.post.editing, uid: state.post.postId };
}

export default connect(mapStateToProps, {verifyEmail, logoutUser})(App);