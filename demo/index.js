import React from 'react'
import ReactDOM from 'react-dom'
// import FontAwesome from 'react-fontawesome';
import { GoogleLogin, GoogleLogout } from '../src/index';

// import GoogleLogin from '../dist/google-login';

const success = response => {
  console.log(response)
}

const error = response => {
  console.error(response)
}

const loading = () => {
  console.log('loading')
}

const logout = () => {
  console.log('logout');
};


ReactDOM.render(
  <div>
    <GoogleLogin
      clientId='978118182047-asotl763greu49j754bbiap2js2oc4ki.apps.googleusercontent.com'
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
      clientId='978118182047-asotl763greu49j754bbiap2js2oc4ki.apps.googleusercontent.com'
      scope='https://www.googleapis.com/auth/adwords'
      onSuccess={success}
      onFailure={error}
      onRequest={loading}
      approvalPrompt="force"
      responseType="code"
    // uxMode="redirect"
    // redirectUri="http://google.com"
    // disabled
    // prompt="consent"
    // className='button'
    // style={{ color: 'red' }}
    >
      <span>Adwords</span>
    </GoogleLogin>

    <GoogleLogout
      buttonText="Logout"
      onLogoutSuccess={logout}
    >
    </GoogleLogout>
  </div>,
  document.getElementById('google-login')
)
