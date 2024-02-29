import {View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, Platform, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import {HeartIcon} from 'react-native-heroicons/solid'
import { styles, theme } from '../theme';
import { LinearGradient  } from 'expo-linear-gradient';

const {width, height} = Dimensions.get("window");
const ios =  Platform.OS === 'ios';
const topMargin = ios? '' : 'mt-8';

export default function MovieScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation()
    const [isFavourite,toggleFavourite] = useState(false)
    useEffect(() => {
        //call the movie details
    }, [item])
    return (
        <ScrollView
            contentContainerStyle={{paddingBottom:20}}
            className = "flex-1 bg-neutral-900"
        >
            {/* back button andmovie poster */}
            <View className = "mr-7 ">
                <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 ml-4"+topMargin}>
                    <TouchableOpacity style={styles.background}className="rounded-xl p-1" onPress={() => navigation.goBack()} >
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size="35"  color={isFavourite? theme.background: "white"}/>
                    </TouchableOpacity>
                </SafeAreaView>
                <View className= "brightness-50 ">
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,23,1)', 'rgba(34,23, 1)']}
                        style={{ width, height: height*0.4 }}
                        start={{x: 0.5, y:0}}
                        end={{ x: 0.5 ,y:1 }}
                        className="absolute bottom-0"
                    />
                    <Image
                        source={require("../assets/images/ant.jpg")}
                        style={{ width, height: height*0.55, }}
                        
                    />
                    
                </View>
            </View>
        </ScrollView>
    )
}