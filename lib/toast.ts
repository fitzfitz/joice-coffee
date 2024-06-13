import Toast from "react-native-toast-message";

const toast = {
  success: (message: string) => {
    Toast.show({
      type: "success",
      text1: message ?? "Succes!",
      swipeable: true,
    });
  },
  error: (message: string) => {
    Toast.show({
      type: "error",
      text1: message ?? "Error!",
      swipeable: true,
    });
  },
};

export default toast;
