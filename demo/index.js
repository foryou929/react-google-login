'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from '../src/google';
import FontAwesome from 'react-fontawesome';

const responseGoogle = (response) => {
  console.log(response);
};

ReactDOM.render(
  <GoogleLogin
        clientId={'658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'}
        callback={responseGoogle}
        offline={false}
    >
      <FontAwesome
        name='google'
      />
      <span> Login with Google</span>

    </GoogleLogin>,
  document.getElementById('google-login')
);