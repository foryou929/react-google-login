import { useState, useEffect } from 'react'
import loadScript from './load-script'

const useGoogleLogout = ({
  jsSrc,
  onFailure,
  clientId,
  cookiePolicy,
  loginHint,
  hostedDomain,
  fetchBasicProfile,
  discoveryDocs,
  uxMode,
  redirectUri,
  scope,
  accessType,
  onLogoutSuccess
}) => {
  const [loaded, setLoaded] = useState(false)

  const signOut = () => {
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance()
      if (auth2 != null) {
        auth2.signOut().then(auth2.disconnect().then(onLogoutSuccess))
      }
    }
  }

  useEffect(() => {
    loadScript(document, 'script', 'google-login', jsSrc, () => {
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
      window.gapi.load('auth2', () => {
        setLoaded(true)
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params).then(() => {}, err => onFailure(err))
        }
      })
    })
  }, [])

  return { signOut, loaded }
}

export default useGoogleLogout
