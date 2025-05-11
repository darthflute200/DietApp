import React from "react";
import { View , Text, Pressable } from "react-native";
import { GLOBAL_STYLES } from "../../Style";
import { useNavigation , NavigationProp } from "@react-navigation/native";
import { WelcomeStackParamList } from "../Navigation/Navigator";
const HomePage= () =>{
    const navigation = useNavigation<NavigationProp<WelcomeStackParamList>>();
    return(
        <View style={GLOBAL_STYLES.HomePageMainView}>
            <Text style={GLOBAL_STYLES.DietAppCaptionStyle}>Diet App</Text>
            <View style={GLOBAL_STYLES.SignButtonView}>
                <Pressable onPress={() =>{navigation.navigate("SignUp")}} style={[GLOBAL_STYLES.SignUpButtonStyle , GLOBAL_STYLES.SignUpButtonColor]}><Text style={GLOBAL_STYLES.SıgnButtonsText}>Sign Up</Text></Pressable>
                <Pressable onPress={() =>{navigation.navigate("SignIn")}} style={[[GLOBAL_STYLES.SignUpButtonStyle , GLOBAL_STYLES.SignInButtonColor]]}><Text style={GLOBAL_STYLES.SıgnButtonsText}>Sign In</Text></Pressable>
            </View>
        </View>
    )
}
export default HomePage;