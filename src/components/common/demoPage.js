import React from 'react';
import { Link } from 'react-router';

const DemoPage = () => {
  return (
    <div className="demo-page">
      <div className="jumbotron text-center">
        <h1><img alt="logo" className="logo" src="./assets/icon.png" />EveryNote</h1>
        <h3>Notes and Todos</h3>
        <p className="lead">A realtime note taking app and todo list created using modern framework
         react, redux and firebase. 
         It has features like email/password authentication, forgot password,
          crud operations, todo lists, multi delete, etc. It's available across devices and browsers.</p>
        <p>
            <Link to="/signup"
             className="btn btn-success">Get started
            </Link>
        </p>
      </div>

      <div className="row featurette">
          <div className="col-md-7">
            <h3 className="featurette-heading">Problem Remembering things ? <span className="text-muted">Use Store Notes</span></h3>
            <p className="lead">With our App, you can Store, Edit and Manage Notes.
             The Colorful cards design adds a nostalgic touch to the traditional notepad.</p>
          </div>
          <div className="col-md-5">
            <img className="featurette-image img-responsive center-block" src="./assets/list.png" alt="Generic placeholder" />
          </div>
      </div>

      <hr className="featurette-divider" />

      <div className="row featurette">
          <div className="col-md-7 col-md-push-5">
            <h3 className="featurette-heading">Increase Productivity <span className="text-muted">Using The Todo List</span></h3>
            <p className="lead">Easy to use design and User centric functionalites help you store tasks in an intuitive way.</p>
          </div>
          <div className="hidden-xs col-sm-12 col-md-5 col-md-pull-7 col-lg-5 col-lg-pull-7">
            <img className="featurette-image img-responsive center-block" src="./assets/todo.png" alt="Generic placeholder" />
          </div>
          <div className="col-xs-12 hidden-sm hidden-md hidden-lg">
            <img className="featurette-image img-responsive center-block" src="./assets/mtodo.png" alt="Generic placeholder" />
          </div>
      </div>

      <hr className="featurette-divider" />

      <div className="row featurette">
          <div className="col-md-7">
            <h3 className="featurette-heading">Stay Secure and Connected <span className="text-muted">With Our Progressive Web App</span></h3>
            <p className="lead">Our Progressive Web App uses modern technologies to provide optimal user experience and secure access across devices and browsers.</p>
          </div>
          <div className="col-md-5">
            <img className="featurette-image img-responsive center-block" src="./assets/mobile.png" alt="Generic placeholder" />
          </div>
      </div>
    </div>
  );
};

export default DemoPage;
