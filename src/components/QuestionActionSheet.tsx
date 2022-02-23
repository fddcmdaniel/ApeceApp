
import React, { useContext, useState } from 'react';
import { Actionsheet } from 'native-base';
import { ModuleContext } from './ContextInterfaces';
import { useNavigation } from '@react-navigation/native';
import { ModulesScreenProps, QuestionsScreenProps } from '../navigation/ScreenNavigation';


function QuestionActionSheet() {
  const navigation = useNavigation<QuestionsScreenProps>();
  const { showQuestionActionSheet, setShowQuestionActionSheet, question, setQuestion } = useContext(ModuleContext);


  const onCloseActionSheet = () => setShowQuestionActionSheet(false);

  const onEditPress = () => {
    navigation.navigate("AddQuestion", { id: String(question.id), question: question.question });
  }


  // const onEnablePress = () => {
  //   fetch("http://localhost:3001/module/enable", {
  //     method: "put",
  //     headers: {
  //       "content-type": "application/json"
  //     },
  //     credentials: "include",
  //     body: JSON.stringify({
  //       moduleId: moduleId,
  //       enable: enable
  //     })
  //   }).then(res => {
  //     res.json().then(r => {
  //       setEnable(r);
  //     })
  //   }).catch(err => {
  //     console.log(err);
  //   });
  //   setShowModuleActionSheet(false);
  // }

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
