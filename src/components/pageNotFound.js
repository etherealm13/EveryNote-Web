import React from 'react';
import { Link } from 'react-router';

const PageNotFound = () => {
  return (
  	<div className="pageNotFound">
  		<h1 className="pageNotFoundTitle">Page not found!</h1>
  		<Link to="/posts" className="homelink">
          <button className="btn btn-secondary">Go back
          </button>
        </Link>
  	</div>
  );
};

export default PageNotFound;
