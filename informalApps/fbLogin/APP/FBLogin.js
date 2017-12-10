import React, { Component } from 'react';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

class FBLogin extends Component {
  render() {
    return (
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("An error occurred. Please try again! " + result.error);
              } else if (result.isCancelled) {
                console.log("login was cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert('Oh snap it worked!')
                  }
                )
              }
            }
          }
          />
    );
  };
};
export default FBLogin;
