import { CommonActions } from "@react-navigation/native";
import React from "react"
import { Text, Image, StyleSheet, View, ImageBackground, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from "react-native"
import { useSelector, useDispatch } from 'react-redux';
import { API_CALL, FAVOURATE_LIST, REMOVE_LIST, PROFILE_DETAIL } from "../store/action/Count"
import _ from "lodash"
import { ListView } from '../components/ListView'
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import ListCard from "../components/ListCard";
const SearchBox = (props) => {
    const details = useSelector(state => state)
    const dispatch = useDispatch()
    const [search, setSearch] = useState([])
    const { characterDetails } = details.character

    const handlePress = (text) => {
        const lowerCaseData = text.toLowerCase()
        const filteredData = characterDetails.filter(data => {
            return data.name.toLowerCase().includes(lowerCaseData)
        })
        setSearch(filteredData);
    }

    const ifExist = (favCharacter) => {
        const { favourateList } = details.character
        if (favourateList.filter(item =>
            item.char_id === favCharacter.char_id).length > 0
        ) {
            return true;
        }
        return false
    }

    const onFavoorateItem = (item) => {
        dispatch({ type: FAVOURATE_LIST, payload: item })
    }

    const removeFromList = (character) => {
        const { favourateList } = details.character
        const filteredList = favourateList.filter(item => item.char_id != character.char_id)
        dispatch({ type: REMOVE_LIST, payload: filteredList })
    }

    const onclicked = (data) => {
        const { navigation } = props
        dispatch({ type: PROFILE_DETAIL, payload: data })
        navigation.navigate('ProfileDetails')
    }

    return (
        <View style={styles.CONTAINER}>
            <View style={styles.HEADER_STYLE}>
                <TextInput
                    placeHolder="Search"
                    onChangeText={(text) => handlePress(text)}
                    style={styles.TEXTINPUT_CONTAINER}
                />
                <Icon name="close" size={30}
                    color="#ffffff"
                    style={{ padding: 20 }}
                    onPress={() => props.navigation.goBack()} />
            </View>
            <ListView
                items={search}
                keyExtractor={item => item.char_id}
                numColumns={2}
                renderItem={({ item }) => {
                    return (
                        <ListCard
                            data={item}
                            navigation={props.navigation}
                            onclicked={() => onclicked(item)}
                            ifExist={() => ifExist(item)}
                            removeFromList={() => removeFromList(item)}
                            onFavoorateItem={() => onFavoorateItem(item)}
                        />

                    )
                }}
            />
        </View>

    )

}
const styles = StyleSheet.create({
    CONTAINER: {
        flex: 1,
        backgroundColor: '#000000'
    },
    HEADER_STYLE: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "#141414",
    },
    TEXTINPUT_CONTAINER: {
        backgroundColor: "#141414",
        height: 80,
        fontSize: 24,
        color: '#ffffff',
        flex: 1,
    }

})
export default SearchBox;