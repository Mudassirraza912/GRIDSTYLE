import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'

import styles from '../../../styles'
import PrimaryLoadingView from '../../../component/PrimaryLoadingView'
import IconTouchable from '../../../component/IconTouchable'

import { connect } from 'react-redux'
import { loadUnits } from '../../../model/controller/unitController'

import Lang from '../../../localization/lang'

class UnitList extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        loading: true,
        locationId: null
    }

    componentWillMount = () => {
        this.setState({ locationId: this.props.navigation.getParam('locationId') || this.props.defaultSubstation })
        this.props.loadUnits(this.props.token, this.props.companyId).then(() => this.setState({ loading: false }))
    }

    render() {
        const { unitList } = Lang[this.props.language]
        return (
            <GestureRecognizer backgroundColor='#236CF6' onSwipeRight={(state) => this.props.navigation.navigate('Menu')}>
                <SafeAreaView backgroundColor='#236CF6' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <IconTouchable onPress={() => this.props.navigation.goBack()} left>
                            <Image source={require('../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                        </IconTouchable>
                        <Text style={styles.headerTextLeft}>{unitList}</Text>
                        <View style={{ width: 30 }}/>
                    </View>
                    <PrimaryLoadingView loading={this.state.loading}>
                        <ScrollView>
                            {
                                this.props.units && this.props.units.filter(unit => unit.siteId === this.state.locationId ).map(unit => (
                                    <TouchableOpacity
                                        style={styles.itemPanel}
                                        key={unit.id}
                                        onPress={() => this.props.navigation.navigate('UnitsInformation', { unit: unit, language: this.props.language })}
                                    >
                                        <Text style={styles.valueText}>{unit.name}</Text>
                                        <Image source={require('../../../../assets/png/go.png')} style={{ width: 7, height: 13 }} />
                                    </TouchableOpacity>
                                ))
                            }
                            <View style={{ marginBottom: 15 }} />
                        </ScrollView>
                    </PrimaryLoadingView>
                </SafeAreaView>
            </GestureRecognizer>
        )
    }
}

mapStateToProps = state => ({
    token: state.token,
    companyId: state.companyId,
    units: state.extendedUnits,
    language: state.language,
    defaultSubstation: state.defaultSubstation
})

export default connect(mapStateToProps, { loadUnits })(UnitList)