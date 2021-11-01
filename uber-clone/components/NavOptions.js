import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import mapicon from '../assets/carIcon.png';
import foodicon from '../assets/foodicon.png';
import tw from 'tailwind-react-native-classnames';
import { Icon } from "react-native-elements";
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const data = [
    {
        id: "123",
        title: "Get a ride",
        image: mapicon,
        screen: "MapScreen"
    },
    {
        id: "456",
        title: "Order food",
        image: foodicon
    },
];

const NavOptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => {
                        if (item.screen != null) {
                            navigation.navigate(item.screen);
                        }
                        else {
                            console.log("Eats flow hasn't been setup.")
                        }

                    }}

                    style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
                    disabled={!origin && origin !== null}
                >
                    <View style={tw`${!origin && 'opacity-20'}`}>
                        <Image
                            style={[tw`m-6 w-full content-center`, { width: 50, height: 50, resizeMode: "contain" }]}
                            source={item.image}
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon
                            style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                            name="arrowright"
                            color="white"
                            type="antdesign"
                        />
                    </View>
                </TouchableOpacity>
            )
            }
        />
    )
}

export default NavOptions
