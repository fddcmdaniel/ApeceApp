import React, { useEffect, useState } from 'react';
import { Pressable, VStack, Text, Box, Stack, Fab, Center, View, Button } from 'native-base';
import { DefaultQuestion, IQuestion } from './ContextInterfaces';
import { useNavigation, useRoute } from '@react-navigation/native';
import { QuestionScreenRouteProp, QuestionsScreenProps } from '../navigation/ScreenNavigation';
import { SwipeListView } from 'react-native-swipe-list-view';
import { styleSwipeList } from '../Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import QuestionModal from './QuestionModal';

function Questions() {
  const navigation = useNavigation<QuestionsScreenProps>();
  const route = useRoute<QuestionScreenRouteProp>();
  const { moduleId } = route.params;
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const [question, setQuestion] = useState<IQuestion>(DefaultQuestion);
  const [questions, setQuestions] = useState<Array<IQuestion>>([]);
  const [alreadyModule, setAlreadyModule] = useState(false);

  const onAddQuestionPress = () => {
    navigation.navigate("AddQuestion", { id: String(moduleId) });
  }

  const onAddAnswerPress = (rowMap: any, question: any) => {
    return () => {
      closeRow(rowMap, question.item.key);
      navigation.navigate("AddAnswer", { questionId: question.item.id });
    }
  }

  const onQuestionPress = (question: any) => {
    return () => {
      navigation.navigate("Answers", { questionId: question.item.id, alreadyModule: alreadyModule });
    }
  }

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) rowMap[rowKey].closeRow();
  };

  const onEditPress = (rowMap: any, question: any) => {
    return () => {
      closeRow(rowMap, question.item.key);
      setQuestion(question.item);
      setShowQuestionModal(true);
    }
  }

  console.log("Done: ", alreadyModule);


  useEffect(() => {
    fetch(`http://localhost:3001/module/${moduleId}/questions`, {
      method: "get",
      headers: { "content-type": "application/json" },
      credentials: "include"
    }).then(res => {
      res.json().then(r => {
        setQuestions(r.questions);
        setAlreadyModule(r.alreadyModule);
      })
    });
  }, []);

  console.log("\nquestion\n", questions);


  const renderItem = (data: any) => (
    <Pressable key={data.item.key} onPress={onQuestionPress(data)} >
      <Box marginBottom={2} width="100%" p={3} h={100} bg="primary.500" rounded="md" shadow={1}>{data.item.question}</Box>
    </Pressable>
  );

  const renderHiddenItem = (question: any, rowMap: any) => (
    <View style={styleSwipeList.rowBack}>
      <Button isDisabled={alreadyModule ? true : false} style={[styleSwipeList.backRightBtn, styleSwipeList.backRightBtnCenter]} onPress={onAddAnswerPress(rowMap, question)} _pressed={{ opacity: 50 }}>
        <Icon name="plus-circle" size={20} color="white" />
      </Button>
      <Button isDisabled={alreadyModule ? true : false} style={[styleSwipeList.backRightBtn, styleSwipeList.backRightBtnRight]} onPress={onEditPress(rowMap, question)} _pressed={{ opacity: 50 }}>
        <Icon name="edit" size={20} color="white" />
      </Button>
    </View >
  );

  return (
    <>
      <Center width={"100%"}>
        <VStack space={3} alignItems="center" width="100%">
          <Box mb={2} safeAreaTop={5}>
            <Text fontSize={"xs"}>({questions.length} perguntas disponíveis)</Text>
          </Box>
        </VStack>
        <Stack display="flex" flexDirection="row" width="95%" marginTop={3}>
          <SwipeListView
            style={{ backgroundColor: "transparent" }}
            data={questions}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-150}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            disableRightSwipe
            closeOnScroll
          />
        </Stack>
        <QuestionModal
          showQuestionModal={showQuestionModal}
          setShowQuestionModal={setShowQuestionModal}
          setQuestions={setQuestions}
          question={question}
        />
      </Center>
      <Fab
        marginBottom={3}
        isDisabled={alreadyModule ? true : false}
        borderRadius="full"
        colorScheme="emerald"
        placement="bottom-right"
        renderInPortal={false}
        icon={
          <Icon size={15} name="plus" color={"#ffffff"} />
        }
        label="Adicionar pergunta"
        onPress={onAddQuestionPress}
      />
    </>
  );
};
export default Questions;
