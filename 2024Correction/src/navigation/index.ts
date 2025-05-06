import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LandingScreen from "../screens/LandingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DashboardScreen from "../screens/DashboardScreen";
import BookListScreen from "../screens/BookListScreen";
import BookDetailsScreen from "../screens/BookDetailsScreen";
import BookFormScreen from "../screens/BookFormScreen";
import BorrowingHistoryScreen from "../screens/BorrowingHistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";

// Define param lists for all navigators
export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  Main: undefined;
  BookDetails: undefined;
  BookForm: undefined;
};

export type BooksStackParamList = {
  BookList: undefined;
  BookDetails: undefined;
  BookForm: undefined;
};

export type MainTabParamList = {
  Books: undefined;
  History: undefined;
  Profile: undefined;
};

// Create navigators with typed param lists
const RootStack = createStackNavigator<RootStackParamList>();
const BooksStack = createStackNavigator<BooksStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>(); // Use Tabs, not Tab

// BooksStack navigator (example)
const BooksStackNavigator = () => (
  <BooksStack.Navigator>
    <BooksStack.Screen name="BookList" component={BookListScreen} />
    <BooksStack.Screen name="BookDetails" component={BookDetailsScreen} />
    <BooksStack.Screen name="BookForm" component={BookFormScreen} />
  </BooksStack.Navigator>
);

// MainTabs navigator (already in your code, renamed Tab to Tabs)
const MainTabs = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Books" component={BooksStackNavigator} /> {/* Use BooksStack here */}
    <Tabs.Screen name="History" component={BorrowingHistoryScreen} />
    <Tabs.Screen name="Profile" component={ProfileScreen} />
  </Tabs.Navigator>
);

// RootStack navigator (replaces Stack in your code)
const AppNavigator = () => (
  <NavigationContainer>
    <RootStack.Navigator initialRouteName="Landing">
      <RootStack.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Register" component={RegisterScreen} />
      <RootStack.Screen name="Dashboard" component={DashboardScreen} />
      <RootStack.Screen
        name="Main"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="BookDetails" component={BookDetailsScreen} />
      <RootStack.Screen name="BookForm" component={BookFormScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;