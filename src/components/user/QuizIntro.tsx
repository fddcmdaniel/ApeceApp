import React from 'react';
import { Text, Button, Center, Heading, Box, ScrollView, Spacer } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { QuizIntroScreenProps, QuizIntroScreenRouteProp } from '../../navigation/ScreenNavigation';
import YoutubePlayer from 'react-native-youtube-iframe';
import VideoPlayer from 'react-native-video-player';
import Icon from 'react-native-vector-icons/FontAwesome';

const QuizIntro = () => {
  const navigation = useNavigation<QuizIntroScreenProps>();
  const route = useRoute<QuizIntroScreenRouteProp>();
  const { moduleId, moduleName, moduleDescription, modulesYoutubeId } = route.params;

  const onStartPress = () => {
    navigation.navigate("Quiz", { moduleId: moduleId });
  }

  return (
    <ScrollView w="full" h="full" backgroundColor="emerald.50">
      <Box safeAreaTop={20}>
        <Heading textAlign="center" mb="10" color="#329d9c">{moduleName}</Heading>
        <Center>
          <Text fontSize={"lg"} textAlign={"center"} paddingX={"4"} marginBottom={"8"} color="gray.600">{moduleDescription}</Text>
          <YoutubePlayer
            play={true}
            height={400}
            width={400}
            // initialPlayerParams={{ controls: false, loop: true }}
            videoId={modulesYoutubeId}
          // webViewProps={{ pointerEvents: "none" }}
          />
          <Icon name="info-circle" size={25} color="#0ea5e9" />
          <Text fontSize={"xs"} textAlign={"center"} paddingX={"4"} marginBottom={"8"} color="gray.600">
            Ao iniciar o questionário certifique-se que dispõe de tempo para o terminar. Assim que iniciar não poderá recomeçar.
          </Text>
          <Button size="lg" w="300" variant="subtle" colorScheme="teal" onPress={onStartPress}>Iniciar</Button>
        </Center>
      </Box>
    </ScrollView >
  );
};
export default QuizIntro;
