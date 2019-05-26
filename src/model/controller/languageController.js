import { CHANGE_LANGUAGE } from '../actionTypes'
import { AsyncStorage } from 'react-native'

export const changeLanguage = (language) =>
    dispatch => {
        AsyncStorage.setItem('language', language)
        dispatch(dispatchChangeLanguage(language))
    }
        

const dispatchChangeLanguage = language => ({
    type: CHANGE_LANGUAGE,
    language
})