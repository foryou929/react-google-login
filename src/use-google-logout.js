import { useState, useEffect, useCallback } from 'react'
import loadScript from './load-script'
import removeScript from './remove-script'

const useGoogleLogout = ({
  jsSrc = 'https://apis.google.com/js/api.js',
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

  const signOut = useCallback(() => {
    if (window.gapi) {
      const auth2 = window.gapi.auth2.getAuthInstance()
      if (auth2 != null) {
        auth2.then(
          () => {
            auth2.signOut().then(() => {
              auth2.disconnect()
              onLogoutSuccess()
            })
          },
          err => onFailure(err)
        )
      }
    }
  }, [onLogoutSuccess])

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
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params).then(
            () => setLoaded(true),
            err => onFailure(err)
          )
        } else {
          setLoaded(true)
        }
      })
    })

    return () => {
      removeScript(document, 'google-login')
    }
  }, [])

  return { signOut, loaded }
}

export default useGoogleLogout
