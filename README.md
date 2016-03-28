# React Google Login

> A React Component for Google oAUth Sign-in / Log-in


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
    clientId="1088597931155576"
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
| redirectUri  |  string  |              postmessage             |


Google Scopes List: https://developers.google.com/identity/protocols/googlescopes

## Test Server
```
npm run start

```
## Production Bundle
```
npm run bundle
```
##### Modeled after keppelen's [React Facebook Login](https://github.com/keppelen/react-facebook-login) 

### Follow me on Twitter: [@anthonyjgrove](https://twitter.com/anthonyjgrove)
