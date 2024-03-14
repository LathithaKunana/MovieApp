import React, {useEffect, useState} from 'react'
import { Text, View , Dimensions, Platform, ScrollView, SafeAreaView,TouchableOpacity, Image} from 'react-native'
import { styles, theme } from '../theme';
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import {HeartIcon} from 'react-native-heroicons/solid'
import {useRoute, useNavigation} from '@react-navigation/native';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '../api/moviedb';

let {width, height} = Dimensions.get('window')

const ios = Platform.OS == "ios"
const topMargin = ios? '' : 'mt-8';

const iosSafeArea = " z-20 w-full flex-row justify-between items-center px-4 ml-4";
const androidSafeArea = " z-20 w-full flex-row justify-between items-center px-4 ";
export default function PersonScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation();
    const [isFavourite,toggleFavourite] = useState(false);
    const [personMovie,setPersonMovie] = useState([]);
    const [person, setPerson] = useState({});
    const [loading, setLoading] = useState(false);
    

    useEffect(()=>{
        setLoading(true)
        //console.log('person:', item)
        getPersonDetails(item.id)
        getPersonMovies(item.id)
    }, [item]);

    const getPersonDetails = async id=> {
        const data = await fetchPersonDetails(id);
        //console.log("got person details: ", data);
        if(data) setPerson(data)
        setLoading(false)
    }
    const getPersonMovies = async id=> {
        const data = await fetchPersonMovies(id);
        //console.log("got person movies: ", data);
        if(data && data.cast) setPersonMovie(data.cast)
        setLoading(false)
    }


    
    return (
      <ScrollView className = 'flex-1 bg-neutral-900' contentContainerStyle={{padding:15}}>
        {/* back Button */}
        <SafeAreaView className={ios? iosSafeArea: androidSafeArea + topMargin}>
            <TouchableOpacity style={styles.background}className="rounded-xl p-1" onPress={() => navigation.goBack()} >
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} className= {ios? 'mx-8': ''}>
                <HeartIcon size="35"  color={isFavourite? theme.background: "white"}/>
            </TouchableOpacity>
        </SafeAreaView>

        {/* personal detail*/}
        {
            loading? (
                <Loading/>
            ):(
                <>
                    <View className=" justify-center "
                        style={{
                            shadowColor: 'gray',
                            shadowRadius: 40,
                            shadowOffset: {width: 0, height:5},
                            shadowOpacity: 1,
                        }}
                    >
                        <View className="items-center self-center rounded-full overflow-hidden h-72 w-30 border-2 border-neutral-500 my-8">
                            <Image //source={require("../assets/images/wick.jpg")}
                                source={{uri: image342(person?.profile_path) || fallbackPersonImage}}
                                style={{height: height*0.43, width: width*0.74}}
                            />
                        </View>
                        <View className="">
                            <Text className="text-3xl text-white font-bold text-center">
                                {
                                    person?.name
                                }
                            </Text>
                            <Text className="text-base text-neutral-500 text-center">
                                {
                                    person?.place_of_birth
                                }
                            </Text>
                        </View>
                    </View>
                    <ScrollView 
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{alignItems:'center', justifyContent:'center'}}
                            className=" mx-3 mt-6 p-4  overflow-hidden bg-neutral-700 rounded-full">
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className=" text-white font-semibold ">Gender</Text>
                                <Text className=" text-neutral-300 text-sm ">
                                    {
                                        person?.gender==1? "Female" : "Male"
                                    }
                                </Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className=" text-white font-semibold ">Birthday</Text>
                                <Text className=" text-neutral-300 text-sm ">{person?.birthday}</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className=" text-white font-semibold ">Known for</Text>
                                <Text className=" text-neutral-300 text-sm ">{person?.known_for_department}</Text>
                            </View>
                            <View className=" border-r-neutral-400 px-2 items-center">
                                <Text className=" text-white font-semibold ">Popularity</Text>
                                <Text className=" text-neutral-300 text-sm ">{person?.popularity && person?.popularity.toFixed(2)} %</Text>
                            </View>
                    </ScrollView>
                        <View className="my-6 mx-4 space-y-2">
                            <Text className="text-white text-lg">Biography</Text>
                            <Text className="text-neutral-400 text-sm tracking-wider">
                                    {
                                        person?.biography || "N/A"
                                    }
                            </Text>
                        </View>
                        {/* movies */}
                        <MovieList title={'Movies'} hideSeeAll={true} data={personMovie}/>    
                </>
            )
        }
        
        </ScrollView>
    )
}
