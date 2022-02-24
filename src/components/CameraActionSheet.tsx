
import React, { useEffect, useState } from 'react';
import { Actionsheet, Box, Text } from 'native-base';
import { CameraActionSheetProps } from './ContextInterfaces';
import { useNavigation } from '@react-navigation/native';
import { ModulesScreenProps } from '../navigation/ScreenNavigation';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';


function CameraActionSheet(props: CameraActionSheetProps) {
  const navigation = useNavigation<ModulesScreenProps>();
  const { setShowCameraActionSheet, showCameraActionSheet, setQuestion, setAnswer, answer, actionType, setLoading } = props;
  const [path, setPath] = useState("");

  const onCloseActionSheet = () => setShowCameraActionSheet(false);
  const onTakePhotoPress = () => {
    console.log("take a photo");
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: false,
    }).then(image => {
      console.log(image);
    });

  }

  const onChoosePhotoLibraryPress = async () => {
    await ImagePicker.openPicker({
      width: 600,
      height: 600,
      cropping: false,
      compressImageQuality: 1
    }).then(image => {
      setPath(image.path);
      setShowCameraActionSheet(false);
      setLoading(true);
    });
  }

  useEffect(() => {
    if (path !== "") {
      const imageToText = async () => {
        await fetch("http://localhost:3001/convert", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ path: path })
        }).then(res => {
          res.json().then(r => {
            if (actionType) {
              if (setQuestion) setQuestion(r.replace(/\n/g, " ").replace(/\s\s+/g, " ").replace(/\n/g, " "));
            } else {
              if (setAnswer && answer) setAnswer({
                ...answer, answer: r.replace(/\n/g, " ").replace(/\s\s+/g, " ").replace(/\n/g, " ")
              });
            }

          })
        }).catch(err => {
          console.log(err);
        });
        setLoading(false);
      }
      imageToText();
    }
  }, [path]);

  console.log("pa", path);


  return (
    <Actionsheet isOpen={showCameraActionSheet} onClose={onCloseActionSheet} >
      <Actionsheet.Content>
        <Box my={5} alignItems="center">
          <Text fontSize="xl" color="gray.600" bold>Carregar fotografia</Text>
          <Text fontSize="10" color="gray.400">Escolher fotografia para converter para texto</Text>
        </Box>
        <Actionsheet.Item _text={{ color: "gray.600" }} startIcon={<Icon name="camera" size={18} color="#52525b" />} onPress={onTakePhotoPress}>Tirar fotografia</Actionsheet.Item>
        <Actionsheet.Item _text={{ color: "gray.600" }} startIcon={<Icon name="photo" size={18} color="#52525b" />} onPress={onChoosePhotoLibraryPress}>Escolher fotografia da biblioteca</Actionsheet.Item>
        <Actionsheet.Item _text={{ color: "red.400" }} startIcon={<Icon name="times" size={18} color="#f87171" />} onPress={onCloseActionSheet}>Cancelar</Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet >
  );
};
export default CameraActionSheet;
