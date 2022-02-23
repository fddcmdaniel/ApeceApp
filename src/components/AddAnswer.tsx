import React, { useEffect, useState } from 'react';
import { ScrollView, Pressable, Heading, VStack, Text, Box, Input, Stack, Fab, TextArea, Button, Center, Checkbox, Image } from 'native-base';
//import Icon from 'react-native-vector-icons/FontAwesome';
import ModuleModal from './ModuleModal';
import ModuleActionSheet from './ModuleActionSheet';
import { DefaultAnswer, DefaultModule, IAnswer, IModule, ModuleContext, QuestionProps } from './ContextInterfaces';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AddAnswerScreenProps, AddAnswerScreenRouteProp } from '../navigation/ScreenNavigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Voice from '@react-native-community/voice';

export const voiceRecognition = require("../../assets/images/voice.gif");

const AddAnswer = () => {
  //const navigation = useNavigation<AddAnswerScreenProps>();
  const route = useRoute<AddAnswerScreenRouteProp>();
  const { questionId } = route.params;
  const [isSelected, setSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyCorrectUse, setAlreadyCorrectUse] = useState(false);
  const [addAnswer, setAddAnswer] = useState<IAnswer>(DefaultAnswer);
  const onInputChangeAnswer = (answer: string) => setAddAnswer({ ...addAnswer, answer: answer });
  const onSpeechStartHandler = (start: any) => console.log("voice start -> ", start);
  const onSpeechEndHandler = (end: any) => console.log("voice end -> ", end);
  const onSpeechResultsHandler = (result: any) => setAddAnswer({ ...addAnswer, answer: result.value[0] });

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

  useEffect(() => {
    if (!alreadyCorrectUse) {
      fetch("http://localhost:3001/answercheck", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ questionId: questionId })
      }).then(res => {
        res.json().then(r => {
          setSelection(false);
          setAlreadyCorrectUse(r);
        }) //true
      }).catch(err => {
        console.log(err);
      });
    }
  }, []);

  const onAddButtonPress = () => {
    fetch("http://localhost:3001/answer", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        isCorrect: isSelected ? 1 : 0,
        questionId: questionId,
        answer: addAnswer.answer
      })
    }).then(res => {
      res.json().then(r => {
        setSelection(false);
        setAlreadyCorrectUse(r);
      }); // true
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <>
      <Center width={"100%"}>
        <VStack space={3} alignItems="center" width="100%">
          <Box display={"flex"} mb={2} safeAreaTop={5}>
            <Text textAlign="center" fontSize={"xs"}>Pergunta #{questionId}</Text>
          </Box>
          <Box display={"flex"} mt="25%" w="95%">
            <TextArea height={300} borderColor="emerald.400" placeholder="Resposta" value={addAnswer.answer} onChangeText={onInputChangeAnswer} />
            <Checkbox rounded={"full"} size={"md"} mt={4} mb={2} value={String(isSelected)} style={alreadyCorrectUse ? { display: "none" } : { display: "flex" }} onChange={setSelection} colorScheme="teal">
              <Text fontSize={16} ml={2} style={alreadyCorrectUse ? { display: "none" } : { display: "flex" }}>Resposta correta ?</Text>
            </Checkbox>
            <Button mt={2} size="lg" w="100%" variant="subtle" colorScheme="teal" onPress={onAddButtonPress}>Adicionar</Button>
          </Box>
          {isLoading ?
            <Box position="absolute" mt={48}>
              <Image source={voiceRecognition} alt="loader" size="md" />
            </Box>
            : null}
        </VStack>
      </Center >
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
