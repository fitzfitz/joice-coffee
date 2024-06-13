import { View, Text, TextInput, TextInputProps } from "react-native";
import React from "react";

type Props = {
  title: string;
  errorMessage?: string;
  otherStyles?: string;
} & TextInputProps;

const FormField = ({
  title,
  errorMessage,
  className,
  otherStyles,
  ...other
}: Props) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-xs text-white font-medium">{title}</Text>
      <View className="border-2 border-white w-full h-12 px-4 bg-white/90 rounded-2xl focus:border-secondary-brown items-center">
        <TextInput
          className={`flex-1 text-black font-light text-sm w-full ${className}`}
          {...other}
        />
      </View>
      {errorMessage && (
        <Text className="text-xs text-red-200 font-light italic">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default FormField;
