# React Google Login

> A Google oAUth Sign-in / Log-in Component for React 


## Install
```
npm install react-google-login

```
## How to use
```js
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
  console.log(response);
}

ReactDOM.render(
  <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    buttonText="Login"
    callback={responseGoogle} />,
  document.getElementById('googleButton')
);
```
## Callback

If offline is false callback will return the GoogleAuth object.

If offline is true callback will return the offline token for use on your server. 

## Parameters

|    params    |   value  |             default value            |
|:------------:|:--------:|:------------------------------------:|
|    clientId  |  string  |               REQUIRED               |
|     scope    |  string  |             profile email            |
|   callback   | function |               REQUIRED               |
|    offline   |  boolean |                 false                |
|   buttonText |  string  |             Login with Google        |
|   cssClass   |  string  |                   -                  |
|   loginHint  |  string  |                   -                  |
| redirectUri  |  string  |              postmessage             |


Google Scopes List: https://developers.google.com/identity/protocols/googlescopes

You can now also pass child components such as icons into the button component.
```js
  <GoogleLogin
        clientId={'658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'}
        callback={responseGoogle}
        offline={false}
  >
    <FontAwesome
      name='google'
    />
    <span> Login with Google</span>
  </GoogleLogin>

```


## Dev Server
```
npm run start

```
## Run Tests
```
npm run test:watch

```

## Production Bundle
```
npm run bundle
```

##### Checkout keppelen's [React Facebook Login](https://github.com/keppelen/react-facebook-login) 

### Follow me on Twitter: [@anthonyjgrove](https://twitter.com/anthonyjgrove)
