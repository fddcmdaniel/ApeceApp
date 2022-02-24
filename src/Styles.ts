import { StyleSheet } from "react-native";

export const styleSwipeList = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginRight: 4
  },
  backRightBtn: {
    alignItems: 'center',
    height: 100,
    borderRadius: 8,
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: '#205072',
    right: 150,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  backRightBtnCenter: {
    backgroundColor: '#329d9c',
    right: 75,
    borderRadius: 0
  },
  backRightBtnCenterQuestion: {
    backgroundColor: '#329d9c',
    right: 75,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  backRightBtnRight: {
    backgroundColor: '#38bdf8',
    right: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  backRightBtnRightAnswer: {
    backgroundColor: '#38bdf8',
    right: 0
  }
});