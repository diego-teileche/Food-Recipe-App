import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native"
import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import Loading from "../components/loading"

export default function RecipeDetailScreen(props) {
	let item = props.route.params
	const [isFavorite, setIsFavorite] = useState(false)
	const [meal, setMeal] = useState(null)
	const [loading, setLoading] = useState(true)
	const navigation = useNavigation()

	useEffect(() => {
		getMealData(item.idMeal)
	}, [])

	const getMealData = async (id) => {
		try {
			const res = await axios.get(
				`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
			)

			if (res && res.data) {
				setMeal(res.data.meals[0])
				setLoading(false)
			}
		} catch (error) {
			console.log("error: ", error.message)
		}
	}

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: 30 }}
			className="bg-white flex-1"
		>
			<StatusBar style={"light"} />

			<View className="flex-row justify-center">
				<Image
					source={{ uri: item.strMealThumb }}
					style={{
						width: wp(98),
						height: hp(50),
						borderRadius: 15,
						borderBottomLeftRadius: 40,
						borderBottomRightRadius: 40,
						marginTop: 4,
					}}
				/>
			</View>

			<View className="w-full absolute flex-row justify-between items-center pt-14">
				<TouchableOpacity
					className="p-2 rounded-full ml-5 bg-white"
					onPress={() => navigation.goBack()}
				>
					<ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
				</TouchableOpacity>
				<TouchableOpacity
					className="p-2 rounded-full mr-5 bg-white"
					onPress={() => setIsFavorite(!isFavorite)}
				>
					<HeartIcon
						size={hp(3.5)}
						strokeWidth={4.5}
						color={isFavorite ? "red" : "gray"}
					/>
				</TouchableOpacity>
			</View>

			{loading ? (
				<Loading size="large" className="mt-16" />
			) : (
				<View className="px-4 flex justify-between space-y-4 pt-8">
					<View className="space-y-2">
						<Text
							className="font-bold flex-1 text-neutral-700"
							style={{ fontSize: hp(3) }}
						>
							{meal?.strMeal}
						</Text>
						<Text
							className="font-medium flex-1 text-neutral-500"
							style={{ fontSize: hp(2) }}
						>
							{meal?.strArea}
						</Text>
					</View>
				</View>
			)}
		</ScrollView>
	)
}
