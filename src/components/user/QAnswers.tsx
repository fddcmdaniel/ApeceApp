import React, { useContext, useEffect, useState } from 'react'
import { Text, Box, Radio } from 'native-base';
import { AnswerProps, QuizContext } from './ContextInterfaces';
import { IAnswer } from './ContextInterfaces';
import Loading from '../Loading';

const QuizAnswers = (props: AnswerProps) => {

  const { questionId } = props;
  const [answers, setAnswers] = useState<Array<IAnswer>>([]);
  const { selectedQuestion, setSelectedQuestion } = useContext(QuizContext);
  const [isLoaded, setIsLoaded] = useState(true);

  const onAnswerSelected = (nextValue: string) => {
    setSelectedQuestion(nextValue);
  }

  console.log("Value Q: ", selectedQuestion);


  useEffect(() => {
    const getAnswers = async () => {
      await fetch(`http://localhost:3001/question/${questionId}/answers`, {
        method: "get",
        headers: { "content-type": "application/json" },
        credentials: "include"
      }).then(res => {
        res.json().then(r => setAnswers(r))
      });
      setIsLoaded(false);
    }
    getAnswers();
  }, []);

  return (
    <>
      {isLoaded && <Loading />}
      <Radio.Group name="question" value={selectedQuestion} onChange={onAnswerSelected}>
        {answers.map((a: IAnswer) => {
          return (
            <Box key={a.id} alignItems="flex-start" borderColor="#7BE495" backgroundColor="muted.100" borderWidth={2} borderRadius="2xl" paddingX={3} paddingY={0} mb={2} w="100%">
              <Radio colorScheme="teal" size="lg" value={String(a.id)} my={1}>
                <Text padding={2}>{a.answer}</Text>
              </Radio>
            </Box>
          );
        })}
      </Radio.Group>
    </>
  );
};
export default QuizAnswers;
