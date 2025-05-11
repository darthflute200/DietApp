import React, { useState } from "react";
import { View , Text, TextInput, Pressable } from "react-native";
const WaterPage = () =>{
    const [currentWater , setCurrentWater] = useState<number>(0);
    const [totalWater , setTotalWater] = useState<number>(0);
    return(
        <View>
            <Text>Water Follow</Text>
            <Text>Amount of water drunk: {currentWater}lt</Text>
            <Text>Total you want to drink: {totalWater}lt</Text>
            <Text>Remaining: {totalWater - currentWater}lt</Text>
            <View>
                <TextInput placeholder="Total you want to drink"/>
                <Pressable><Text>Set Total Water</Text></Pressable>
                <TextInput placeholder="You drank today?"/>
                <Pressable><Text>Set drank Water</Text></Pressable>
            </View>
        </View>
    )
}
export default WaterPage