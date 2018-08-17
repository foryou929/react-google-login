import React, { Component } from 'react'
import PropTypes from 'prop-types'

import GoogleIcon from './GoogleIcon'
import ButtonContent from './ButtonContent'

class GoogleLogin extends Component {
  constructor(props) {
    super(props)
    this.signIn = this.signIn.bind(this)
    this.enableButton = this.enableButton.bind(this)
    this.state = {
      disabled: true,
      hovered: false,
      active: false
    }
  }
  componentDidMount() {
    const {
      clientId,
      cookiePolicy,
      loginHint,
      hostedDomain,
      autoLoad,
      isSignedIn,
      fetchBasicProfile,
      redirectUri,
      discoveryDocs,
      onFailure,
      uxMode,
      scope,
      accessType,
      responseType,
      jsSrc
    } = this.props
    ;((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0]
      const fjs = element
      let js = element
      js = d.createElement(s)
      js.id = id
      js.src = jsSrc
      if (fjs && fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs)
      } else {
        d.head.appendChild(js)
      }
      js.onload = cb
    })(document, 'script', 'google-login', () => {
      const params = {
        client_id: clientId,
        cookie_policy: cookiePolicy,
        login_hint: loginHint,
        hosted_domain: hostedDomain,
        fetch_basic_profile: fetchBasicProfile,
        discoveryDocs,
        ux_mode: uxMode,
        redirect_uri: redirectUri,
        scope,
        access_type: accessType
      }

      if (responseType === 'code') {
        params.access_type = 'offline'
      }

      window.gapi.load('auth2', () => {
        this.enableButton()
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params).then(
            res => {
              if (isSignedIn && res.isSignedIn.get()) {
                this.handleSigninSuccess(res.currentUser.get())
              }
            },
            err => onFailure(err)
          )
        }
        if (autoLoad) {
          this.signIn()
        }
      })
    })
  }
  componentWillUnmount() {
    this.enableButton = () => {}
  }
  enableButton() {
    this.setState({
      disabled: false
    })
  }
  signIn(e) {
    if (e) {
      e.preventDefault() // to prevent submit if used within form
    }
    if (!this.state.disabled) {
      const auth2 = window.gapi.auth2.getAuthInstance()
      const { onSuccess, onRequest, onFailure, prompt, responseType } = this.props
      const options = {
        prompt
      }
      onRequest()
      if (responseType === 'code') {
        auth2.grantOfflineAccess(options).then(res => onSuccess(res), err => onFailure(err))
      } else {
        auth2.signIn(options).then(res => this.handleSigninSuccess(res), err => onFailure(err))
      }
    }
  }
  handleSigninSuccess(res) {
    /*
      offer renamed response keys to names that match use
    */
    const basicProfile = res.getBasicProfile()
    const authResponse = res.getAuthResponse()
    res.googleId = basicProfile.getId()
    res.tokenObj = authResponse
    res.tokenId = authResponse.id_token
    res.accessToken = authResponse.access_token
    res.profileObj = {
      googleId: basicProfile.getId(),
      imageUrl: basicProfile.getImageUrl(),
      email: basicProfile.getEmail(),
      name: basicProfile.getName(),
      givenName: basicProfile.getGivenName(),
      familyName: basicProfile.getFamilyName()
    }
    this.props.onSuccess(res)
  }

  render() {
    const { tag, type, style, className, disabledStyle, buttonText, children, render, mode, icon } = this.props
    const disabled = this.state.disabled || this.props.disabled

    if (render) {
      return render({ onClick: this.signIn })
    }

    const initialStyle = {
      backgroundColor: mode === 'dark' ? 'rgb(66, 133, 244)' : '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      color: mode === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
      boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .24)',
      padding: 0,
      borderRadius: 2,
      border: '1px solid transparent',
      fontSize: 14,
      fontWeight: '500',
      fontFamily: 'Roboto, sans-serif'
    }

    const hoveredStyle = {
      cursor: 'pointer',
      opacity: 0.9
    }

    const activeStyle = {
      cursor: 'pointer',
      backgroundColor: mode === 'dark' ? '#3367D6' : '#eee',
      color: mode === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
      opacity: 1
    }
    const styleProp = (() => {
      if (style) {
        return style
      } else if (className && !style) {
        return {}
      }

      return initialStyle
    })()
    const defaultStyle = (() => {
      if (disabled) {
        return Object.assign({}, styleProp, disabledStyle)
      }

      if (this.state.active) {
        if (mode === 'dark') {
          return Object.assign({}, styleProp, activeStyle)
        }

        return Object.assign({}, styleProp, activeStyle)
      }

      if (this.state.hovered) {
        return Object.assign({}, styleProp, hoveredStyle)
      }

      return styleProp
    })()
    const googleLoginButton = React.createElement(
      tag,
      {
        onMouseEnter: () => this.setState({ hovered: true }),
        onMouseLeave: () => this.setState({ hovered: false }),
        onMouseDown: () => this.setState({ active: true }),
        onMouseUp: () => this.setState({ active: false }),
        onClick: this.signIn,
        style: defaultStyle,
        type,
        disabled,
        className
      },
      [
        icon && <GoogleIcon key={1} active={this.state.active} />,
        <ButtonContent icon={icon} key={2}>
          {children || buttonText}
        </ButtonContent>
      ]
    )

    return googleLoginButton
  }
}

GoogleLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  jsSrc: PropTypes.string,
  onRequest: PropTypes.func,
  buttonText: PropTypes.string,
  scope: PropTypes.string,
  className: PropTypes.string,
  redirectUri: PropTypes.string,
  cookiePolicy: PropTypes.string,
  loginHint: PropTypes.string,
  hostedDomain: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  disabledStyle: PropTypes.object,
  fetchBasicProfile: PropTypes.bool,
  prompt: PropTypes.string,
  tag: PropTypes.string,
  autoLoad: PropTypes.bool,
  disabled: PropTypes.bool,
  discoveryDocs: PropTypes.array,
  uxMode: PropTypes.string,
  isSignedIn: PropTypes.bool,
  responseType: PropTypes.string,
  type: PropTypes.string,
  accessType: PropTypes.string,
  render: PropTypes.func,
  mode: PropTypes.string,
  icon: PropTypes.bool
}

GoogleLogin.defaultProps = {
  type: 'button',
  tag: 'button',
  buttonText: 'Sign in with Google',
  scope: 'profile email',
  accessType: 'online',
  prompt: '',
  cookiePolicy: 'single_host_origin',
  fetchBasicProfile: true,
  isSignedIn: false,
  uxMode: 'popup',
  disabledStyle: {
    opacity: 0.6
  },
  icon: true,
  onRequest: () => {},
  jsSrc: 'https://apis.google.com/js/client:platform.js'
}

export default GoogleLogin
