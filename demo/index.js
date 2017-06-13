import React from 'react';
import ReactDOM from 'react-dom';
// import FontAwesome from 'react-fontawesome';
import GoogleLogin from '../src/index';
// import GoogleLogin from '../dist/google-login';

const success = (response) => {
  console.log(response);
};

const error = (response) => {
  console.error(response);
};

const loading = () => {
  console.log('loading');
};

ReactDOM.render(
  <div>
    <GoogleLogin
        clientId='658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
        scope='https://www.googleapis.com/auth/analytics'
        onSuccess={success}
        onFailure={error}
        onRequest={loading}
        offline={false}
        approvalPrompt="force"
        responseType="id_token"
        isSignedIn={true}
        // disabled
        // prompt="consent"
        // className='button'
        // style={{ color: 'red' }}
    >
      <span>Analytics</span>
    </GoogleLogin>

    <GoogleLogin
        clientId='658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
        scope='https://www.googleapis.com/auth/adwords'
        onSuccess={success}
        onFailure={error}
        onRequest={loading}
        offline={true}
        approvalPrompt="force"
        // uxMode="redirect"
        // redirectUri="http://google.com"
        // disabled
        // prompt="consent"
        // className='button'
        // style={{ color: 'red' }}
    >
      <span>Adwords</span>
    </GoogleLogin>
  </div>,
  document.getElementById('google-login')
);