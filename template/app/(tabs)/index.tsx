import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LandingPage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        <Image
          source={require("../../assets/icons.png")}
          className="w-40 h-40 mb-8"
        />
        <Text className="text-3xl font-bold text-center mb-4 text-gray-800">
          Welcome to Products App
        </Text>
        <Text className="text-base text-center mb-8 text-gray-600">
          Discover amazing products and create your own listings
        </Text>
        <TouchableOpacity
          className="bg-primary py-4 px-12 rounded-full"
          onPress={() => router.replace("/home")}
        >
          <Text className="text-white font-bold text-lg">Start</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
