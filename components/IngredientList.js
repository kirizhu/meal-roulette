import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

const IngredientList = ({ingredients}) => {

    const renderIngrediants =({item, index})=>{
        return(
        <View key={index}>
            <Text>{`${item}`}</Text>
        </View>)
    }

  return (
    <FlatList
        data={ingredients}
        renderItem={renderIngrediants}
    /> 
  )
}

export default IngredientList

const styles = StyleSheet.create({})