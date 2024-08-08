import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native"
import { StatusBar } from "expo-status-bar"
import React, { useEffect, useState } from "react"
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen"
import {
	ChevronLeftIcon,
	ClockIcon,
	FireIcon,
	Square3Stack3DIcon,
	UsersIcon,
} from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import Loading from "../components/loading"
import YoutubeIframe from "react-native-youtube-iframe"

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

	const ingredientsIndexes = (meal) => {
		if (!meal) return []
		let indexes = []

		for (let i = 1; i <= 20; i++) {
			if (meal["strIngredient" + i]) {
				indexes.push(i)
			}
		}

		return indexes
	}

	const getYoutubeVideoId = (url) => {
		const regex = /[?&]v=([^&]+)/
		const match = url.match(regex)

		if (match && match[1]) return match[1]

		return null
	}

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ paddingBottom: 30 }}
			className="bg-amber-100 flex-1"
		>
			<StatusBar style={"light"} />

			<View className="flex-row justify-center">
				<Image
					source={{ uri: item.strMealThumb }}
					style={{
						width: wp(100),
						height: hp(50),
						borderRadius: 15,
						borderBottomLeftRadius: 40,
						borderBottomRightRadius: 40,
					}}
					sharedTransitionTag={item.strMeal}
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
							style={{ fontSize: hp(3.5) }}
						>
							{meal?.strMeal}
						</Text>
						<Text
							className="font-medium flex-1 text-amber-500"
							style={{ fontSize: hp(2) }}
						>
							{meal?.strArea}
						</Text>
					</View>

					<View className="flex-row justify-around">
						<View className="flex rounded-full bg-amber-400 p-2">
							<View
								style={{ height: hp(6.5), width: hp(6.5) }}
								className="bg-white rounded-full flex items-center justify-center"
							>
								<ClockIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
							</View>

							<View className="flex items-center py-2 space-y-1">
								<Text
									className="font-bold text-neutral-700"
									style={{ fontSize: hp(2) }}
								>
									35
								</Text>
								<Text
									className="font-bold text-neutral-700"
									style={{ fontSize: hp(1.3) }}
								>
									Mins
								</Text>
							</View>
						</View>

						<View className="flex rounded-full bg-amber-400 p-2">
							<View
								style={{ height: hp(6.5), width: hp(6.5) }}
								className="bg-white rounded-full flex items-center justify-center"
							>
								<UsersIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
							</View>

							<View className="flex items-center py-2 space-y-1">
								<Text
									className="font-bold text-neutral-700"
									style={{ fontSize: hp(2) }}
								>
									03
								</Text>
								<Text
									className="font-bold text-neutral-700"
									style={{ fontSize: hp(1.3) }}
								>
									Servings
								</Text>
							</View>
						</View>

						<View className="flex rounded-full bg-amber-400 p-2">
							<View
								style={{ height: hp(6.5), width: hp(6.5) }}
								className="bg-white rounded-full flex items-center justify-center"
							>
								<FireIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
							</View>

							<View className="flex items-center py-2 space-y-1">
								<Text
									className="font-bold text-neutral-700"
									style={{ fontSize: hp(2) }}
								>
									104
								</Text>
								<Text
									className="font-bold text-neutral-700"
									style={{ fontSize: hp(1.3) }}
								>
									Cal
								</Text>
							</View>
						</View>

						<View className="flex rounded-full bg-amber-400 p-2">
							<View
								style={{ height: hp(6.5), width: hp(6.5) }}
								className="bg-white rounded-full flex items-center justify-center"
							>
								<Square3Stack3DIcon
									size={hp(4)}
									strokeWidth={2.5}
									color={"#525252"}
								/>
							</View>

							<View className="flex items-center py-2 space-y-1">
								<Text
									className="font-bold text-neutral-700"
									style={{ fontSize: hp(2) }}
								></Text>
								<Text
									className="font-bold text-neutral-700"
									style={{ fontSize: hp(1.3) }}
								>
									Easy
								</Text>
							</View>
						</View>
					</View>

					<View className="space-y-4">
						<Text
							className="font-bold flex-1 text-neutral-700"
							style={{ fontSize: hp(3.5) }}
						>
							Ingredients
						</Text>

						<View className="space-y-2 ml-3">
							{ingredientsIndexes(meal).map((i) => {
								return (
									<View key={i} className="flex-row items-center space-x-4">
										<View
											style={{ height: hp(1.5), width: hp(1.5) }}
											className="bg-amber-500 rounded-full"
										/>

										<View className="flex-row space-x-2">
											<Text
												className="font-extrabold text-neutral-700"
												style={{ fontSize: hp(1.7) }}
											>
												{meal["strMeasure" + i]}
											</Text>
											<Text
												className="font-medium text-neutral-600"
												style={{ fontSize: hp(1.7) }}
											>
												{meal["strIngredient" + i]}
											</Text>
										</View>
									</View>
								)
							})}
						</View>
					</View>

					<View className="space-y-4">
						<Text
							className="font-bold flex-1 text-neutral-700"
							style={{ fontSize: hp(3.5) }}
						>
							Instructions
						</Text>

						<View className="bg-amber-300 p-3 rounded-lg">
							<Text style={{ fontSize: hp(1.6) }} className="text-black">
								{meal?.strInstructions}
							</Text>
						</View>
					</View>

					{meal.strYoutube && (
						<View className="space-y-4">
							<Text
								className="font-bold flex-1 text-neutral-700"
								style={{ fontSize: hp(3.5) }}
							>
								Recipe Video
							</Text>

							<View>
								<YoutubeIframe
									videoId={getYoutubeVideoId(meal.strYoutube)}
									height={hp(30)}
								/>
							</View>
						</View>
					)}
				</View>
			)}
		</ScrollView>
	)
}
