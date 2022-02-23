
import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Box, Text, TextArea } from 'native-base';
import { IModule, DefaultModule, ModuleModalProps } from './ContextInterfaces';


function ModuleModal(props: ModuleModalProps) {
  const { showModuleModal, setShowModuleModal, modalType, module, setModules } = props;
  const [editModule, setEditModule] = useState<IModule>(module);

  const onInputChangeTitle = (title: string) => setEditModule({ ...editModule, title: title });
  const onInputChangeDescription = (description: string) => setEditModule({ ...editModule, description: description });
  const onInputChangeURL = (url: string) => setEditModule({ ...editModule, url: url });

  useEffect(() => {
    setEditModule({ ...module, url: "www.youtube.com/watch?v=" + module.url });
    if (!modalType) setEditModule(DefaultModule);
  }, [modalType, module]);

  const onCloseModal = () => {
    modalType ? setEditModule(module) : setEditModule(DefaultModule);

    setShowModuleModal(false);
  }

  console.log("Module", module);

  const onSavePress = () => {
    const method = modalType ? "put" : "post";
    fetch("http://localhost:3001/module", {
      method: method,
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ module: editModule })
    }).then(res => {
      res.json().then(r => setModules(r))
    }),
      setShowModuleModal(false);
  }

  return (
    <Modal isOpen={showModuleModal} onClose={onCloseModal} animationPreset="slide" size="full" avoidKeyboard>
      <Modal.Content maxH="500" marginBottom={0} marginTop="auto">
        <Modal.CloseButton _icon={{ color: "#585858", size: "xs" }} />
        <Modal.Header borderColor="white">{""}</Modal.Header>
        <Modal.Body>
          <Box>
            <Text>Título</Text>
            <Input variant="underlined" value={editModule.title} onChangeText={onInputChangeTitle} />
          </Box>
          <Box mt="3">
            <Text>Descrição</Text>
            <TextArea variant="underlined" value={editModule.description} onChangeText={onInputChangeDescription} />
          </Box>
          <Box mt="3">
            <Text>URL do vídeo de apresentação</Text>
            <Input variant="underlined" value={editModule.url} onChangeText={onInputChangeURL} />
          </Box>
        </Modal.Body>
        <Modal.Footer pb="10">
          <Button size="lg" w="100%" variant="subtle" colorScheme="teal" onPress={onSavePress}>{modalType ? "Editar" : "Adicionar"}</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
export default ModuleModal;
