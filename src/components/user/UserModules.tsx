import React, { useCallback, useState } from 'react';
import { ScrollView, Pressable, VStack, Text, Box, Stack, Center, Spacer, HStack } from 'native-base';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { UserModulesScreenProps } from '../../navigation/ScreenNavigation';
import { IModule } from './ContextInterfaces';

const UserModules = () => {

  const navigation = useNavigation<UserModulesScreenProps>();
  const [modules, setModules] = useState<Array<IModule>>([]);

  const onModulePress = (
    moduleId: string,
    moduleName: string,
    moduleDescription: string,
    modulesYoutubeId: string,
    alreadyDone: boolean,
    result: number) => {
    return () => {
      console.log("Done ?", alreadyDone);

      alreadyDone ?
        navigation.navigate("FinalResult", { finalResult: result, isApproved: result === 100 ? true : false }) :
        navigation.navigate("QuizIntro", {
          moduleId: String(moduleId),
          moduleName: moduleName,
          moduleDescription: moduleDescription,
          modulesYoutubeId: modulesYoutubeId
        });
    }
  }

  const colorAlert = (result: number, alreadyDone: boolean) => {
    if (alreadyDone && result === 100) return "emerald.300";
    if (alreadyDone && result !== 100) return "rose.600";
    return "info.400";
  }
  useFocusEffect(
    useCallback(() => {
      fetch("http://localhost:3001/modules", {
        method: "get",
        headers: { "content-type": "application/json" },
        credentials: "include"
      }).then(res => {
        res.json().then(r => setModules(r))
      });
    }, [])
  );

  return (
    <Center h="full" backgroundColor="emerald.50" justifyContent="flex-start" paddingTop={5}>
      <VStack alignItems="center">
        <Box mb={2}>
          <Text color="gray.600" fontSize="xs">({modules.length} módulos disponíveis)</Text>
        </Box>
      </VStack>
      <Stack w="95%" marginTop={3}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {modules.map((module: IModule, index: number) => {
            return (
              <Pressable key={index} onPress={onModulePress(module.id, module.title, module.description, module.url, module.alreadyDone, module.result)}>
                <Box borderColor={colorAlert(module.result, module.alreadyDone)} borderLeftWidth="10" marginBottom={2} p={3} h={100} bg="lightBlue.50" rounded="md" shadow={0} marginRight={1}>
                  <HStack alignItems={"flex-start"}>
                    <Text fontWeight="medium" fontSize={20} color="#56c596">{module.title}</Text>
                    <Spacer />
                    <Text fontWeight="bold" fontSize={20} color="#329d9c">#{index + 1}</Text>
                  </HStack>
                  <Text color="gray.600">{module.description}</Text>
                </Box>
              </Pressable>
            )
          })}
        </ScrollView>
      </Stack>
    </Center>
  );
};
export default UserModules;
