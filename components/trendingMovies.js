import { View , Text, TouchableWithoutFeedback, Dimensions, Image} from "react-native";
import react from "react";
import Carousel from "react-native-snap-carousel-new";
import { useNavigation } from "@react-navigation/native";

const {width, height} = Dimensions.get("window");
export default function TrendingMovies({data}) {
    const navigation = useNavigation
    const handleClick =  () =>{
        navigation.navigate("Movie", item);
    }
    return(
        <View className = "mb-8">
            <Text className = "text-white text-xl mx-4 mb-5">Trending </Text>
            <Carousel
                data={data}
                renderItem={ ({item}) => <MovieCard item={item} handleCick={handleClick}/>}
                firstItem={1}
                inactiveSlideOpacity={0.4}
                sliderWidth={width}
                itemWidth={width*0.62}
                slideStyle={{display: "flex", alignItems: "center"}}
            /> 
        </View>
    )
}

const MovieCard = ({item, handleCick}) => {
    return(
        <TouchableWithoutFeedback onPress={handleCick}>
            <Image
                source={require('../assets/images/june.jpg')} 
                style={{
                    width: width*0.6, 
                    height: height*0.4 
                }}
                className="rounded-3xl"
            />
        </TouchableWithoutFeedback>
    )
}