import { API_URL } from '@env';
import React from "react";
import { View , Text, TextInput , Pressable } from "react-native";
import { GLOBAL_STYLES } from "../../Style";
import { useAuth } from "../Context/AuthContext";
import { useState } from 'react';
const SıgnIn = () =>{
        const { signIn } = useAuth();
        const [email , SetEmail] = useState("");
        const [password , SetPassword] = useState("");
        const handleSignIn = async () => {
            try {
              const response = await fetch(`${API_URL}/signin`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email,
                  password
                })
              });
        
              const data = await response.json();
              if(data.user){
                await signIn(data.user);
                console.log("Kullanıcı Oluşturuldu")
              }
            } catch (err) {
              console.error(err);
            }
          };
    return(
        <View style={GLOBAL_STYLES.HomePageMainView}>
            <Text style={GLOBAL_STYLES.DietAppCaptionStyle}>Sıgn In</Text>
            <View style={GLOBAL_STYLES.SignButtonView}>
                <TextInput onChangeText={SetEmail} style={GLOBAL_STYLES.textInput}  placeholder="Email?"/>
                <TextInput onChangeText={SetPassword} style={GLOBAL_STYLES.textInput} placeholder="Password?"/>
            </View>
            <Pressable onPress={handleSignIn} style={[GLOBAL_STYLES.SignUpButtonStyle,GLOBAL_STYLES.SignInButtonColor]}><Text style={GLOBAL_STYLES.SıgnButtonsText}>Sıgn In</Text></Pressable>
        </View>
    )
}
export default SıgnIn