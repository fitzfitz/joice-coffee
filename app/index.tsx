import {
  View,
  Text,
  FlatList,
  Animated,
  ViewabilityConfig,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import { onboardingData } from "@/constants/dummy";
import OnboardingItem from "@/components/ui/onboarding-item";
import Paginator from "@/components/ui/paginator";
import { Link, Redirect, useNavigation, useRouter } from "expo-router";
import { useAppContext } from "@/providers/app/context";
// import { Link } from "expo-router";

const Onboarding = () => {
  const { setIsFirstLaunched, isLoading, isLoggedIn } = useAppContext();
  const { replace } = useRouter();
  const scrollX = useRef(new Animated.Value(12)).current;
  const slideRef = useRef(null);

  const [currentPage, setCurrentPage] = useState<number>(0);

  const viewConfig = useRef<ViewabilityConfig>({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  if (isLoading) {
    return (
      <View className="flex-1 justify-center bg-secondary-brown items-center">
        <ActivityIndicator size={40} color={"#FFF"} />
      </View>
    );
  } else if (!isLoading && isLoggedIn) return <Redirect href={"/home"} />;

  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-[3]">
        <FlatList
          data={onboardingData}
          renderItem={({ item }) => <OnboardingItem {...item} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={(info) => {
            setCurrentPage(info.viewableItems[0].index || 0);
          }}
          viewabilityConfig={viewConfig}
          ref={slideRef}
        />
      </View>
      <View className="absolute bottom-10 w-full items-center px-5 gap-5">
        <Paginator count={3} scrollX={scrollX} />
        <View className="h-20 w-full">
          {currentPage === 2 && (
            <TouchableOpacity
              onPress={() => {
                setIsFirstLaunched(true);
                replace("sign-in");
              }}
              className="bg-secondary-brown p-3 rounded-full"
            >
              <Text className="text-white text-center">Get Started</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Onboarding;
