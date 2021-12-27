import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { withAuthenticator } from "aws-amplify-react-native";
import Amplify, { API, Auth, graphqlOperation } from "aws-amplify";
import config from "./src/aws-exports";
import { getUser } from "./src/graphql/queries";
import { createUser } from "./src/graphql/mutations";
Amplify.configure(config);

const randomImages = [
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg",
];

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  };

  //Link user in Auth to Cognito: only when App is first mounted
  useEffect(() => {
    const fetchUser = async () => {
      //get authenitcated user from Auth
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      if (userInfo) {
        //get the user from backend using the user's "sub"(unique indentifier) from Auth
        const userData = await API.graphql(
          graphqlOperation(getUser, {
            id: userInfo.attributes.sub,
          })
        );

        if (userData.data.getUser) {
          console.log("User is already registered in db");
          return;
        }

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUri: getRandomImage(),
          status: "Hey, I am using this chat app!",
        };

        await API.graphql(
          graphqlOperation(createUser, {
            input: newUser,
          })
        );
      }
    };

    fetchUser();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
