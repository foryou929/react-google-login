'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';
import GoogleLogin from '../src/google';
// import GoogleLogin from '../dist/google-login';

const success = (response) => {
  console.log(response);
};

const error = (response) => {
  console.error(response);
};

ReactDOM.render(
  <GoogleLogin
    clientId={'658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'}
    onSuccess={success}
    onFailure={error}
    offline={false}
  >
    <FontAwesome
      name='google'
    />
    <span> Login with Google</span>
  </GoogleLogin>,
  document.getElementById('google-login')
);
