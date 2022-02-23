import React, { useContext, useEffect } from 'react';
import Login from '../components/Login';
import Modules from '../components/Modules';
import AddQuestion from '../components/AddQuestion';
import AddAnswer from '../components/AddAnswer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthScreenProps, RootStackParamList } from './ScreenNavigation';
import { Link } from 'native-base';
import Questions from '../components/Questions';
import Answers from '../components/Answers';
import UserModules from '../components/user/UserModules';
import Quiz from '../components/user/Quiz';
import QuizIntro from '../components/user/QuizIntro';
import FinalResult from '../components/user/FinalResult';
import { DefaultUser, StateLoginContext } from '../components/ContextInterfaces';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModulesTest from '../components/ModulesTest';


const Stack = createNativeStackNavigator<RootStackParamList>();

const linkHeader = () => {

  const navigation = useNavigation<AuthScreenProps>();
  const { loggedIn, setLoggedIn, setUser } = useContext(StateLoginContext);

  useEffect(() => {
    if (!loggedIn) navigation.navigate("Auth");
  }, [loggedIn])

  const onLogoutPress = () => {
    fetch("http://localhost:3001/users/logout", {
      headers: {
        "content-type": "application/json"
      },
      credentials: "include"
    }).then(res => {
      res.json().then(r => {
        setLoggedIn(r);
        setUser(DefaultUser);

      })
    }).catch(err => {
      console.log(err);
    })

  }

  return (
    <Link fontSize={6} onPress={onLogoutPress}><Icon name="sign-out" size={25} color="#cff4d2" /></Link>
  );
}

const NavigationController = () => {
  return (
    <Stack.Navigator initialRouteName="Auth"
      screenOptions={{
        headerLargeStyle: { backgroundColor: "#56C596" },
        headerTitleStyle: { color: "#ffffff", fontSize: 20 }
      }}
    >
      <Stack.Screen name="Auth" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="Modules" options={{ headerTitle: "Módulos", headerBackVisible: false, headerRight: linkHeader }} component={Modules} />
      {/* Delete */}
      <Stack.Screen name="ModulesTest" options={{ headerTitle: "Módulos", headerBackVisible: false, headerRight: linkHeader }} component={ModulesTest} />
      {/* Delete */}
      <Stack.Screen name="AddQuestion" options={{ headerTitle: "Adicionar pergunta", headerBackTitle: "" }} component={AddQuestion} />
      <Stack.Screen name="Questions" options={{ headerTitle: "Lista perguntas", headerBackTitle: "" }} component={Questions} />
      <Stack.Screen name="Answers" options={{ headerTitle: "Lista de respostas", headerBackTitle: "" }} component={Answers} />
      <Stack.Screen name="AddAnswer" options={{ headerTitle: "Adicionar resposta", headerBackTitle: "" }} component={AddAnswer} />
      <Stack.Screen name="UserModules" options={{
        headerTitle: "Módulos",
        contentStyle: { paddingTop: 15, backgroundColor: "#56C596" },
        headerShadowVisible: false,
        headerBackVisible: false,
        headerRight: linkHeader,
      }}
        component={UserModules}
      />
      <Stack.Screen name="Quiz" options={{ headerShown: false }} component={Quiz} />
      <Stack.Screen name="QuizIntro" options={{ headerShown: false }} component={QuizIntro} />
      <Stack.Screen name="FinalResult" options={{ headerShown: false }} component={FinalResult} />
    </Stack.Navigator>
  );
};
export default NavigationController;
