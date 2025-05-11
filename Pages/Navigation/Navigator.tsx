import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SıgnIn from "../SignPages/SignIn";
import SıgnUp from "../SignPages/SignUp";
import HomePage from "../SignPages/HomePage";
import DietHomePage from "../DietPages/DietHomePage";
import Profile from "../DietPages/Profile";
import WaterPage from "../DietPages/Water";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export type WelcomeStackParamList = {
    HomePage: undefined;
    SignIn: undefined;
    SignUp: undefined;
};
export const DietPageNavigator = () =>{
  return(
    <Tab.Navigator initialRouteName="DietHomePage" screenOptions={{headerShown: false , tabBarIcon: () => null}}>
      <Tab.Screen name="DietHomePage"           
      options={{
        tabBarLabel:"Home"
          }} component={DietHomePage} />
     <Tab.Screen name="water" component={WaterPage}/>
      <Tab.Screen name="Profile"   options={{ tabBarLabel: "Profile"
          }} component={Profile} />
    </Tab.Navigator>
  )
}
export const WelcomeNavigator = () =>{
    return(
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="SignIn" options={{ headerShown: true , headerTitle: "Sıgn In" }} component={SıgnIn} />
          <Stack.Screen name="SignUp" options={{ headerShown: true , headerTitle: "Sıgn Up" }} component={SıgnUp} />
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomePage} />
        </Stack.Navigator>
    )
}
