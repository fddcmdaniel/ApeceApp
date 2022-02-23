/**
 * Add module type "false"
 * Edit module type "true"
 */

import React, { useEffect, useState } from 'react';
import { Pressable, VStack, Text, Box, Input, Stack, Fab, Center, Spacer, HStack, View } from 'native-base';
import ModuleModal from './ModuleModal';
import { DefaultModule, IModule } from './ContextInterfaces';
import { useNavigation } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { ModulesScreenProps } from '../navigation/ScreenNavigation';
import { styleSwipeList } from '../Styles';
import Icon from 'react-native-vector-icons/FontAwesome';

function ModulesTest() {
  const navigation = useNavigation<ModulesScreenProps>();
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [searchModule, setSearchModule] = useState("");
  const [module, setModule] = useState<IModule>(DefaultModule);
  const [modules, setModules] = useState<Array<IModule>>([]);
  const [enable, setEnable] = useState(true);
  const [modalType, setModalType] = useState(false);

  const onSearchModule = (search: string) => setSearchModule(search);

  const onAddModulePress = () => {
    setShowModuleModal(true);
    setModalType(false);
  }

  const onModulePress = (moduleId: string) => {
    return () => {
      navigation.navigate("Questions", { moduleId: String(moduleId) });
    }
  }

  const onAddQuestionPress = (rowMap: any, module: any) => {
    return () => {
      closeRow(rowMap, module.index);
      navigation.navigate("AddQuestion", { id: module.item.id });
    }
  }

  const filteredModules = modules.filter(module => {
    return module.title.toLowerCase().indexOf(searchModule.toLowerCase()) !== -1
  })

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) rowMap[rowKey].closeRow();
  };

  const onEnablePress = (rowMap: any, module: any) => {
    return () => {
      closeRow(rowMap, module.index);
      fetch("http://localhost:3001/module/enable", {
        method: "put",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ moduleId: module.item.id, enable: module.item.enable })
      }).then(res => {
        res.json().then(r => setEnable(r))
      }).catch(err => console.log(err));
    }
  }

  const onEditPress = (rowMap: any, module: any) => {
    return () => {
      closeRow(rowMap, module.index);
      setModalType(true);
      setShowModuleModal(true);
      setModule(module.item);
    }
  }

  useEffect(() => {
    fetch("http://localhost:3001/modules/admin", {
      method: "get",
      headers: { "content-type": "application/json" },
      credentials: "include"
    }).then(res => {
      res.json().then(r => setModules(r))
    });
  }, [enable]);

  const renderItem = (module: any) => (
    <Pressable key={module.item.id} onPress={onModulePress(module.item.id)}>
      <Box marginBottom={2} width="100%" p={3} h={100} bg="primary.500" rounded="md" shadow={1}>
        <HStack alignItems={"flex-start"}>
          <Text fontWeight="medium" fontSize={20}>{module.item.title}</Text>
          <Spacer />
          <Text>{module.item.enable ? "enable" : "disable"}</Text>
        </HStack>
        <Text>{module.item.description}</Text>
        <Text>URL: {module.item.url ? "ok" : "nok"}</Text>
      </Box>
    </Pressable>
  );

  const renderHiddenItem = (module: any, rowMap: any) => (
    <View style={styleSwipeList.rowBack}>
      <Pressable style={[styleSwipeList.backRightBtn, styleSwipeList.backRightBtnLeft]} onPress={onEnablePress(rowMap, module)} _pressed={{ opacity: 50 }}>
        <Icon name={module.item.enable ? "eye-slash" : "eye"} size={20} color="white" />
      </Pressable>
      <Pressable style={[styleSwipeList.backRightBtn, styleSwipeList.backRightBtnCenter]} onPress={onAddQuestionPress(rowMap, module)} _pressed={{ opacity: 50 }}>
        <Icon name="plus-circle" size={20} color="white" />
      </Pressable>
      <Pressable style={[styleSwipeList.backRightBtn, styleSwipeList.backRightBtnRight]} onPress={onEditPress(rowMap, module)} _pressed={{ opacity: 50 }}>
        <Icon name="edit" size={20} color="white" />
      </Pressable>
    </View >
  );

  return (
    <>
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
          <SwipeListView
            style={{ backgroundColor: "transparent" }}
            data={filteredModules}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            rightOpenValue={-225}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            disableRightSwipe
            closeOnScroll
          />
        </Stack>
        <ModuleModal
          showModuleModal={showModuleModal}
          setShowModuleModal={setShowModuleModal}
          modalType={modalType}
          setModules={setModules}
          module={module}
        />
      </Center>
      <Fab
        marginBottom={3}
        borderRadius="full"
        colorScheme="emerald"
        placement="bottom-right"
        renderInPortal={false}
        icon={
          <Icon size={15} name="plus" color={"#ffffff"} />
        }
        label="Adicionar módulo"
        onPress={onAddModulePress}
      />
    </>
  );
};
export default ModulesTest;
