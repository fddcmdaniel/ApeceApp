
import React, { useContext } from 'react';
import { Actionsheet } from 'native-base';
import { ModuleContext } from './ContextInterfaces';
import { useNavigation } from '@react-navigation/native';
import { QuestionsScreenProps } from '../navigation/ScreenNavigation';


function QuestionActionSheet() {
  const navigation = useNavigation<QuestionsScreenProps>();
  const { showQuestionActionSheet, setShowQuestionActionSheet, question, setQuestion } = useContext(ModuleContext);


  const onCloseActionSheet = () => setShowQuestionActionSheet(false);

  const onEditPress = () => {
    navigation.navigate("AddQuestion", { id: String(question.id), question: question.question });
  }

  return (
    <Actionsheet isOpen={showQuestionActionSheet} onClose={onCloseActionSheet} >
      <Actionsheet.Content>
        <Actionsheet.Item onPress={onEditPress}>Editar pergunta</Actionsheet.Item>
        <Actionsheet.Item >Eliminar pergunta</Actionsheet.Item>
        <Actionsheet.Item _text={{ color: "red.400" }} onPress={onCloseActionSheet}>Cancelar</Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet >
  );
};
export default QuestionActionSheet;
