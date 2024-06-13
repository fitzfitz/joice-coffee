import {
  View,
  Text,
  useWindowDimensions,
  ImageSourcePropType,
  ImageBackground,
} from "react-native";
import React from "react";
import { onboardingData } from "@/constants/dummy";

export interface OnboardingItemProps {
  id: string;
  title: string;
  content: string;
  bgImage: ImageSourcePropType;
}

const OnboardingItem = ({
  id,
  title,
  content,
  bgImage,
}: (typeof onboardingData)["0"]) => {
  const { width, height } = useWindowDimensions();
  return (
    <View className="flex-1 items-center justify-center">
      <ImageBackground
        source={bgImage}
        className="w-screen h-full flex-1 justify-center items-center"
        resizeMode="cover"
      >
        <View className="flex-1" />
        <Text className="text-white text-5xl">JOICE</Text>
        <View className="flex-1" />
        <View className="py-3 px-10 gap-4">
          <Text className="text-white text-center font-bold text-3xl">
            {title}
          </Text>
          <Text className="text-white text-center">{content}</Text>
        </View>
        <View className="flex-1" />
      </ImageBackground>
    </View>
  );
};

export default OnboardingItem;
