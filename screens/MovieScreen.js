import {View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import {HeartIcon} from 'react-native-heroicons/solid'
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/cast';
import MovieList from '../components/movieList';

const {width, height} = Dimensions.get("window");
const ios =  Platform.OS === 'ios';
const topMargin = ios? '' : 'mt-8';

const iosSafeArea = "absolute z-20 w-full flex-row justify-between items-center px-4 ml-4";
const androidSafeArea = "absolute z-20 w-full flex-row justify-between items-center px-4 ";

export default function MovieScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation()
    const [isFavourite,toggleFavourite] = useState(false)
    const [cast, setCast] = useState([1,2,3,4,5])
    const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5])
    
    let movieName = 'Ant-Man and the Wasp: Quantumania';
    return (
        <ScrollView
            contentContainerStyle={{paddingBottom:20}}
            className = "flex-1 bg-neutral-900"
        >
            {/* back button and movie poster */}
            <View className ={ios?  "mr-7 ": "mr-1 "} >
                <SafeAreaView className={ios? iosSafeArea: androidSafeArea + topMargin}>
                    <TouchableOpacity style={styles.background}className="rounded-xl p-1" onPress={() => navigation.goBack()} >
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size="35"  color={isFavourite? theme.background: "white"}/>
                    </TouchableOpacity>
                </SafeAreaView>
                <Image
                    source={require("../assets/images/ant.jpg")}
                    style={{ width, height: height*0.55, }} 
                    resizeMode='cover'     
                />
                <Image
                    source={require("../assets/images/gradient.png")}
                    style={{ width, height: height*0.55, position:"absolute" }} 
                         
                />
            </View>
            {/* movie details */}
            <View style={{marginTop: -(height*0.11)}} className="space-y-3">
                <Text className='text-center text-white text-3xl font-bold tracking-wider '>
                    {
                        movieName
                    }
                </Text>
                {/* status, release, runtime */}
                <Text className='text-neutral-400 font-semibold text-base text-center'>
                    Released - 2020 - 170min
                </Text>
                {/* genres */}
                <View className="flex-row justify-center mx-4 space-x-2">
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Action -
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Thriller -
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Comedy 
                    </Text>
                </View>
                {/* description */}
                <Text className ="text-neutral-400 mx-4 tracking-wide">
                Ant-Man and the Wasp: Quantumania kicks off Phase 5 of the MCU, setting up a new era for the franchise and introducing Kang the Conqueror as the overarching Multiverse Saga villain. The movie explores the Quantum Realm in detail and reveals Hope's history with Kang, showcasing her complicated past in this world.
                </Text>
            </View>

            {/* Cast */}
            <Cast navigation={navigation} cast={cast} />

            {/* Similar movies */}
            <MovieList hideSeeAll={true} title="Similar  Movies" data={similarMovies} />
        </ScrollView>
    )
}