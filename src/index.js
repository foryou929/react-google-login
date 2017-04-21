import React, { PropTypes, Component } from 'react';

class GoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
    };
  }

  componentDidMount() {
    const { autoLoad, onFailure, clientId, cookiePolicy, scope, hostedDomain, fetchBasicProfile, uxMode } = this.props;
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
      // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig
      const params = {
        client_id: clientId,
        cookiepolicy: cookiePolicy,
        fetch_basic_profile: fetchBasicProfile,
        hosted_domain: hostedDomain,
        scope,
        ux_mode: uxMode,
      };
      this.maybeSetRedirectUri(params);

      window.gapi.load('auth2', () => {
        this.setState({
          disabled: false,
        });
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params).then(
            () => {},
            err => onFailure(err)
          );
        }
        if (autoLoad) {
          this.signIn();
        }
      });
    });
  }
  maybeSetPrompt = (params) => {
    const { prompt } = this.props;
    // only set prompt if it was passed in
    if (prompt) {
      params.prompt = prompt;
    }
  }

  maybeSetRedirectUri = (params) => {
    const { uxMode, redirectUri } = this.props;
    // only set redirect_uri if we're actually redirecting
    if (uxMode === 'redirect') {
      params.redirect_uri = redirectUri;
    }
  }

  signIn = (e) => {
    if (e) {
      e.preventDefault(); // to prevent submit if used within form
    }
    if (!this.state.disabled) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const { offline, onSuccess, onRequest, onFailure, scope, fetchBasicProfile, uxMode } = this.props;
      onRequest();
      if (offline) {
        // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2offlineaccessoptions
        const params = {
          scope,
        };
        this.maybeSetPrompt(params);

        auth2.grantOfflineAccess(params)
          .then(
            res => onSuccess(res),
            err => onFailure(err)
          );
      } else {
        // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2signinoptions
        const params = {
          fetch_basic_profile: fetchBasicProfile,
          scope,
          ux_mode: uxMode,
        };
        this.maybeSetPrompt(params);
        this.maybeSetRedirectUri(params);

        auth2.signIn(params)
          .then((res) => {
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
          }, err =>
            onFailure(err)
          );
      }
    }
  }

  render() {
    const { tag, style, className, disabledStyle, buttonText, children } = this.props;
    const disabled = this.state.disabled || this.props.disabled;
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
    const styleProp = (() => {
      if (style) {
        return style;
      } else if (className && !style) {
        return {};
      }
      return initialStyle;
    })();
    const defaultStyle = (() => {
      if (disabled) {
        return Object.assign({}, styleProp, disabledStyle);
      }
      return styleProp;
    })();
    const googleLoginButton = React.createElement(
      tag, {
        onClick: this.signIn,
        style: defaultStyle,
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
  hostedDomain: PropTypes.string,
  children: React.PropTypes.node,
  style: React.PropTypes.object,
  disabledStyle: React.PropTypes.object,
  fetchBasicProfile: PropTypes.bool,
  prompt: PropTypes.string,
  tag: PropTypes.string,
  autoLoad: PropTypes.bool,
  disabled: PropTypes.bool,
  uxMode: PropTypes.string,
};

GoogleLogin.defaultProps = {
  tag: 'button',
  buttonText: 'Login with Google',
  scope: 'profile email',
  redirectUri: '',
  prompt: '',
  cookiePolicy: 'single_host_origin',
  fetchBasicProfile: true,
  uxMode: 'popup',
  disabledStyle: {
    opacity: 0.6,
  },
  onRequest: () => {},
  offline: false,
};

export default GoogleLogin;
