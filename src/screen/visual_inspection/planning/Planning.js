import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, TextInput, Image } from 'react-native'

import Panel from './Panel'
import IconTouchable from '../../../component/IconTouchable'
import PrimaryLoadingView from '../../../component/PrimaryLoadingView'
import styles from '../../../styles'

import { connect } from 'react-redux'
import { loadPlannedActivities } from '../../../model/controller/activityController'

import Lang from '../../../localization/lang'

class Planning extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        activities: [],
        searching: false,
        search: '',
        loading: true
    }

    handleSearch = () => {
        query = this.state.search
        filteredActivities = this.props.activities
            .filter(activity => activity.type.includes(query) || activity.unit.includes(query))
        this.setState({ activities: filteredActivities })
    }

    componentWillMount = () => {
        this.props.loadPlannedActivities(this.props.token, this.props.companyId, this.props.defaultSubstation)
            .then(() => this.setState({ activities: this.props.activities, loading: false }))
    }

    render() {
        const { planning } = Lang[this.props.language]
        const stringConstants = Lang[this.props.language]
        return (

            <View backgroundColor='#236CF6'>
                <SafeAreaView backgroundColor='#236CF6' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.grayContainer}>


                    <View style={{ height: 54 }}>
                        {
                            this.state.searching ?
                                (
                                    <View style={styles.searchBar}>
                                        <IconTouchable onPress={() => this.setState({ searching: false, search: '' }, this.handleSearch)} left>
                                            <Image source={require('../../../../assets/png/search_back.png')} style={{ opacity: 0.5, width: 24, height: 24 }} />
                                        </IconTouchable>

                                        <View style={styles.searchWrapper}><TextInput style={styles.searchInput} placeholder={stringConstants.typeHere} autoFocus returnKeyType='search' onChangeText={text => this.setState({ search: text }, this.handleSearch)} /></View>

                                        <IconTouchable onPress={this.handleSearch} right>
                                            <Image source={require('../../../../assets/png/search_black.png')} style={{ opacity: 0.5, width: 24, height: 24 }} />
                                        </IconTouchable>
                                    </View>
                                ) : (

                                    <View style={styles.header}>
                                        <IconTouchable left onPress={() => this.props.navigation.goBack()}>
                                            <Image source={require('../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                                        </IconTouchable>
                                        <Text style={styles.headerText}>{planning}</Text>
                                        <IconTouchable right onPress={() => this.setState({ searching: true })}>
                                            <Image source={require('../../../../assets/png/search.png')} style={{ width: 24, height: 24 }} />
                                        </IconTouchable>
                                    </View>
                                )
                        }
                    </View>

                    <PrimaryLoadingView loading={this.state.loading}>
                        <ScrollView style={styles.centerContainer}>
                            <View style={{ marginBottom: 15 }} />

                            {
                                this.state.activities.map((activity, ind) => (
                                    <Panel stringConstants={stringConstants} key={ind} activity={activity} />
                                ))
                            }

                            <View style={{ marginBottom: 15 }} />
                        </ScrollView>
                    </PrimaryLoadingView>
                </SafeAreaView>
            </View>
        )
    }
}

mapStateToProps = state => {
    return {
        token: state.token,
        companyId: state.companyId,
        activities: state.plannedActivities,
        language: state.language,
        defaultSubstation: state.defaultSubstation
    }
}

export default connect(mapStateToProps, { loadPlannedActivities })(Planning)