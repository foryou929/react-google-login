# React Google Login

> An Component React for Google Login

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
    offline={false}
    callback={responseGoogle} />,
  document.getElementById('googleButton')
);
```

## Parameters

|    params    |   value  |             default value            |
|:------------:|:--------:|:------------------------------------:|
|    clientId  |  string  |               REQUIRED               |
|     scope    |  string  |             profile email            |
|   callback   | function |               REQUIRED               |
|    offline   |  boolean |                 false                |
|   textButton |  string  |             Login with Google        |
|   cssClass   |  string  |                   -                  |
