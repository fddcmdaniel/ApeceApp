
import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, Text, TextArea } from 'native-base';
import { QuestionModalProps, IQuestion, DefaultQuestion } from './ContextInterfaces';


function QuestionModal(props: QuestionModalProps) {
  const { showQuestionModal, setShowQuestionModal, question, setQuestions } = props;
  const [editQuestion, setEditQuestion] = useState<IQuestion>(question);

  const onInputChangeQuestion = (question: string) => setEditQuestion({ ...editQuestion, question: question });

  useEffect(() => {
    setEditQuestion({ ...question });
  }, [question]);

  const onCloseModal = () => {
    setEditQuestion(DefaultQuestion);
    setShowQuestionModal(false);
  }

  const onSavePress = () => {
    fetch("http://localhost:3001/question", {
      method: "put",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ question: editQuestion })
    }).then(res => {
      res.json().then(r => setQuestions(r))
    }),
      setShowQuestionModal(false);
  }

  return (
    <Modal isOpen={showQuestionModal} onClose={onCloseModal} animationPreset="slide" size="full" avoidKeyboard>
      <Modal.Content maxH="500" marginBottom={0} marginTop="auto">
        <Modal.CloseButton _icon={{ color: "#585858", size: "xs" }} />
        <Modal.Header borderColor="white">{""}</Modal.Header>
        <Modal.Body>
          <Box mt="3">
            <Text>Pergunta</Text>
            <TextArea variant="underlined" value={editQuestion.question} onChangeText={onInputChangeQuestion} />
          </Box>
        </Modal.Body>
        <Modal.Footer pb="10">
          <Button size="lg" w="100%" variant="subtle" colorScheme="teal" onPress={onSavePress}>Editar</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
export default QuestionModal;
