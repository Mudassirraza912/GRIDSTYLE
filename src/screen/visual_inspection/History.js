import React, {Component} from 'react'
import {Text, View, SafeAreaView, ScrollView, StatusBar, TextInput, Image} from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'

import PrimaryLoadingView from '../../component/PrimaryLoadingView'
import styles from '../../styles'

import {connect} from 'react-redux'
import {loadActivities} from '../../model/controller/activityController'

import ExpansionPanel from '../../component/ExpansionPanel'
import IconTouchable from '../../component/IconTouchable'

import Lang from '../../localization/lang'

class History extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        activities: [],
        searching: false,
        search: '',
        loading: true
    }

    componentWillMount = () => {
        let fromScreen = this.props.navigation.getParam('from')

        if (fromScreen === 'chooseSubstation' || fromScreen === 'login')
            this.leftIcon = (
                <IconTouchable onPress={() => this.props.navigation.navigate('Menu')} left>
                    <Image source={require('../../../assets/png/menu.png')} style={{width: 24, height: 20}}/>
                </IconTouchable>
            )
        else this.leftIcon = (
            <IconTouchable onPress={() => this.props.navigation.goBack()} left>
                <Image source={require('../../../assets/png/back.png')} style={{width: 13, height: 21}}/>
            </IconTouchable>
        )

        isMaintenance = this.props.navigation.getParam('isMaintenance')
        this.props.loadActivities(this.props.token, this.props.companyId, isMaintenance, this.props.defaultSubstation)
            .then(() => this.setState({activities: this.props.activities, loading: false}))
    }

    handleSearch = () => {
        query = this.state.search
        filteredActivities = this.props.activities
            .filter(activity => activity.type.includes(query) || activity.unit.includes(query) || activity.site.includes(query)
                || activity.stationId.includes(query) || activity.area.includes(query)
                || activity.responsible.includes(query) || activity.participants.includes(query)
                || activity.comments.includes(query))
        this.setState({activities: filteredActivities})
    }

    showActivity = activity => {
        this.props.navigation.navigate('ActivityDetails', {activity})
    }

    render() {
        const {visualInspectionHistory, maintenanceHistory} = Lang[this.props.language];
        const stringConstant = Lang[this.props.language];

        return (
            <GestureRecognizer backgroundColor='#236CF6'
                               onSwipeRight={(state) => this.props.navigation.navigate('Menu')}>
                <SafeAreaView backgroundColor='#236CF6'></SafeAreaView>
                <StatusBar barStyle="light-content"/>
                <SafeAreaView style={styles.grayContainer}>

                    <View style={{height: 54}}>
                        {
                            this.state.searching ?
                                (
                                    <View style={styles.searchBar}>
                                        <IconTouchable onPress={() => this.setState({
                                            searching: false,
                                            search: ''
                                        }, this.handleSearch)} left>
                                            <Image source={require('../../../assets/png/search_back.png')}
                                                   style={{opacity: 0.5, width: 24, height: 24}}/>
                                        </IconTouchable>

                                        <View style={styles.searchWrapper}><TextInput style={styles.searchInput}
                                                                                      placeholder={stringConstant.typeHere + '...'}
                                                                                      autoFocus returnKeyType='search'
                                                                                      onChangeText={text => this.setState({search: text}, this.handleSearch)}/></View>

                                        <IconTouchable onPress={this.handleSearch} right>
                                            <Image source={require('../../../assets/png/search_black.png')}
                                                   style={{opacity: 0.5, width: 24, height: 24}}/>
                                        </IconTouchable>
                                    </View>
                                ) : (

                                    <View style={styles.header}>
                                        {this.leftIcon}
                                        <Text
                                            style={styles.headerText}>{this.props.navigation.getParam('isMaintenance') ? maintenanceHistory : visualInspectionHistory}</Text>
                                        <IconTouchable right onPress={() => this.setState({searching: true})}>
                                            <Image source={require('../../../assets/png/search.png')}
                                                   style={{width: 24, height: 24}}/>
                                        </IconTouchable>
                                    </View>
                                )
                        }
                    </View>
                    <PrimaryLoadingView loading={this.state.loading}>
                        <ScrollView style={styles.centerContainer}>
                            <View style={{marginBottom: 15}}/>
                            {
                                this.state.activities.map((activity, ind) => (
                                    <ExpansionPanel language={this.props.language} key={ind} activity={activity}
                                                    handlePress={() => this.showActivity(activity)}/>
                                ))
                            }
                            <View style={{marginBottom: 20}}/>
                        </ScrollView>
                    </PrimaryLoadingView>
                </SafeAreaView>
            </GestureRecognizer>
        )
    }
}

mapStateToProps = state => {
    return {
        token: state.token,
        companyId: state.companyId,
        activities: state.activities,
        language: state.language,
        defaultSubstation: state.defaultSubstation
    }
}

export default connect(mapStateToProps, {loadActivities})(History)