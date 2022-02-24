
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, Button, Center, Heading, Text, View } from 'native-base';
import { ImageBackground } from 'react-native';
import { ResultScreenProps, ResultScreenRouteProp } from '../../navigation/ScreenNavigation';

export const sucessImg = require("../../../assets/images/sucess.png");
export const insucessImg = require("../../../assets/images/insucess.png");

const FinalResult = () => {
  const navigation = useNavigation<ResultScreenProps>();
  const route = useRoute<ResultScreenRouteProp>();
  const { finalResult, isApproved } = route.params;

  console.log("Result: ", finalResult);
  console.log("Approved? ", isApproved);



  const onHomePress = () => {
    navigation.navigate("UserModules");
  }
  return (
    <View w={"full"} h={"full"} backgroundColor={isApproved ? "green.300" : "red.300"}>
      <ImageBackground source={isApproved ? sucessImg : insucessImg} resizeMode="center" style={{ flex: 1 }}>
        <Box safeAreaTop={20} position="relative">
          <Center justifyContent="flex-start" safeAreaTop={20}>
            <Heading textAlign="center" mb="10" fontSize="3xl" color="trueGray.700">Resultado</Heading>
            <Text fontSize="2xl" color="trueGray.700" mb={6} bold>{finalResult}%</Text>
            <Text fontSize={"lg"} color="trueGray.700" textAlign={"center"} px="4" mb="32">{isApproved ? "Módulo concluído com sucesso!" : "Módulo não foi concluído!"}</Text>
            <Button w={"80%"} variant="solid" colorScheme="blueGray" onPress={onHomePress}>Voltar aos módulos</Button>
          </Center>
        </Box>
      </ImageBackground>
    </View >
  );

};

export default FinalResult;