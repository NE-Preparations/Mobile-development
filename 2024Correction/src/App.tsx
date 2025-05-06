import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import AppNavigator from "./navigation/index";
import { getToken, getUser } from "./utils/auth";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      const user = await getUser();
      if (token && user) {
        navigation.navigate("Dashboard");
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <AppNavigator />;
}
