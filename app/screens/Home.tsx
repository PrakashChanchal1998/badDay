import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Header from '../components/Header'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListView } from '../components/ListView'
import Axios from "axios"
import { API_CALL, FAVOURATE_LIST, REMOVE_LIST, PROFILE_DETAIL } from "../store/action/Count"
import ListCard from '../components/ListCard';
const Home = (props) => {
  const details = useSelector(state => state)
  const dispatch = useDispatch()
  useEffect(() => {
    getCharacterDetails()
  }, [])

  const getCharacterDetails = async () => {
    let res = await Axios.get(
      'https://www.breakingbadapi.com/api/characters'

    );
    if (res.status == 200) {
      dispatch({ type: API_CALL, payload: res.data })
    }
  }
  const onFavoorateItem = (item) => {
    dispatch({ type: FAVOURATE_LIST, payload: item })
  }
  const removeFromList = (character) => {
    const { favourateList } = details.character
    const filteredList = favourateList.filter(item => item.char_id != character.char_id)
    dispatch({ type: REMOVE_LIST, payload: filteredList })
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
  const onclicked = (data) => {
    const { navigation } = props
    dispatch({ type: PROFILE_DETAIL, payload: data })
    navigation.navigate('ProfileDetails')
  }

  const { characterDetails,favourateList } = details.character
  return (
    <View style={styles.CONTAINER}>
      <Header
        navigation={props.navigation}
        listData={favourateList}
      />
      <ListView
        items={characterDetails}
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
  }
})
export default Home