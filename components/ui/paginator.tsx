import { View, Text, useWindowDimensions, Animated } from "react-native";
import React from "react";

interface Props {
  count: number;
  scrollX: any;
}

const Paginator = ({ count, scrollX }: Props) => {
  const { width } = useWindowDimensions();
  return (
    <View className="flex-row flex-1">
      {Array.from({ length: count })
        .map((_, item) => item)
        .map((item) => {
          const inputRange = [
            (item - 1) * width,
            item * width,
            (item + 1) * width,
          ];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 18, 8],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: "clamp",
          });

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ["white", "#846046", "white"],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              className="h-2 rounded-full bg-[#846046] mx-1"
              style={{ width: dotWidth, opacity, backgroundColor }}
              key={item.toString()}
            />
          );
        })}
    </View>
  );
};

export default Paginator;
