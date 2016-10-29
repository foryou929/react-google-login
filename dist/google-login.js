!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react")):"function"==typeof define&&define.amd?define(["react"],t):"object"==typeof exports?exports.GoogleLogin=t(require("react")):e.GoogleLogin=t(e.react)}(this,function(e){return function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t,o){e.exports=o(2)},function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),c=o(3),l=n(c),p=function(e){function t(e){i(this,t);var o=r(this,Object.getPrototypeOf(t).call(this,e));return o.onBtnClick=o.onBtnClick.bind(o),o.state={disabled:"disabled"},o}return s(t,e),a(t,[{key:"componentDidMount",value:function(){var e=this,t=this.props,o=t.clientId,n=t.scope,i=t.cookiePolicy,r=t.loginHint,s=t.hostedDomain;!function(e,t,o,n){var i=e.getElementsByTagName(t)[0],r=i,s=i;s=e.createElement(t),s.id=o,s.src="//apis.google.com/js/client:platform.js",r.parentNode.insertBefore(s,r),s.onload=n}(document,"script","google-login",function(){var t={client_id:o,cookiepolicy:i,login_hint:r,hosted_domain:s,scope:n};window.gapi.load("auth2",function(){e.setState({disabled:""}),window.gapi.auth2.getAuthInstance()||window.gapi.auth2.init(t)})})}},{key:"onBtnClick",value:function(){var e=window.gapi.auth2.getAuthInstance(),t=this.props,o=t.offline,n=t.redirectUri,i=t.onSuccess,r=t.onFailure,s=t.approvalPrompt;if(o){var a={redirect_uri:n,approval_prompt:s};e.grantOfflineAccess(a).then(function(e){i(e)},function(e){r(e)})}else e.signIn().then(function(e){var t=e.getBasicProfile(),o=e.getAuthResponse();e.googleId=t.getId(),e.tokenObj=o,e.tokenId=o.id_token,e.accessToken=o.access_token,e.profileObj={googleId:t.getId(),imageUrl:t.getImageUrl(),email:t.getEmail(),name:t.getName(),givenName:t.getGivenName(),familyName:t.getFamilyName()},i(e)},function(e){r(e)})}},{key:"render",value:function(){var e={display:"inline-block",background:"#d14836",color:"#fff",width:190,paddingTop:10,paddingBottom:10,borderRadius:2,border:"1px solid transparent",fontSize:16,fontWeight:"bold",fontFamily:"Roboto"},t=this.props,o=t.tag,n=t.style,i=t.className,r=t.buttonText,s=t.children,a=l["default"].createElement(o,{onClick:this.onBtnClick,style:i?{}:n||e,disabled:this.state.disabled,className:i},s?s:r);return a}}]),t}(c.Component);p.propTypes={onSuccess:c.PropTypes.func.isRequired,onFailure:c.PropTypes.func.isRequired,clientId:c.PropTypes.string.isRequired,buttonText:c.PropTypes.string,offline:c.PropTypes.bool,scope:c.PropTypes.string,className:c.PropTypes.string,redirectUri:c.PropTypes.string,cookiePolicy:c.PropTypes.string,loginHint:c.PropTypes.string,hostedDomain:c.PropTypes.string,children:l["default"].PropTypes.node,style:l["default"].PropTypes.object,approvalPrompt:c.PropTypes.string,tag:c.PropTypes.string},p.defaultProps={tag:"button",buttonText:"Login with Google",scope:"profile email",redirectUri:"postmessage",cookiePolicy:"single_host_origin"},t["default"]=p},function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var i=o(1),r=n(i);t["default"]=r["default"]},function(t,o){t.exports=e}])});
//# sourceMappingURL=google-login.js.map