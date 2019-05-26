import React, { Component } from 'react'
import { Text, View, SafeAreaView, StatusBar, Image } from 'react-native'

import TabNavigator from './TabNavigator'
import styles from '../../../styles'
import IconTouchable from '../../../component/IconTouchable'

import { connect } from 'react-redux'
import { loadActivityQuestions, addActivity } from '../../../model/controller/activityController'

import Lang from '../../../localization/lang'

class StartVisualInspection extends Component {
    static router = TabNavigator.router

    static navigationOptions = {
        header: null
    }

    state = {
        ready: false
    }

    activity = {
        date: '',
        comments: '',
        participants: '',
        location: this.props.navigation.getParam('locationId'),
        locationName: this.props.locations.find(location => location.id == this.props.navigation.getParam('locationId')).name,
        answers: {},
        attachments: []
    }

    render() {
        const { startVisualInspection } = Lang[this.props.language]
        return (
            <View backgroundColor='#236CF6'>
                <SafeAreaView backgroundColor='#236CF6' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <IconTouchable onPress={() => this.props.navigation.goBack()} left>
                            <Image source={require('../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                        </IconTouchable>
                        <View style={styles.headerTitleView}><Text style={styles.headerTextLeft}>{startVisualInspection}</Text></View>
                    </View>

                    <TabNavigator
                        navigation={this.props.navigation}
                        screenProps={this.activity}
                        addActivity = {() => { console.log(this.activity); this.props.addActivity(this.props.token, this.activity)}}
                    />
                </SafeAreaView>
            </View>
        )
    }
}

mapStateToProps = state => {
    return {
        token: state.token,
        companyId: state.companyId,
        language: state.language,
        activityQuestions: state.activityQuestions,
        locations: state.childLocations,
        units: state.units,
    }
}

export default connect(mapStateToProps, { loadActivityQuestions, addActivity })(StartVisualInspection)