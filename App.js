import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState } from 'react';
import { FlatList,SafeAreaView, StyleSheet, Image,Text, View, TouchableOpacity, Modal } from 'react-native';
import IngredientList from './components/IngredientList';
import { fetchAllMeals, fetchFourMeals, fetchOneMeal, splitIngrediants } from './Api';
import RefreshButton from './components/RefreshButton';

export default function App() {
  const [meals, setMeals] = useState([]);
  const [nextFour, setNextFour] = useState([]);
  const [meal, setMeal] = useState("");
  const [ingredients, setIngredients] = useState(""); 
  const [currentOffset, setcurrentOffset] = useState(0);
  const [imgPerPAge, setImgPerPAge] = useState(4);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchFour = async ()=>{
    const fourMeals = await fetchFourMeals(currentOffset)
    setNextFour(fourMeals)
    if (currentOffset > meals.length-imgPerPAge) {
      setcurrentOffset(0)
    }else{
      setcurrentOffset(currentOffset+4)
    }
  }
  
  const fetchOne = async (id)=>{
    const oneMeal = await fetchOneMeal(id)
    setMeal(oneMeal)
  }

  const fetchAll = async ()=>{
    const allMeals = await fetchAllMeals()
    setMeals(allMeals)
  }
  useEffect(() => {
    fetchAll()
    fetchFour()
  }, [])

  useEffect(() => {
    const ingrediantsArray = splitIngrediants(meal)
    setIngredients(ingrediantsArray)
  }, [meal])
  
  const renderMeal =({item})=>{
    return(
    <TouchableOpacity style={styles.imgContainer}
      key={item.id}
      onPress={ () => {
        fetchOne(item.id)
        setModalVisible(!modalVisible)}} 
    >
      <Image source={{uri:item.picture, width:"100%" ,height:150 }}/>
      <View style={{justifyContent:"center", }}>
      <Text numberOfLines={1}>{item.title}</Text>
      </View>
    </TouchableOpacity>)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
        <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.closeTextStyle}>✖️</Text>
        </TouchableOpacity>
        <View >
          <View style={styles.modalView}>
          <Image  
            style={styles.imageStyle} 
            source={{uri: meal.picture }}
          />
          </View>
          <Text style={styles.modalText}>{meal.title}</Text>
          <Text style={styles.textStyle}>{meal.description}</Text>
        </View>
        <Text style={styles.modalText}>Ingredients</Text>
        <IngredientList
          ingredients={ingredients}
        />
        </View>
      </Modal>
      <View style={styles.upperContainer}>
        <View style={styles.flatListContainer}>
        <FlatList
        contentContainerStyle={styles.contentContainer}
        numColumns={2}
        data={nextFour}
        renderItem={renderMeal}
        />
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <RefreshButton onPress={fetchFour}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer:{
    flex: 5,
    paddingHorizontal:"5%",
    backgroundColor:"#2BBCC0",
    justifyContent:"center",
  },
  lowerContainer:{
    flex: 2,
    backgroundColor:"#2BBCC0",
    justifyContent:"center",
    alignItems:"center"
  },
  imgContainer:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    marginHorizontal:10
  },
  flatListContainer:{
    flex:1,
  },
  contentContainer:{
    flex:1,
    justifyContent:"space-evenly",
  },
  button:{
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    backgroundColor:'#fff',
    borderRadius:50,
  },
  modalView: {
    margin: 5,
    backgroundColor:"#2BBCC0",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5
  },
  modalText:{
    fontSize:18,
    fontWeight:"800",
    textAlign:"left"
  },
  modalContainer:{
    flex:1,
    paddingHorizontal:10,
    backgroundColor:"#2BBCC0",
  },
  buttonClose:{
    alignSelf: "flex-start",
    marginTop: 35,
    marginLeft:7
  },
  textStyle:{
    fontSize:20
  },
  closeTextStyle:{
    fontSize:25
  },
  imageStyle:{
    width: "100%",
    height: 250,
  }
});
