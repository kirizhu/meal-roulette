import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const RefreshButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text>Refresh</Text>
    </TouchableOpacity>
  )
}

export default RefreshButton

const styles = StyleSheet.create({
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
})