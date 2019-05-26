import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, Image } from 'react-native'

import TabNavigator from './TabNavigator'
import IconTouchable from '../../../../component/IconTouchable'
import styles from '../../../../styles'

class AddMaintenance extends Component {
    static router = TabNavigator.router

    static navigationOptions = {
        header: null
    }

    maintenance = {
        unitId: this.props.navigation.getParam('unitId'),
        date: '',
        participants: '',
        gasSamples: undefined,
        oilSamples: undefined,
        comments: '',
        documents: [],
        answers: []
    }

    render() {
        return (
            <View backgroundColor='#236CF6'>
                <SafeAreaView backgroundColor='#236CF6' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <IconTouchable left onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                        </IconTouchable>
                        <View style={styles.headerTitleView}><Text style={styles.headerTextLeft}>Add maintenance</Text></View>
                    </View>

                    <TabNavigator navigation={this.props.navigation} screenProps={this.maintenance} />

                </SafeAreaView>
            </View>
        )
    }
}

export default AddMaintenance