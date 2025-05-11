import { API_URL } from '@env';
import React, { useEffect, useState } from "react";
import { ScrollView, Text, Pressable, View, TouchableOpacity , RefreshControl} from "react-native";
import { GLOBAL_STYLES } from "../../Style";
import { Camera, CameraType } from "react-native-camera-kit";
import { TextInput } from "react-native";
import { useAuth } from "../Context/AuthContext";
type Product = {
  name: string;
  energy: string;
  brand: string
};
const DietHomePage = () => {
  const {user} = useAuth();
  const [camera, setCamera] = useState(false);
  const [manualBarcode, setManualBarcode] = useState("");
  const [showProduct , SetShowProduct] = useState(false);
  const [AllProducts , SetAllProducts] = useState<Product[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [productInfo, setProductInfo] = useState({
    name: "",
    energy: "",
    brand:"",
    fat: "",
    protein: "",
    sugar: "",
    fiber: "",
    carbohydrates: "" 
  });


  function getCurrentDate() {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    return `${day}.${month}.${year}`;
  }

    const totalCalories = AllProducts.reduce((total, product) => {
      return total + (parseInt(product.energy) || 0); 
    }, 0);



  const cancel = () => {
    SetShowProduct(false); 
    setProductInfo({
      name: "",
      brand: "",
      energy: "",
      fat: "",
      protein: "",
      sugar: "",
      fiber: "",
      carbohydrates: ""
    });
  };



  const GetFoods = async() =>{
    try{
      const response = await fetch(`${API_URL}/getfood/${user?.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
      },
      });
      const data = await response.json();
      SetAllProducts(data.Foods);
    }
    catch(error){
      console.log(error);
    }
  }



  const handleSaveFood= async () => {
    try {
      const response = await fetch(`${API_URL}/savefood/${user?.userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: productInfo.name,
        brand: productInfo.brand,
        energy: productInfo.energy
        })
      });
          
      const data = await response.json();
      if(data.message === "Başarılı"){
        SetShowProduct(false);
        GetFoods();
      }
      } catch (err) {
        console.error(err);
      }
    };


    const handleDelete = async(index: number) => {
      try{
        const response = await fetch(`${API_URL}/deletefood/${user?.userId}/${index}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if(data.message === "Başarılı"){
          const updatedProducts = AllProducts.filter((_, i) => i !== index); 
          SetAllProducts(updatedProducts);
        }
      }
      catch(error){
        console.log(error);
      }
    };

  const submitBarcode = async(barcode : string) =>{
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`, {
        method: "GET", 
      });
      const data = await response.json();
      const product = data?.product;
      console.log(product)
      setProductInfo({
        name: product?.product_name || "No Info",
        energy: product?.nutriments?.["energy-kcal_100g"] || "No Info",
        fat: product?.nutriments?.["fat_100g"] || "No Info",
        brand: product?.brands || "No Info",
        protein: product?.nutriments?.["proteins_100g"] || "No Info",
        sugar: product?.nutriments?.["sugars_100g"] || "No Info",
        fiber: product?.nutriments?.["fiber_100g"] || "No Info",
        carbohydrates: product?.nutriments?.["carbohydrates_100g"] || "No Info",
      });
      setCamera(false);
      SetShowProduct(true);
    } catch (error) {
      console.error("API isteği başarısız:", error);
    }
  }
  useEffect(() =>{GetFoods()},[])
  if (camera) {
    return (
      <View style={{ flex: 1 }}>
        <Camera
          cameraType={CameraType.Back}
          style={{ flex: 1 }}
          scanBarcode={true}
          onReadCode={(e) =>{submitBarcode(e.nativeEvent.codeStringValue)}}
        />
        <Pressable
          onPress={() => setCamera(false)}
          style={{ position: "absolute", top: 40, right: 20 }}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Cancel</Text>
        </Pressable>
      </View>
    );
  }
  if(showProduct){
    return(
    <View style={GLOBAL_STYLES.ProductInfoPageView}>
      <View>
        <Text>{productInfo.brand} {productInfo.name}</Text>
        <Text>Calories: {productInfo.energy}</Text>
        <Text>Carbohydrates: {productInfo.carbohydrates}</Text>
        <Text>Fat: {productInfo.fat}</Text>
        <Text>Protein: {productInfo.protein}</Text>
        <Text>Fiber: {productInfo.fiber}</Text>
        <Text>Sugar: {productInfo.sugar}</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
          <Pressable  onPress={handleSaveFood} style={{ padding: 10, backgroundColor: "green", borderRadius: 5 }}>
            <Text style={{ color: "white" }}>Save</Text>
          </Pressable>
          <Pressable onPress={cancel} style={{ padding: 10, backgroundColor: "red", borderRadius: 5 }}>
            <Text style={{ color: "white" }}>Cancel</Text>
          </Pressable>
        </View>
    </View>
    )
  }

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await GetFoods(); 
    setIsRefreshing(false);
  };

  return (
    <ScrollView contentContainerStyle={GLOBAL_STYLES.DietScrollView}       refreshControl={
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    }>
      <View style={GLOBAL_STYLES.DietHomepageNameContainer}>
        <Text style={GLOBAL_STYLES.DietAppCaptionStyle}>Welcome {user?.name}!</Text>
        <Text style={GLOBAL_STYLES.DateTextStyle}>{getCurrentDate()}</Text>
      </View>
      <View style={{marginBottom: 30 , marginTop: 30, gap: 10}}>
        {AllProducts.map((product, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text>Brand: {product.brand}</Text>
            <Text >Name: {product.name}</Text>
            <Text>Calories: {product.energy}</Text>
            <TouchableOpacity onPress={() => handleDelete(index)}>
            <Text style={{ color: 'red' }}>Delete</Text>
          </TouchableOpacity>
          </View>
        ))}
       <Text>Total Calories: {totalCalories}</Text>
      </View>
      <Pressable style={GLOBAL_STYLES.scanButton} onPress={() => setCamera(true)}>
        <Text style={GLOBAL_STYLES.scanButtonText}>Scan</Text>
      </Pressable>
      <Text>or</Text>
      <TextInput onChangeText={setManualBarcode} placeholder="Barcode Code?"/>
      <Pressable onPress={() =>{submitBarcode(manualBarcode)}} style={GLOBAL_STYLES.submitBarcodeButton}><Text style={GLOBAL_STYLES.submitBarcodeButtonText}>Send Code</Text></Pressable>
    </ScrollView>
  );
};

export default DietHomePage;

