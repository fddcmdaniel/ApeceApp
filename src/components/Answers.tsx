import React, { useEffect, useState } from 'react';
import { Pressable, VStack, Text, Box, Stack, Fab, Center, View, Button } from 'native-base';
import { DefaultAnswer, IAnswer } from './ContextInterfaces';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';
import { AnswerScreenRouteProp, AnswersScreenProps } from '../navigation/ScreenNavigation';
import { SwipeListView } from 'react-native-swipe-list-view';
import { styleSwipeList } from '../Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import AnswerModal from './AnswerModal';

// import images
export const welcomeAssets = require("../../assets/images/welcome.png");

function Answers() {
  const isFocused = useIsFocused();
  const navigation = useNavigation<AnswersScreenProps>();
  const route = useRoute<AnswerScreenRouteProp>();
  const { questionId, alreadyModule } = route.params;
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [answer, setAnswer] = useState<IAnswer>(DefaultAnswer);
  const [answers, setAnswers] = useState<Array<IAnswer>>([]);

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) rowMap[rowKey].closeRow();
  };

  const onAddAnswerPress = () => {
    navigation.navigate("AddAnswer", { questionId: questionId });
  }

  const onEditPress = (rowMap: any, answer: any) => {
    return () => {
      closeRow(rowMap, answer.item.key);
      setAnswer(answer.item);
      setShowAnswerModal(true);
    }
  }

  useEffect(() => {
    fetch(`http://localhost:3001/question/${questionId}/answers`, {
      method: "get",
      headers: { "content-type": "application/json" },
      credentials: "include"
    }).then(res => {
      res.json().then(r => setAnswers(r))
    });
  }, [isFocused]);

  const renderItem = (answer: any) => (
    <Pressable key={answer.item.key} >
      <Box marginBottom={2} width="100%" p={3} h={100} bg={answer.item.correct ? "green.400" : "red.400"} rounded="md" shadow={1}>{answer.item.answer}</Box>
    </Pressable>
  );

  const renderHiddenItem = (module: any, rowMap: any) => (
    <View style={styleSwipeList.rowBack}>
      <Button isDisabled={alreadyModule ? true : false} style={[styleSwipeList.backRightBtn, styleSwipeList.backRightBtnRight]} onPress={onEditPress(rowMap, module)} _pressed={{ opacity: 50 }}>
        <Icon name="edit" size={20} color="white" />
      </Button>
    </View >
  );

  return (
    <>
      <Center width={"100%"}>
        <VStack space={3} alignItems="center" width="100%">
          <Box mb={2} safeAreaTop={5}>
            <Text fontSize={"xs"}>({answers.length} respostas disponíveis)</Text>
          </Box>
        </VStack>
        <Stack display="flex" flexDirection="row" width="95%" marginTop={3}>
          <SwipeListView
            style={{ backgroundColor: "transparent" }}
            data={answers}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-75}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            disableRightSwipe
            closeOnScroll
            closeOnRowPress
          />
        </Stack>
        <AnswerModal
          showAnswerModal={showAnswerModal}
          setShowAnswerModal={setShowAnswerModal}
          setAnswers={setAnswers}
          answer={answer}
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
        label="Adicionar resposta"
        onPress={onAddAnswerPress}
      />
    </>
  );
};
export default Answers;
