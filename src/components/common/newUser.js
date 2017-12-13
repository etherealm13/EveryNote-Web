import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Loader from './loading';
import { verifyEmail } from '../../actions/index';

class NewUser extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount(){
        document.title = "Welcome - EveryNote";
        this.context.router.push('/login');
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
            // if(!this.props.unauthorized){
            //     return (
            //         <div className="container">
            //             <h3>Unauthorized Access!!</h3>
            //             <Link to="/" className="post-link btn btn-success">Go to Login
            //             </Link>
            //         </div>
            //     );
            // }
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
    loading: state.auth.loading
  };
}

export default connect(mapStateToProps,
  { verifyEmail }
)(NewUser);
