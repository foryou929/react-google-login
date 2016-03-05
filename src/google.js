import React, { PropTypes, Component } from 'react';

class GoogleLogin extends Component {

  static propTypes = {
    callback: PropTypes.func.isRequired,
    clientId: PropTypes.string.isRequired,
    textButton: PropTypes.string,
    offline: PropTypes.bool,
    scope: PropTypes.string,
    cssClass: PropTypes.string,
    redirectUri: PropTypes.string 
  };


  static defaultProps = {
    textButton: 'Login with Google',
    scope: 'profile email',
    redirectUri: 'postmessage'
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    (function(d, s, id, cb) {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      js = d.createElement(s);
      js.id = id;
      js.src = '//apis.google.com/js/platform.js';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
    }(document, 'script', 'google-login', () => {
      const params = {
        client_id: this.props.clientId,
        cookiepolicy: 'single_host_origin'
      }
      window.gapi.load('auth2', () => {
        gapi.auth2.init(params);
      });
    }));
  }

  onBtnClick() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    if (this.props.offline) {
      let options = {
        'scope': this.props.scope,
        'redirect_uri': this.props.redirectUri
      }
      auth2.grantOfflineAccess(options).then((data) => {
        this.props.callback(data)
      });

    } else {
      let options = {
        'scope': this.props.scope
      }
      auth2.signIn()
        .then(() => {
            if (auth2.isSignedIn.get(options)) {
              var profile = auth2.currentUser.get().getBasicProfile();
              this.props.callback(profile);
            }
        });
    }
  }

  render() {
    let style = {
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
      fontFamily: 'Roboto'
    }
    
    return (
      <div>
        <button 
          className={this.props.cssClass} 
          onClick={this.onBtnClick.bind(this)}
          style={this.props.cssClass ? {} : style} 
        >
          {this.props.textButton}
        </button>
    </div>
    );
  }
}

export default GoogleLogin;
