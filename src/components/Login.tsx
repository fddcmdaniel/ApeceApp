
import React, { useContext, useEffect, useState } from 'react';
import { HStack, Center, Heading, VStack, Image, Input, Button } from 'native-base';
import { Alert, ImageBackground } from "react-native"
import { StateLoginContext } from './ContextInterfaces';
import { AuthScreenProps } from '../navigation/ScreenNavigation';
import { useNavigation } from '@react-navigation/native';

export const Logo = require("../../assets/images/logo.png");
export const Background = require("../../assets/images/login_bg.png");


function Login() {
  const navigation = useNavigation<AuthScreenProps>();
  const [puser, setPuser] = useState("");
  const [ppass, setPpass] = useState("");
  const [resStatus, setResStatus] = useState(0);
  const { loggedIn, setLoggedIn, user, setUser } = useContext(StateLoginContext);


  const onInputChangeUser = (email: string) => {
    setPuser(email);
  };

  const onInputChangePassword = (password: string) => {
    setPpass(password);
  };

  const alertDialog = (message: string) => {
    Alert.alert(
      "Erro de autenticação",
      puser === "" || ppass === "" ?
        "E-mail ou password vazias" :
        message,
      [
        { text: "OK" }
      ]
    );
  }

  const onButtonPress = () => {
    if (puser === "" || ppass === "") {
      alertDialog("");
    } else {
      fetch("http://localhost:3001/users/authenticate", {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email: puser,
          password: ppass
        })
      }).then(res => {
        res.json().then(r => {
          if (r.login) {
            setUser(r.user);
            setLoggedIn(r.login);
            setResStatus(res.status);
          } else {
            alertDialog(r.message);
          }
        }) //true
      }).catch(err => {
        console.log(err);
      });
    }
  }

  useEffect(() => {
    if (loggedIn) user.is_admin ? navigation.navigate("ModulesTest") : navigation.navigate("UserModules");
  }, [loggedIn]);


  return (
    <Center backgroundColor="emerald.100" h="full" w="full" justifyContent="flex-start" paddingTop="1/3">
      <ImageBackground source={Background} resizeMode="cover" style={{ flex: 1, width: "100%" }}>
        <VStack space={7} alignItems="center">
          <Image source={Logo} alt="#" size="250" shadow={1} />
          <Heading size="xl" color="blueGray.500">LOGIN</Heading>
          <HStack space={2} alignItems="center">
            <Input backgroundColor="rgba(86, 196, 151, 0.2)" borderRadius="sm" autoFocus={true} color="gray.500" w={{ base: "75%", md: "25%" }} variant="underlined" keyboardType="email-address" onChangeText={onInputChangeUser} placeholder="E-mail" />
          </HStack>
          <HStack space={2} alignItems="center">
            <Input backgroundColor="rgba(86, 196, 151, 0.2)" borderRadius="sm" color="gray.500" w={{ base: "75%", md: "25%" }} variant="underlined" onChangeText={onInputChangePassword} placeholder="Password" secureTextEntry={true} />
          </HStack>
          <Button size="lg" w="300" variant="subtle" colorScheme="blueGray" onPress={onButtonPress}> login</Button>
        </VStack>
      </ImageBackground>
    </Center>
  );
};
export default Login;
