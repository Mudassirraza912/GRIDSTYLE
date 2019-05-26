import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'

import IconTouchable from '../component/IconTouchable'
import styles from '../styles'

import { connect } from 'react-redux'
import { logOut } from '../model/controller/logInController'
import Lang from '../localization/lang'

class Settings extends Component {
    static navigationOptions = {
        header: null
    }

    navigate = (routeName) => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: routeName })]
            })
        )
    }

    handleLogOut = () => {
        this.props.logOut()
        this.navigate('Login')
    }

    render() {
        const selectedIcon = <Image source={require('../../assets/png/blue_checked.png')} style={{ width: 12, height: 10 }} />
        const stringConstant = Lang[this.props.language];

        return (
            <View backgroundColor='#236CF6'>
                <SafeAreaView backgroundColor='#236CF6' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.grayContainer}>
                    <View style={{ height: 54 }}>
                        <View style={styles.header}>
                            <IconTouchable left onPress={() => this.props.navigation.goBack()}>
                                <Image source={require('../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                            </IconTouchable>
                            <Text style={[styles.headerText, { marginRight: 20 }]}>{stringConstant.settings}</Text>
                            <View style={{ width: 45 }} />
                        </View>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.valueText}></Text>
                        <TouchableOpacity style={styles.lightItemPanel} onPress={() => this.props.navigation.navigate('ChangeLanguage')}>
                            <Text style={styles.valueText}>{stringConstant.changeLanguage}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.lightItemPanel} onPress={() => this.props.navigation.navigate('ChooseSubstation')}>
                            <Text style={styles.valueText}>{stringConstant.changeDefaultSubstation}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.lightItemPanel, { borderTopColor: '#E5E5E5', borderTopWidth: 1, marginTop: 30, justifyContent: 'center' }]}
                            onPress={this.handleLogOut}
                        >
                            <Text style={styles.redText}>{stringConstant.signOut}</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

mapStateToProps = state => {
    return {
        language: state.language,
    }
}

export default connect(mapStateToProps, { logOut })(Settings)