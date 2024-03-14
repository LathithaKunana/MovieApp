import React, { useCallback, useState } from 'react'
import {Text, View, Dimensions, SafeAreaView, Platform, TextInput ,TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image} from 'react-native'
import {XMarkIcon} from 'react-native-heroicons/outline'
import {useNavigation} from "@react-navigation/native"
import Loading from '../components/loading';
import { debounce } from 'lodash';
import { fallbackMoviePoster, image185, searchMovies } from '../api/moviedb';

const ios =  Platform.OS === 'ios';
const {width,height} =Dimensions.get('window')
const topMargin = ios? '' : ' bg-neutral-800 flex-1';

const iosSafeArea = " flex-1 bg-neutral-800";
const androidSafeArea = " mt-8 flex-1 bg-neutral-800";

export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    let movieName = 'Ant-Man and the Wasp: Quantumania';

    const handleSearch = value => {
        if(value && value.length>2) {
            setLoading(true);
            searchMovies({
                query: value, 
                include_adult: 'false', 
                language: 'en-US', 
                page: '1'
            }).then(data => {
                setLoading(false);
                //console.log('got movies: ', data)
                if(data && data.results) setResults(data.results);
            })
        } else{
            setLoading(false);
            setResults([])
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400),[]);

  return (
    <View className="flex-1 bg-neutral-800">
        <SafeAreaView className={ios? iosSafeArea: androidSafeArea }>
            <View className="mx-4 mb-3 flex-row justify-between items-center border-2 border-neutral-500 rounded-full">
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movies'
                    placeholderTextColor={'lightgray'}
                    className="pb-1 pl-4 text-base font-semibold text-white tracking-wider"

                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className="rounded-full p-3 m-1 bg-neutral-500"
                >
                    <XMarkIcon size="25" color="white" />

                </TouchableOpacity>
            </View>
            {/* results */}
            {
                loading? (
                    <Loading/>
                ):
                    results.length>0? (
                        <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 15}}
                        className= "space-x-3"
                     >
                         <Text className='text-white font-semibold ml-1'>Result ({results.length})</Text>
                         <View className="flex-wrap flex-row justify-between right-3 mt-4 w-full">
                             {
                                 results.map((item,index)=> {
                                     return(
                                         <TouchableWithoutFeedback
                                             key={index}
                                             onPress={() => navigation.push("Movie", item)}
                                         >
                                             <View className="space-y-2 mb-4 ">
                                                 <Image
                                                     className="rounded-3xl"
                                                     //source={require('./../assets/images/ant.jpg')}
                                                     source={{uri: image185(item?.poster_path) || fallbackMoviePoster}}
                                                     style={{width: width*0.44 , height: height*0.3}}
                                                 /> 
                                                 <Text className="text-neutral-300 ml-1" >
                                                     {
                                                         item?.title.length>20? item?.title.slice(0,20) + ('...') : item?.title
                                                     }
                                                 </Text>
         
                                             </View>
                                             
         
                                         </TouchableWithoutFeedback>
                                     )
                                 }) 
                             }
                         </View> 
                     </ScrollView>
    
                    ) : (
                        <View className="flex-row justify-center items-center flex-1">
                            <Image 
                                source={require("../assets/images/cinema.png")}
                                style={{width: width*0.9, height: height*0.2}}
                                className="mb-60"
                            />
                        </View>
                    )
                
                
            }
            
           
        </SafeAreaView>
    </View>
  )
}
