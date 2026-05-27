import { useAuth } from "@clerk/expo";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-1 items-center justify-center">
          <Text>Profile Screen</Text>
          <TouchableOpacity className="bg-primary p-2 rounded-md" onPress={handleSignOut}>
            <Text className="text-white">Sign Out</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}
