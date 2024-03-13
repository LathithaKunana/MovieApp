import React, { Component, useState } from 'react'
import { Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import { styles } from '../theme';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/loading';

const ios =  Platform.OS === 'ios';
export default function HomeScreen() {
    const [trending , setTrending] = useState([1,2,3,4]);
    const [upcoming , setUpcoming] = useState([1,2,3,4]);
    const [topRated , setTopRated] = useState([1,2,3,4]);
    const [loading, setLoading] = useState(false);

    const navigation =useNavigation();


    return(
    <View className = "flex-1 bg-neutral-800 ">

        {/* search bar and logo */}

        <SafeAreaView className = {ios? "mb-5" : "mt-8"}>
            <StatusBar style="light" />
            <View className="flex-row justify-between items-center mx-4">
                <Bars3CenterLeftIcon size={30} strokeWidth={2} color="#fff"/>
            <Text 
                className= "text-white text-3xl font-bold "><Text style ={styles.text}>M</Text>ovies
            </Text>
            <TouchableOpacity>
                <MagnifyingGlassIcon onPress={()=> navigation.navigate('Search')} size={30} color="#fff"/>
            </TouchableOpacity>
            </View>
        </SafeAreaView>

        {/* trending movies*/}

        {
            loading? (
                <Loading />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 10}}
                    >
                    {/* trending movies carousel*/}
                    <TrendingMovies data={trending}/>

                    {/* upcoming movies row*/}
                    <MovieList title="Upcoming" data={upcoming}/>

                    {/* top rated movies row*/}
                    <MovieList title="Top Rated" data={topRated}/>
                </ScrollView>
            )
        }
        </View>
    )
    
}
