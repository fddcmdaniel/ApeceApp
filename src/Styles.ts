import { StyleSheet } from "react-native";

export const styleSwipeList = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
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
    backgroundColor: 'green',
    right: 150,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  backRightBtnCenter: {
    backgroundColor: 'blue',
    right: 75,
    borderRadius: 0
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
});