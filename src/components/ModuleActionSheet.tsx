
import React, { useContext, useState } from 'react';
import { Actionsheet } from 'native-base';
import { ModuleContext } from './ContextInterfaces';
import { useNavigation } from '@react-navigation/native';
import { ModulesScreenProps } from '../navigation/ScreenNavigation';


function ModuleActionSheet() {
  const navigation = useNavigation<ModulesScreenProps>();
  const { showModuleActionSheet, setShowModuleActionSheet, moduleId, enable, setEnable } = useContext(ModuleContext);


  const onCloseActionSheet = () => setShowModuleActionSheet(false);


  const onEnablePress = () => {
    fetch("http://localhost:3001/module/enable", {
      method: "put",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        moduleId: moduleId,
        enable: enable
      })
    }).then(res => {
      res.json().then(r => {
        setEnable(r);
      })
    }).catch(err => {
      console.log(err);
    });
    setShowModuleActionSheet(false);
  }

  return (
    <Actionsheet isOpen={showModuleActionSheet} onClose={onCloseActionSheet} >
      <Actionsheet.Content>
        <Actionsheet.Item onPress={onEnablePress}>{enable ? "Desativar módulo" : "Ativar módulo"}</Actionsheet.Item>
        <Actionsheet.Item _text={{ color: "red.400" }} onPress={onCloseActionSheet}>Cancelar</Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet >
  );
};
export default ModuleActionSheet;
