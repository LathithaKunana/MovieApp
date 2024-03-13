import React, {useState} from 'react'
import { Text, View , Dimensions, Platform, ScrollView, SafeAreaView,TouchableOpacity, Image} from 'react-native'
import { styles, theme } from '../theme';
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import {HeartIcon} from 'react-native-heroicons/solid'
import {useRoute, useNavigation} from '@react-navigation/native';
import MovieList from '../components/movieList';
import Loading from '../components/loading';

let {width, height} = Dimensions.get('window')

const ios = Platform.OS == "ios"
const topMargin = ios? '' : 'mt-8';

const iosSafeArea = " z-20 w-full flex-row justify-between items-center px-4 ml-4";
const androidSafeArea = " z-20 w-full flex-row justify-between items-center px-4 ";
export default function PersonScreen() {
    const navigation = useNavigation();
    const [isFavourite,toggleFavourite] = useState(false)
    const [personMovie,setPersonMovie] = useState([1,2,3,4])
    const [loading, setLoading] = useState(false);
    
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
                            <Image source={require("../assets/images/wick.jpg")}
                                style={{height: height*0.43, width: width*0.74}}
                            />
                        </View>
                        <View className="">
                            <Text className="text-3xl text-white font-bold text-center">
                                Keanu Reevs
                            </Text>
                            <Text className="text-base text-neutral-500 text-center">
                                London, United Kingdom
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
                                <Text className=" text-neutral-300 text-sm ">Male</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className=" text-white font-semibold ">Birthday</Text>
                                <Text className=" text-neutral-300 text-sm ">1964/09/25</Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className=" text-white font-semibold ">Known for</Text>
                                <Text className=" text-neutral-300 text-sm ">Acting</Text>
                            </View>
                            <View className=" border-r-neutral-400 px-2 items-center">
                                <Text className=" text-white font-semibold ">Popularity</Text>
                                <Text className=" text-neutral-300 text-sm ">64.23</Text>
                            </View>
                    </ScrollView>
                        <View className="my-6 mx-4 space-y-2">
                            <Text className="text-white text-lg">Biography</Text>
                            <Text className="text-neutral-400 text-sm tracking-wider">
                                Keanu Charles Reeves, whose first name means "cool breeze over the mountains" in Hawaiian, was born September 2, 1964 in Beirut, Lebanon. He is the son of Patric Reeves, a showgirl and costume designer, and Samuel Nowlin Reeves, a geologist. Keanu's father was born in Hawaii, of British, Portuguese, Native Hawaiian, and Chinese ancestry, and Keanu's mother is originally from Essex England. After his parents' marriage dissolved, Keanu moved with his mother and younger sister, Kim Reeves, to New York City, then Toronto. Stepfather #1 was Paul Aaron, a stage and film director - he and Patricia divorced within a year, after which she went on to marry (and divorce) rock promoter Robert Miller. Reeves never reconnected with his biological father. In high school, Reeves was lukewarm toward academics but took a keen interest in ice hockey (as team goalie, he earned the nickname "The Wall") and drama. He eventually dropped out of school to pursue an acting career.
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
