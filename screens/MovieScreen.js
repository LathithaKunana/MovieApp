import {View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import {HeartIcon} from 'react-native-heroicons/solid'
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';

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
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] =useState({});
    
    let movieName = 'Ant-Man and the Wasp: Quantumania';
    
    useEffect(() =>{
        console.log('itemid:',item.id)
        setLoading(true)
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)
    }, [item])

    const getMovieDetails = async id=>{
        const data = await fetchMovieDetails(id);
        //console.log('got movie details', data)
        if(data) setMovie(data);
        setLoading(false)
    }

    const getMovieCredits = async id=>{
        const data = await fetchMovieCredits(id);
        //console.log('got movie credits', data)
        if(data && data.cast) setCast(data.cast);
        setLoading(false)
    }

    const getSimilarMovies = async id=>{
        const data = await fetchSimilarMovies(id);
        //console.log('got similar movies', data)
        if(data && data.results) setSimilarMovies(data.results);
        setLoading(false)
    }
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
                {
                    loading? (
                        <Loading/>
                    ):(
                            <>
                            <Image
                                // source={require("../assets/images/ant.jpg")}
                                source={{uri: image500(movie?.poster_path) || fallbackMoviePoster}}
                                style={{ width, height: height*0.55, }} 
                                resizeMode='cover'     
                            />
                            <Image
                                source={require("../assets/images/gradient.png")}
                                style={{ width, height: height*0.55, position:"absolute" }} 
                                    
                            />
                        </>
                    )
                }
               
            </View>
            {/* movie details */}
            <View style={{marginTop: -(height*0.11)}} className="space-y-3">
                <Text className='text-center text-white text-3xl font-bold tracking-wider '>
                    {
                        movie?.title
                    }
                </Text>
                {/* status, release, runtime */}
                {
                    movie?.id?(
                        <Text className='text-neutral-400 font-semibold text-base text-center'>
                            {movie?.status} - {movie?.release_date?.split('-')[0]} - {movie?.runtime}min
                        </Text>
                    ) : null
                }
                
                {/* genres */}
                <View className="flex-row justify-center mx-4 space-x-2">
                    {
                        movie?.genres?.map((genres,index) => {
                            let showDot = index+1 != movie.genres.length
                            return(
                                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                    {genres.name} {showDot? '.': null}
                                </Text>
                            )
                        })
                    }
                    
                    {/* <Text className="text-neutral-400 font-semibold text-base text-center">
                        Thriller -
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Comedy 
                    </Text> */}
                </View>
                {/* description */}
                <Text className ="text-neutral-400 mx-4 tracking-wide">
                    {
                        movie?.overview
                    }
                </Text>
            </View>

            {/* Cast */}
            {cast.length> 0 && <Cast navigation={navigation} cast={cast} /> }

            {/* Similar movies */}
           {cast.length> 0 && <MovieList hideSeeAll={true} title="Similar  Movies" data={similarMovies} />}  
        </ScrollView>
    )
}