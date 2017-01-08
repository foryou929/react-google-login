import React, { PropTypes, Component } from 'react';

class GoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.state = {
      disable: true,
    };
  }
  componentDidMount() {
    const { clientId, scope, cookiePolicy, loginHint, hostedDomain, autoLoad } = this.props;
    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      js = d.createElement(s);
      js.id = id;
      js.src = '//apis.google.com/js/client:platform.js';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
    })(document, 'script', 'google-login', () => {
      const params = {
        client_id: clientId,
        cookiepolicy: cookiePolicy,
        login_hint: loginHint,
        hosted_domain: hostedDomain,
        scope,
      };
      window.gapi.load('auth2', () => {
        this.setState({
          disable: false,
        });
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params);
        }
        if (autoLoad) {
          this.signIn();
        }
      });
    });
  }

  signIn() {
    if (!this.state.disable) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const { offline, redirectUri, onSuccess, onRequest, onFailure, approvalPrompt, prompt } = this.props;
      const options = {
        redirect_uri: redirectUri,
        approval_prompt: approvalPrompt,
        prompt,
      };
      onRequest();
      if (offline) {
        auth2.grantOfflineAccess(options)
          .then(res => {
            onSuccess(res);
          }, err => {
            onFailure(err);
          });
      } else {
        auth2.signIn(options)
          .then(res => {
            /*
              offer renamed response keys to names that match use
            */
            const basicProfile = res.getBasicProfile();
            const authResponse = res.getAuthResponse();
            res.googleId = basicProfile.getId();
            res.tokenObj = authResponse;
            res.tokenId = authResponse.id_token;
            res.accessToken = authResponse.access_token;
            res.profileObj = {
              googleId: basicProfile.getId(),
              imageUrl: basicProfile.getImageUrl(),
              email: basicProfile.getEmail(),
              name: basicProfile.getName(),
              givenName: basicProfile.getGivenName(),
              familyName: basicProfile.getFamilyName(),
            };
            onSuccess(res);
          }, err => {
            onFailure(err);
          });
      }
    }
  }

  render() {
    const { tag, style, className, disabledStyle, buttonText, children } = this.props;
    const { disabled } = this.state;
    const initialStyle = {
      display: 'inline-block',
      background: '#d14836',
      color: '#fff',
      width: 190,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 2,
      border: '1px solid transparent',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Roboto',
    };
    const defaultStyle = (() => {
      if (disabled) {
        return Object.assign({}, initialStyle, disabledStyle);
      }
      return initialStyle;
    })();
    const styleProp = (() => {
      if (style) {
        return style;
      } else if (className) {
        return {};
      }
      return defaultStyle;
    })();
    const googleLoginButton = React.createElement(
      tag, {
        onClick: this.signIn,
        style: styleProp,
        disabled,
        className,
      }, children ? children : buttonText
    );
    return googleLoginButton;
  }
}

GoogleLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  onRequest: PropTypes.func,
  buttonText: PropTypes.string,
  offline: PropTypes.bool,
  scope: PropTypes.string,
  className: PropTypes.string,
  redirectUri: PropTypes.string,
  cookiePolicy: PropTypes.string,
  loginHint: PropTypes.string,
  hostedDomain: PropTypes.string,
  children: React.PropTypes.node,
  style: React.PropTypes.object,
  disabledStyle: React.PropTypes.object,
  approvalPrompt: PropTypes.string,
  prompt: PropTypes.string,
  tag: PropTypes.string,
  autoLoad: React.PropTypes.bool,
};

GoogleLogin.defaultProps = {
  tag: 'button',
  buttonText: 'Login with Google',
  scope: 'profile email',
  redirectUri: 'postmessage',
  prompt: '',
  cookiePolicy: 'single_host_origin',
  disabledStyle: {
    opacity: 0.6,
  },
  onRequest: () => {},
};

export default GoogleLogin;
