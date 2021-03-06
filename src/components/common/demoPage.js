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
            <h3 className="featurette-heading">Problem Remembering things ? <span className="text-muted">Store Notes</span></h3>
            <p className="lead">With our App, you can Store, Edit and Manage Notes.
             The Colorful cards design adds a nostalgic touch to the traditional notepad.</p>
          </div>
          <div className="col-md-5">
            <img className="featurette-image img-responsive center-block" src="./assets/list1.jpg" alt="Generic placeholder" />
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
            <img className="featurette-image img-responsive center-block mtodo" src="./assets/mobile.png" alt="Generic placeholder" />
          </div>
      </div>

      <div className="page-footer">
      <div className="social-media-links">
        <a target="_blank" href="https://stackoverflow.com/users/6763126/etherealm" title="stackoverflow" rel="nofollow noopener noreferrer me">
          <img className="so-icon" alt="stackoverflow" src="assets/so-logo-bw.png" />
        </a>
      
        <a target="_blank" href="https://www.linkedin.com/in/alankaranand/" title="linkedin" rel="nofollow noopener noreferrer me">
          <img className="ln-icon" alt="linkedin" src="assets/ln-logo-bw.png" />
        </a>
        
        <a target="_blank" href="https://github.com/etherealm13" title="github" rel="nofollow noopener noreferrer me">
          <img className="gt-icon" alt="github" src="assets/gt-logo-bw.png" />
        </a>
        
        <a className="hidden-sm hidden-md hidden-lg" href="whatsapp://send?text=Hey%20checkout%20this%20cool%20web%20app%20for%20storing%20notes%20and%20todo%20lists%20-%20https%3A%2F%2Feverynote-1e6a4.firebaseapp.com%2F%23%2Fdemo" rel="nofollow noopener noreferrer me">
          <img className="fb-icon" alt="whatsapp" src="assets/whatsapp-logo-bw.png" />
        </a>
        <a target="_blank" className="hidden-xs" href="https://web.whatsapp.com/send?text=Hey checkout this cool web app for storing notes - https://everynote-1e6a4.firebaseapp.com/#/demo" rel="nofollow noopener noreferrer me">
          <img className="fb-icon" alt="whatsapp web" src="assets/whatsapp-logo-bw.png" />
        </a>
      </div>
      <div className="copyright-text">Created with <i className="heart-symbol">&hearts;</i> by Alankar Anand
      </div>
    </div>

    </div>
  );
};

export default DemoPage;
