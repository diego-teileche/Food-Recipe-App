import React, { useEffect, useState } from "react"
import { View, Text, Image, ScrollView, TextInput } from "react-native"
import { StatusBar } from "expo-status-bar"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import Categories from "../components/categories"
import axios from "axios"
import Recipes from "../components/recipes"

export default function HomeScreen() {
	const [activeCategory, setActiveCategory] = useState("Beef")
	const [categories, setCategories] = useState([])
	const [meals, setMeals] = useState([])

	useEffect(() => {
		getCategories()
		getRecipes()
	}, [])

	const handleChangeCategory = (category) => {
		getRecipes(category)
		setActiveCategory(category)
		setMeals([])
	}

	const getCategories = async () => {
		try {
			const res = await axios.get(
				"https://www.themealdb.com/api/json/v1/1/categories.php"
			)

			if (res && res.data) setCategories(res.data.categories)
		} catch (error) {
			console.log("error: ", error.message)
		}
	}

	const getRecipes = async (category = "Beef") => {
		try {
			const res = await axios.get(
				`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
			)

			if (res && res.data) setMeals(res.data.meals)
		} catch (error) {
			console.log("error: ", error.message)
		}
	}

	return (
		<View className="flex-1 bg-amber-100">
			<StatusBar style="dark" />

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 50 }}
				className="space-y-6 pt-14"
			>
				<View className="mx-4 flex-row justify-between items-center mb-2">
					<Image
						source={require("../assets/images/app.png")}
						style={{ height: hp(5), width: hp(5.5) }}
						className="rounded-full"
					/>
					<BellIcon size={hp(4)} color="gray" />
				</View>

				<View className="mx-4 space-y-2 mb-2">
					<View>
						<Text
							style={{ fontSize: hp(3.8) }}
							className="font-semibold text-neutral-800"
						>
							Make your own food
						</Text>
					</View>
					<Text
						style={{ fontSize: hp(3.8) }}
						className="font-semibold text-neutral-800"
					>
						Stay at <Text className="text-amber-400">home</Text>
					</Text>
				</View>

				<View className="mx-4 flex-row items-center rounded-full bg-black/20 p-[6px]">
					<TextInput
						placeholder="Search any recipe"
						placeholderTextColor={"black"}
						style={{ fontSize: hp(1.7) }}
						className="flex-1 text-base pl-3 tracking-wider"
					/>
					<View className="bg-white rounded-full p-3">
						<MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
					</View>
				</View>

				<View>
					{categories.length > 0 && (
						<Categories
							categories={categories}
							activeCategory={activeCategory}
							handleChangeCategory={handleChangeCategory}
						/>
					)}
				</View>

				<View>
					<Recipes meals={meals} categories={categories} />
				</View>
			</ScrollView>
		</View>
	)
}
