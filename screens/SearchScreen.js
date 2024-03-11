import React from 'react'
import {Text, View, Dimensions, SafeAreaView, Platform, TextInput ,TouchableOpacity, ScrollView} from 'react-native'
import {XMarkIcon} from 'react-native-heroicons/outline'
import {useNavigation} from "@react-navigation/native"

const ios =  Platform.OS === 'ios';
const {width,height} =Dimensions.get('window')
const topMargin = ios? '' : ' bg-neutral-800 flex-1';

const iosSafeArea = " flex-1 bg-neutral-800";
const androidSafeArea = " mt-8 flex-1 bg-neutral-800";

export default function SearchScreen() {
    const navigation = useNavigation();

  return (
    <View className="flex-1 bg-neutral-800">
        <SafeAreaView className={ios? iosSafeArea: androidSafeArea }>
            <View className="mx-4 mb-3 flex-row justify-between items-center border-2 border-neutral-500 rounded-full">
                <TextInput
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
            <ScrollView
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={{paddingHorizontal: 15}}
               className= "space-x-y"
            >
                <Text className='text-white font-semibold ml-1'>Result</Text>
                
                
            </ScrollView>
        </SafeAreaView>
    </View>
  )
}
