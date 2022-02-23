
import React, { useEffect, useState } from 'react';
import { Button, Modal, Box, Text, TextArea, Checkbox } from 'native-base';
import { IQuestion, DefaultQuestion, AnswerModalProps, IAnswer, DefaultAnswer } from './ContextInterfaces';


function AnswerModal(props: AnswerModalProps) {
  const { showAnswerModal, setShowAnswerModal, answer, setAnswers } = props;
  const [editAnswer, setEditAnswer] = useState<IAnswer>(answer);
  const [isSelected, setSelection] = useState(false);
  const onInputChangeAnswer = (answer: string) => setEditAnswer({ ...editAnswer, answer: answer });
  useEffect(() => setEditAnswer({ ...editAnswer, correct: isSelected }), [isSelected]);


  const onCloseModal = () => {
    setShowAnswerModal(false);
    setSelection(false);
  }

  useEffect(() => {
    setEditAnswer({ ...answer });
    setSelection(false);
  }, [answer]);

  const onSavePress = () => {
    fetch("http://localhost:3001/answer", {
      method: "put",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ answer: editAnswer })
    }).then(res => {
      res.json().then(r => setAnswers(r))
    }),
      setShowAnswerModal(false);
    setSelection(false);
  }

  console.log("sel", isSelected);


  return (
    <Modal isOpen={showAnswerModal} onClose={onCloseModal} animationPreset="slide" size="full" avoidKeyboard>
      <Modal.Content maxH="500" marginBottom={0} marginTop="auto">
        <Modal.CloseButton _icon={{ color: "#585858", size: "xs" }} />
        <Modal.Header mt={2} borderColor="white" flexDirection="row">Editar resposta #{editAnswer.id}</Modal.Header>
        <Modal.Body>
          <Box mt="3">
            <Text>Resposta</Text>
            <TextArea variant="underlined" value={editAnswer.answer} onChangeText={onInputChangeAnswer} />
            <Checkbox rounded={"full"} size={"md"} mt={4} mb={2} value={String(isSelected)} style={answer.correct ? { display: "none" } : { display: "flex" }} onChange={setSelection} colorScheme="teal">
              <Text ml={2} style={answer.correct ? { display: "none" } : { display: "flex" }}>Resposta correta ?</Text>
            </Checkbox>
          </Box>
        </Modal.Body>
        <Modal.Footer pb="10">
          <Button size="lg" w="100%" variant="subtle" colorScheme="teal" onPress={onSavePress}>Editar</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
export default AnswerModal;
