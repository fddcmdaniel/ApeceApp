import React, { useEffect, useState } from 'react';
import { ScrollView, Pressable, Heading, VStack, Text, Box, Input, Stack, Fab, NativeBaseProvider, Center, Spacer, HStack } from 'native-base';
//import Icon from 'react-native-vector-icons/FontAwesome';
import ModuleModal from './ModuleModal';
import ModuleActionSheet from './ModuleActionSheet';
import { DefaultModule, DefaultQuestion, IModule, IQuestion, ModuleContext } from './ContextInterfaces';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ModulesScreenProps } from '../navigation/ScreenNavigation';

// import images
export const welcomeAssets = require("../../assets/images/welcome.png");

function Modules() {
  const navigation = useNavigation<ModulesScreenProps>();
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [showQuestionActionSheet, setShowQuestionActionSheet] = useState(false);
  const [showModuleActionSheet, setShowModuleActionSheet] = useState(false);
  const [searchModule, setSearchModule] = useState("");
  const [modules, setModules] = useState<Array<IModule>>([]);
  const [question, setQuestion] = useState<IQuestion>(DefaultQuestion);
  const [moduleId, setModuleId] = useState("");
  const [enable, setEnable] = useState(true);


  const onAddModulePress = () => setShowModuleModal(true);
  const onModulePress = (moduleId: string) => {
    return () => {
      navigation.navigate("Questions", { moduleId: String(moduleId) });
    }
  }
  const onActionSheetPress = (moduleId: string, enable: boolean) => {
    return () => {
      setModuleId(moduleId);
      setEnable(enable);
      setShowModuleActionSheet(true);
    }
  };
  const onSearchModule = (search: string) => setSearchModule(search);

  const filteredModules = modules.filter(module => {
    return module.title.toLowerCase().indexOf(searchModule.toLowerCase()) !== -1
  })


  useEffect(() => {
    fetch("http://localhost:3001/modules/admin", {
      method: "get",
      headers: { "content-type": "application/json" },
      credentials: "include"
    }).then(res => {
      res.json().then(r => setModules(r))
    });
  }, [enable]);

  return (
    <ModuleContext.Provider value={{
      moduleId,
      setModules,
      enable,
      setEnable,
      question,
      setQuestion,
      showModuleModal,
      setShowModuleModal,
      showModuleActionSheet,
      setShowModuleActionSheet,
      showQuestionActionSheet,
      setShowQuestionActionSheet
    }}>
      <Center width={"100%"}>
        <VStack space={3} alignItems="center" width="100%">
          <Box mb={2} safeAreaTop={5}>
            <Text fontSize={"xs"}>({modules.length} módulos disponíveis)</Text>
          </Box>
          <Input
            placeholder="Pesquisar módulo"
            width="95%"
            height={10}
            bg="gray.100"
            borderRadius="10"
            placeholderTextColor="gray.500"
            borderWidth="0"
            onChangeText={onSearchModule}
          />
        </VStack>
        <Stack display="flex" flexDirection="row" width="95%" marginTop={3}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredModules.map((module: any, index: number) => {
              return (
                <Pressable key={index} onLongPress={onActionSheetPress(module.id, module.enable)} onPress={onModulePress(module.id)}>
                  <Box marginBottom={2} width="100%" p={3} h={100} bg="primary.500" rounded="md" shadow={1}>
                    <HStack alignItems={"flex-start"}>
                      <Text fontWeight="medium" fontSize={20}>{module.title}</Text>
                      <Spacer />
                      <Text>{module.enable ? "enable" : "disable"}</Text>
                    </HStack>
                    <Text>{module.description}</Text>
                    <Text>URL: {module.url ? "ok" : "nok"}</Text>
                  </Box>
                  <ModuleActionSheet />
                </Pressable>
              )
            })}
          </ScrollView>
        </Stack>
      </Center>
      <Fab
        marginBottom={3}
        borderRadius="full"
        colorScheme="emerald"
        placement="bottom-right"
        renderInPortal={false}
        // icon={
        //   <Icon size={15} name="plus" color={"#ffffff"} />
        // }
        label="Adicionar módulo"
        onPress={onAddModulePress}
      />
    </ModuleContext.Provider >
  );
};
export default Modules;
