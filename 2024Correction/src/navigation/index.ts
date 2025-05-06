import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabsNavigator } from "@react-navigation/bottom-tabs";
import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DashboardScreen from "../screens/DashboardScreen";
import BookListScreen from "../screens/BookListScreen";
import BookDetailsScreen from "../screens/BookDetailsScreen";
import BookFormScreen from "../screens/BookFormScreen";
import BorrowingHistoryScreen from "../screens/BorrowingHistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();
const Tabs = createBottomTabsNavigator();

const MainTabs = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Books" component={BookListScreen} />
    <Tabs.Screen name="History" component={BorrowingHistoryScreen} />
    <Tabs.Screen name="Profile" component={ProfileScreen} />
  </Tabs.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Landing">
    <Stack.Screen
      name="Landing"
      component={LandingScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
    <Stack.Screen
      name="Main"
      component={MainTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
    <Stack.Screen name="BookForm" component={BookFormScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
