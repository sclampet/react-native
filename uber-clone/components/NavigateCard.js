import React from 'react'
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_APIKEY } from "@env";
import tw from 'tailwind-react-native-classnames'
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Good morning, Jobin</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        placeholder="Where to?"
                        debounce={400}
                        styles={toInputBoxStyles}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        enablePoweredByContainer={false}
                        onPress={(data, details = null) => {
                            dispatch(
                                setDestination({
                                    location: details.geometry.location,
                                    description: data.description
                                })
                            );

                            navigation.navigate('RideOptionsCard')
                        }}
                        query={{
                            key: GOOGLE_MAPS_APIKEY,
                            language: 'en',
                        }}
                    />
                </View>

                <NavFavourites />
            </View>
            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
                <View style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}>
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </View>

                <TouchableOpacity style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
                    <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                    <Text style={tw`text-center`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})
