import {View, Text, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline'

export default function MovieScreen() {
    const {params: item} = useRoute();
    useEffect(() => {
        //call the movie details
    }, [item])
    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            className = "flex-1 bg-neutral-900"
        >
            {/* back button andmovie poster */}
            <View className="w-full">
                <SafeAreaView className="absolute z-20 flex-row justify-between items-center px-4">
                    <TouchableOpacity className="rounded-xl p-1">
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </ScrollView>
    )
}