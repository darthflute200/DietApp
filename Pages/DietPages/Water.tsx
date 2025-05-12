import { API_URL } from "@env";
import React, { useState } from "react";
import { View , Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
import { GLOBAL_STYLES } from "../../Style";
const WaterPage = () =>{
    const [currentWater , setCurrentWater] = useState<number>(0);
    const [totalWater , setTotalWater] = useState<number>(0);
    const {user} = useAuth();


    useEffect(() => {
        const fetchWaterData = async () => {
          try {
            const response = await fetch(`${API_URL}/waterinfo/${user?.userId}`);
            const data = await response.json();
    
            setCurrentWater(data.currentWater ?? 0);
            setTotalWater(data.totalWater ?? 0);
          } catch (error) {
            console.log("Veri çekme hatası:", error);
            setCurrentWater(0);
            setTotalWater(0);
          }
        };
    
        if (user?.userId) {
          fetchWaterData();
        }
      }, []);


    const drankWaterFetch = async() =>{
          try{
            const response = await fetch(`${API_URL}/drankwater/${user?.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    currentWater: currentWater
                })
            });
            const data = await response.json();
            console.log(data)
          }
          catch(error){
            console.log(error);
          }
    }
    const totalWaterFecth = async() =>{
        try{
          const response = await fetch(`${API_URL}/totalwater/${user?.userId}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  totalWater: totalWater
              })
          });
          const data = await response.json();
          console.log(data)
        }
        catch(error){
          console.log(error);
        }
  }
    return(
        <View style={GLOBAL_STYLES.waterMainView}>
            <Text style={[GLOBAL_STYLES.DietAppCaptionStyle, {marginBottom: 30}]}>Water Follow</Text>
            <Text>Amount of water drunk: {currentWater.toString()}lt</Text>
            <Text>Total you want to drink: {totalWater.toString()}lt</Text>
            <Text>Remaining: {(totalWater - currentWater).toString()}lt</Text>
            <View style={GLOBAL_STYLES.waterInputView}>
                <TextInput style={GLOBAL_STYLES.textInput}  value={totalWater.toString()} onChangeText={(text) => setTotalWater(Number(text))} placeholder="Total you want to drink"/>
                <Pressable style={[GLOBAL_STYLES.scanButton]} onPress={totalWaterFecth}><Text style={GLOBAL_STYLES.scanButtonText}>Set Total Water</Text></Pressable>
                <TextInput style={GLOBAL_STYLES.textInput}  value={currentWater.toString()} onChangeText={(text) => setCurrentWater(Number(text))} placeholder="You drank today?"/>
                <Pressable style={[GLOBAL_STYLES.SignUpButtonStyle, GLOBAL_STYLES.SignInButtonColor]}   onPress={drankWaterFetch}><Text style={GLOBAL_STYLES.scanButtonText}>Set drank Water</Text></Pressable>
            </View>
        </View>
    )
}
export default WaterPage