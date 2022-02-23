import React, { useEffect, useState } from 'react';
import { VStack, Text, Box, Fab, TextArea, Button, Center, Image } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AddQuestionScreenProps, AddQuestionScreenRouteProp } from '../navigation/ScreenNavigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-community/voice';

export const voiceRecognition = require("../../assets/images/voice.gif");

const AddAnswer = () => {
  const navigation = useNavigation<AddQuestionScreenProps>();
  const route = useRoute<AddQuestionScreenRouteProp>();
  const { id, question } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [addQuestion, setAddQuestion] = useState({
    question: ""
  });

  const onInputChangeQuestion = (question: string) => setAddQuestion({ ...addQuestion, question: question });
  const onSpeechStartHandler = (start: any) => console.log("voice start -> ", start);
  const onSpeechEndHandler = (end: any) => console.log("voice end -> ", end);
  const onSpeechResultsHandler = (result: any) => setAddQuestion({ ...addQuestion, question: result.value[0] });

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    return () => { Voice.destroy().then(Voice.removeAllListeners); }
  }, []);

  const startRecording = async () => {
    setIsLoading(true);
    try {
      await Voice.start("pt-PT");
    } catch (error) {
      console.log(error);

    }
  }

  const stopRecording = async () => {
    setIsLoading(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.log(error);

    }
  }

  const onNextButtonPress = () => {
    fetch("http://localhost:3001/question", {
      method: "post",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ moduleId: id, question: addQuestion.question })
    }).then(res => {
      res.json().then(r => navigation.navigate("AddAnswer", { questionId: r }));
    }).catch(err => console.log(err));
  }


  return (
    <>
      <Center width={"100%"}>
        <VStack space={3} alignItems="center" width="100%">
          <Box display={"flex"} mb={2} safeAreaTop={5}>
            <Text textAlign="center" fontSize={"xs"}>Módulo #{id}</Text>
          </Box>
          <Box display={"flex"} mt="25%" w="95%">
            <TextArea height={300} borderColor="emerald.400" placeholder="Pergunta" value={addQuestion.question} onChangeText={onInputChangeQuestion} />
            <Button mt={2} size="lg" w="100%" variant="subtle" colorScheme="teal" onPress={onNextButtonPress}>Próximo</Button>
          </Box>
          {isLoading ?
            <Box position="absolute" mt={48}>
              <Image source={voiceRecognition} alt="loader" size="md" />
            </Box>
            : null}
        </VStack>
      </Center>
      <Fab
        renderInPortal={false}
        marginBottom={3}
        borderRadius="full"
        colorScheme="emerald"
        placement="bottom-right"
        paddingLeft={5}
        paddingRight={5}
        onPressIn={startRecording}
        onPressOut={stopRecording}
        icon={
          <Icon size={30} name="microphone" color={"#ffffff"} />
        }
      />
    </>
  );
};
export default AddAnswer;
