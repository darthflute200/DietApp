import React from "react";
import { View, Text , Pressable } from "react-native";
import { GLOBAL_STYLES } from "../../Style";
import { useAuth } from "../Context/AuthContext";
const Profile = () =>{
    const {user , signOut} = useAuth();
    return(
        <View style={[GLOBAL_STYLES.ProductInfoPageView , {gap: 30}]}>
            <Text style={GLOBAL_STYLES.DietAppCaptionStyle}>{user?.name} {user?.surname}</Text>
            <Pressable onPress={signOut}  style={{ padding: 10, backgroundColor: "red", borderRadius: 5 }}>
                <Text style={{ color: "white" }}>Sıgn Out</Text>
            </Pressable>
        </View>
    )
}
export default Profile