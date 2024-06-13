import { Alert, Button, ScrollView, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppContext } from "@/providers/app/context";
import { Avatar, Searchbar } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { AppwriteUser } from "@/lib/types/auth";
import greetings from "@/lib/greeting";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function HomeScreen() {
  const { user } = useAppContext();
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <SafeAreaView className="flex-1 bg-white p-10">
      <ScrollView className="space-y-4">
        <Header user={user} />
        <Text className="text-xl font-bold">
          {greetings()}, {user?.fullName}.
        </Text>
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
        {/* <View>
          <Button
            onPress={() => Alert.alert("Success", JSON.stringify(user))}
            title="Test"
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

function Header({ user }: { user: AppwriteUser | null }) {
  const { navigate } = useRouter();
  return (
    <View className="flex-row items-center space-x-2">
      <View className="flex-1 flex-row items-center space-x-2">
        <Avatar.Image size={40} source={{ uri: user?.avatar }} />
        <View className="flex-row items-center space-x-1">
          <FontAwesome
            name="map-marker"
            size={16}
            color={Colors.secondary.brown}
          />
          <Text className="text-sm font-bold text-secondary-brown">Home</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigate("notification")}>
        <FontAwesome name="bell-o" size={20} />
      </TouchableOpacity>
    </View>
  );
}
