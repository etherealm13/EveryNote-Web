import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from '../common/loading';
import { verifyPasswordCode } from '../../actions/index';

class VerifyUser extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillUpdate(nextProps){
        const { actionCode, continueUrl } = nextProps.location.state;
        document.title = "User verification - EveryNote";
        this.handleResetPassword(actionCode, continueUrl);
    }

    handleResetPassword(actionCode, continueUrl) {
    // Verify the password reset code is valid.
        if (actionCode !== '') {
            this.props.verifyPasswordCode(actionCode)
            .then(() => {
                this.context.router.push({
                    pathname: '/new-password',
                    state: {
                        actionCode: actionCode
                    } 
                });
            });
        }
    }

    renderView() {
        if (this.props.loading) {
            return (
                <div>
                    <Loader />
                </div>
            );
        }
        else{
            if(!this.props.unauthorized){
                return (
                    <div className="container">
                        <h3>Unauthorized Access!!</h3>
                        <Link to="/" className="post-link btn btn-success gradient-bg">Go to Login
                        </Link>
                    </div>
                );
            }
        }
    }
    render() {
        return (
            <div>
                {this.renderView()}
            </div>
        );
    }
}


function mapStateToProps(state) {
  return {
    unauthorized: state.auth.authenticated, loading: state.auth.loading
  };
}

export default connect(mapStateToProps,
  { verifyPasswordCode }
)(VerifyUser);
