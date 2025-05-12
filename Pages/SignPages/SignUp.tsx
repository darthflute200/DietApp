import { API_URL } from '@env';
import React from "react";
import { View , Text } from "react-native";
import { GLOBAL_STYLES } from "../../Style";
import { TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useAuth } from '../Context/AuthContext';
const SıgnUp = () =>{
    const [name , SetName] = useState("");
    const [Surname , SetSurname] = useState("");
    const [Email , SetEmail] = useState("");
    const [Password , SetPassword] = useState("");
    const [PasswordRepeat , SetPasswordRepeat] = useState("");
    const [Error, SetError] = useState(false);
    const { signIn } = useAuth();
    const handleSignUp = async () => {
        if (Password !== PasswordRepeat) {
          SetError(true);
          return;
        }
    
        SetError(false);
        try {
          const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name,
              Surname,
              Email,
              Password
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
            {Error && <Text>Passwords must be same</Text>}
            <Text style={GLOBAL_STYLES.DietAppCaptionStyle}>Sıgn Up</Text>
            <View style={GLOBAL_STYLES.SignUpPageButtonView}>
                    <TextInput autoCapitalize="none" style={GLOBAL_STYLES.textInput} onChangeText={SetName} placeholder="Name?"/>
                    <TextInput autoCapitalize="none" style={GLOBAL_STYLES.textInput} onChangeText={SetSurname} placeholder="Surname?"/>
                    <TextInput autoCapitalize="none" style={GLOBAL_STYLES.textInput} onChangeText={SetEmail} placeholder="Email?"/>
                    <TextInput autoCapitalize="none" style={GLOBAL_STYLES.textInput} onChangeText={SetPassword} placeholder="Password?"/>
                    <TextInput autoCapitalize="none" style={GLOBAL_STYLES.textInput} onChangeText={SetPasswordRepeat} placeholder="Password Again?"/>
            </View>
            <Pressable onPress={handleSignUp} style={[GLOBAL_STYLES.SignUpButtonStyle,GLOBAL_STYLES.SignUpButtonColor]}><Text style={GLOBAL_STYLES.SıgnButtonsText}>Sıgn Up</Text></Pressable>
        </View>
    )
}
export default SıgnUp 
