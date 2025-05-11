import { StyleSheet } from "react-native";
export const GLOBAL_STYLES = StyleSheet.create({
    HomePageMainView:{
        width:"100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 100
    },
    DietAppCaptionStyle:{
        fontSize: 30,
        fontWeight:"700"
    },
    SignButtonView:{
        width:"100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 40
    },
    SignUpButtonStyle:{
        width:"50%",
        height: 50,  
        borderRadius: 15,
        justifyContent: "center",
        alignItems:"center"  
    },
    SignUpButtonColor:{
        backgroundColor:"#4CAF50",

    },
    SignInButtonColor:{
        backgroundColor:"#1E88E5",
    },
    SıgnButtonsText:{
        color:"white"
    },
    textInput: {
        width: '50%',  
        height: 40,    
        borderColor: '#ccc', 
        borderWidth: 1, 
        borderRadius: 5, 
        paddingLeft: 10,  
        marginVertical: 10, 
    },
    SignUpPageButtonView:{
        width:"100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 20
    },
    DietScrollView:{
        width:"100%",
        minHeight:"100%",
        flexDirection:"column",
        alignItems:"center",
        paddingTop:40
    },
    DateTextStyle:{
        color:"grey",
    },
    scanButton: {
        backgroundColor: "#4CAF50",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
      },
      scanButtonText: {
        color: "white",
        fontSize: 16,
    },
    DietHomepageNameContainer:{
        width:"100%",
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingLeft:20,
        paddingRight:20
    },
    submitBarcodeButton: {
        backgroundColor: "#4DA8DA",
        padding: 12,
        borderRadius: 8,
        width: "80%",
        alignItems: "center",
      },
      submitBarcodeButtonText: {
        color: "white",
        fontSize: 16,
      },
      ProductInfoPageView:{
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        height:"100%"
      }
})