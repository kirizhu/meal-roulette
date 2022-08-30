import { Text, View } from 'react-native'
import React from 'react'
import axios from "axios";

const baseURL = "https://playground.devskills.co/api/rest/meal-roulette-app/meals/";

export const fetchFourMeals = async (offset)=>{
    let meals;
    try {
        console.log("fetchFourMeals")
        const res = await axios.get(`${baseURL}/limit/4/offset/${offset}`);
        meals = res.data.meal_roulette_app_meals_aggregate.nodes
    } catch (error) {
        meals = error
        console.log(error)
    }
  return meals
}

export const fetchOneMeal = async (id) => {
    let meal;
    try {
        console.log("fetchImage")
        const res = await axios.get(`${baseURL}/${id}`);
        meal = res.data.meal_roulette_app_meals_by_pk
    } catch (error) {
        meal = error
        console.log(error)
    }
  return meal

}

export  const fetchAllMeals = async (id)=>{
    let meals;
    try {
        console.log("fetchAllMeals")
        const res = await axios.get(`${baseURL}`);
        meals = res.data.meal_roulette_app_meals
    } catch (error) {
        meals = error
        console.log(error)
    }
  return meals
}

export const splitIngrediants = (meal) => {
    const ingrediantsArray = meal && meal.ingredients.split(",")
    return ingrediantsArray
}