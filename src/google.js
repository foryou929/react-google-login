import React, { PropTypes, Component } from 'react';

class GoogleLogin extends Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
    clientId: PropTypes.string.isRequired,
    buttonText: PropTypes.string,
    offline: PropTypes.bool,
    scope: PropTypes.string,
    cssClass: PropTypes.string,
    redirectUri: PropTypes.string,
    cookiePolicy: PropTypes.string,
    loginHint: PropTypes.string,
    hostedDomain: PropTypes.string,
    children: React.PropTypes.node,
  };

  static defaultProps = {
    buttonText: 'Login with Google',
    scope: 'profile email',
    redirectUri: 'postmessage',
    cookiePolicy: 'single_host_origin',
  };

  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
    this.state = {
      disabled: 'disabled',
    };
  }

  componentDidMount() {
    const { clientId, scope, cookiePolicy, loginHint, hostedDomain } = this.props;
    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      js = d.createElement(s);
      js.id = id;
      js.src = '//apis.google.com/js/platform.js';
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
          disabled: '',
        });
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params);
        }
      });
    });
  }

  onBtnClick() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    const { offline, redirectUri, callback } = this.props;
    if (offline) {
      const options = {
        'redirect_uri': redirectUri,
      };
      auth2.grantOfflineAccess(options)
        .then((response) => {
          callback(response);
        });
    } else {
      auth2.signIn()
        .then((response) => {
          const resObj = {
            el: response.El,
            hg: response.Zi,
            wc: response.w3,
          };
          callback(resObj);
        });
    }
  }

  render() {
    const style = {
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
    const { cssClass, buttonText, children } = this.props;
    return (
      <button
        className={ cssClass }
        onClick={ this.onBtnClick }
        style={ cssClass ? {} : style }
        disabled={ this.state.disabled }
      >
        { children ? children : buttonText }
      </button>
    );
  }
}

export default GoogleLogin;
