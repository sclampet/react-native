import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native';
import uberxcar from '../assets/uberxcar.jpeg';
import uberwhitexcar from '../assets/uberxwhitecar.jpeg';
import { useSelector } from 'react-redux';
import { selectTravelInformation } from '../slices/navSlice';

const data = [
    {
        id: "123",
        title: "UberX",
        multiplier: 1,
        image: uberwhitexcar
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: uberxcar
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: uberxcar
    },
];

//Surge pricing
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
    const navigator = useNavigation()
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelInformation);

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity
                    style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
                    onPress={() => navigator.navigate("NavigateCard")}
                >
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Select a ride - {travelTimeInformation?.distance?.text ?? "Distance Unknown"}</Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-row items-center justify-between px-10 ${id === selected?.id && 'bg-gray-200'}`}>
                        <Image
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: "contain"
                            }}
                            source={image}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>{travelTimeInformation?.duration?.text ?? "Unkown"}</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {new Intl.NumberFormat('en', {
                                style: 'currency',
                                currency: 'USD'

                            }).format(
                                (travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier) / 100
                            )}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`} disabled={!selected}>
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default RideOptionsCard
