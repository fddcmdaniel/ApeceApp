import React, { useEffect, useRef, useState } from 'react';
import { Text, Button, Center, Heading, Container, ScrollView } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { QuizScreenProps, QuizScreenRouteProp } from '../../navigation/ScreenNavigation';
import { IQuestion, IResult, QuizContext } from './ContextInterfaces';
import QAnswers from './QAnswers';
import { ImageBackground } from 'react-native';

export const Background = require("../../../assets/images/question_bg_.png");

const Quiz = () => {

  const navigation = useNavigation<QuizScreenProps>();
  const route = useRoute<QuizScreenRouteProp>();
  const { moduleId } = route.params;
  const swiper = useRef(null);

  const [questions, setQuestions] = useState<Array<IQuestion>>([]);;
  const [results, setResults] = useState<Array<IResult>>([]);
  const [pageCount, setPageCount] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const onPressNext = (questionId: string) => {
    return () => {
      //@ts-ignore
      swiper.current.scrollBy(pageCount);
      results.push({ question_id: questionId, answer_id: selectedQuestion });

      if (!(pageCount + 1 === questions.length)) {
        setPageCount(pageCount + 1);
        setSelectedQuestion("");
        console.log("Question", selectedQuestion);

      } else {
        fetch("http://localhost:3001/results", {
          method: "POST",
          headers: { "content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            moduleId: moduleId,
            results: results
          })
        }).then(res => {
          res.json().then(r => {
            navigation.navigate("FinalResult", { finalResult: r.finalResult, isApproved: r.isApproved })
          })
        });
      }
    }
  }

  useEffect(() => {
    const getQuestion = async () => {
      await fetch(`http://localhost:3001/module/${moduleId}/questions`, {
        method: "get",
        headers: { "content-type": "application/json" },
        credentials: "include"
      }).then(res => {
        res.json().then(r => setQuestions(r.questions)) //TODO: fix the json sent by node
      });
    }
    getQuestion();
  }, []);

  console.log("Q", questions);


  return (
    <QuizContext.Provider value={{ selectedQuestion, setSelectedQuestion }}>
      <Swiper scrollEnabled={false} ref={swiper} showsButtons={false} activeDotColor='#56c596' index={pageCount} loop={false}>
        {questions.map((q: any, index: number) => {
          return (
            <ScrollView key={index} w={"full"} h={"full"} backgroundColor="white">
              <ImageBackground source={Background} resizeMode="cover" style={{ flex: 1, justifyContent: "center" }}>
                <Center>
                  <Container safeAreaTop={20} mb={3}>
                    <Center>
                      <Heading mb={4} color="white">Pergunta #{index + 1}</Heading>
                      <Text mb="20" textAlign={"center"} color="white" fontSize={16}>{q.question}</Text>
                    </Center>
                  </Container>
                </Center>
              </ImageBackground>
              <Center>
                <Container mt={7}>
                  <QAnswers questionId={q.id} />
                </Container>
              </Center>
              <Center>
                <Button colorScheme="teal" onPress={onPressNext(q.id)} width="80%" mt={4} isDisabled={selectedQuestion ? false : true}>{pageCount + 1 === questions.length ? "Terminar" : "Próxima"}</Button>
              </Center>

            </ScrollView >
          )
        })}
      </Swiper >
    </QuizContext.Provider>
  );
};
export default Quiz;
