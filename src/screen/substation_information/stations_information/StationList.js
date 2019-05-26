import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'
import GestureRecognizer from 'react-native-swipe-gestures'

import styles from '../../../styles'
import PrimaryLoadingView from '../../../component/PrimaryLoadingView'
import IconTouchable from '../../../component/IconTouchable'

import { connect } from 'react-redux'
import { loadStations } from '../../../model/controller/stationController'

import Lang from '../../../localization/lang'

class StationList extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        loading: true,
        s:this.props.navigation.getParam('s', ''),
        station:{}
    }

    componentWillMount = () => {
        this.props.loadStations(this.props.token, this.props.companyId).then(() => {
            // setTimeout(()=>{
                station=this.props.stations.find(station => station.id === this.state.s);
                this.setState({ loading: false,station:station })
            // },10000);
        })
    }

    render() {
        const { stationInformation } = Lang[this.props.language]
        return (
            <GestureRecognizer backgroundColor='#236CF6' onSwipeRight={(state) => this.props.navigation.navigate('Menu')}>
                <SafeAreaView backgroundColor='#236CF6' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <IconTouchable onPress={() => this.props.navigation.navigate('Menu')} left>
                            <Image source={require('../../../../assets/png/menu.png')} style={{ width: 24, height: 20 }} />
                        </IconTouchable>
                        <Text style={styles.headerTextLeft}>{stationInformation}</Text>
                        <View style={{ width: 30 }}/>
                    </View>
                    <PrimaryLoadingView loading={this.state.loading}>
                    <ScrollView style={styles.centerContainer}>
                            <View style={{ marginBottom: 15 }} />

                            <View style={styles.panel}>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>Station ID:</Text>
                                    <Text style={styles.valueText}>{this.state.station.stationId}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>Area:</Text>
                                    <Text style={styles.valueText}>{this.state.station.area}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>City:</Text>
                                    <Text style={styles.valueText}>{this.state.station.city}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>Address:</Text>
                                    <Text style={styles.valueText}>{this.state.station.address}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>System voltage 1:</Text>
                                    <Text style={styles.valueText}>{this.state.station.systemVoltage1}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>System voltage 2:</Text>
                                    <Text style={styles.valueText}>{this.state.station.systemVoltage2}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>System voltage 3:</Text>
                                    <Text style={styles.valueText}>{this.state.station.systemVoltage3}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>QR:</Text>
                                    <Text style={styles.valueText}>{this.state.station.qr}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>Other:</Text>
                                    <Text style={styles.valueText}>{this.state.station.other}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={[styles.itemPanel, { marginTop: 10, borderTopWidth: 1, borderTopColor: '#E5E5E5' }]}
                                onPress={() => this.props.navigation.navigate('StationDocuments', { documents: this.state.station.documents })}>
                                <Text style={styles.valueText}>Documents</Text>
                                <View><Image source={require('../../../../assets/png/go.png')} style={{ width: 7, height: 13 }} /></View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.itemPanel}
                                onPress={() => this.props.navigation.navigate('StationContact', { contact: this.state.station.contact })}>
                                <Text style={styles.valueText}>Contact</Text>
                                <View><Image source={require('../../../../assets/png/go.png')} style={{ width: 7, height: 13 }} /></View>
                            </TouchableOpacity>

                            <View style={{ marginBottom: 25 }} />
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
    stations: state.stations,
    stationsGraph: state.stationsGraph,
    language: state.language
})

export default connect(mapStateToProps, { loadStations })(StationList)