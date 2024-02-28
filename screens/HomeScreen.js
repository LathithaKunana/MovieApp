import React, { Component } from 'react'
import { Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'

const ios =  Platform.OS === 'ios';
export default function HomeScreen() {


    return(
    <View className = "flex-1 bg-neutral-800 "> 
        {/* search bar and logo */}

        <SafeAreaView className = {ios? "-mb-2" : "mt-8"}>
            <StatusBar style="light" />
            <View className="flex-row justify-between items-center mx-4">
                <Bars3CenterLeftIcon size={30} strokeWidth={2} color="#fff"/>
            <Text 
                className= "text-white text-3xl font-bold ">Movies
            </Text>
            <TouchableOpacity>
                <MagnifyingGlassIcon onPress={()=>{alert("Search Functionality Coming Soon")}} size={30} color="#fff"/>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    </View>
    )
    
}
