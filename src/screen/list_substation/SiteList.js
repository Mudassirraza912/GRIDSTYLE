import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'
import GestureRecognizer from 'react-native-swipe-gestures'

import styles from '../../styles'
import PrimaryLoadingView from '../../component/PrimaryLoadingView'
import IconTouchable from '../../component/IconTouchable'

import { connect } from 'react-redux'
import { loadStations } from '../../model/controller/stationController'

import Lang from '../../localization/lang'

class SiteList extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        loading: true
    }

    componentWillMount = () => {
        this.props.loadStations(this.props.token, this.props.companyId).then(() => {
            this.setState({ loading: false })
        })
    }

    renderStationsTree = (node = this.props.stationsGraph, lvl = 1) => {
        if (node.children) return (
            node.children.map(child => this.renderStationsTree(child, lvl + 1))

            // <Collapse key={node.id}>
            //     <CollapseHeader style={styles.itemPanel}>
            //         <Text style={[styles.valueText, { marginLeft: 20 * lvl }]}>{node.name}</Text>
            //     </CollapseHeader>
            //     <CollapseBody>
            //         {
            //             node.children.map(child => this.renderStationsTree(child, lvl + 1))
            //         }
            //     </CollapseBody>
            // </Collapse>
        )
        else return (
            <TouchableOpacity
                style={styles.subItemPanel}
                key={node.id}
                // onPress={() => this.props.navigation.navigate('StationsInformation',
                // { station: this.props.stations.find(station => station.id === node.id), language: this.props.language })
                //     }
            >
                <Text style={[styles.valueText, { marginLeft: 20 }]}>{node.name}</Text>
                {/*<Image source={require('../../../assets/png/go.png')} style={{ width: 7, height: 13 }} />*/}
            </TouchableOpacity>
        )
    }

    render() {
        const { listSubstation } = Lang[this.props.language]
        // console.warn('site list station graph', this.props.stationsGraph)
        return (
            <GestureRecognizer backgroundColor='#236CF6' onSwipeRight={(state) => this.props.navigation.navigate('Menu')}>
                <SafeAreaView backgroundColor='#236CF6' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <IconTouchable onPress={() => this.props.navigation.navigate('Menu')} left>
                            <Image source={require('../../../assets/png/menu.png')} style={{ width: 24, height: 20 }} />
                        </IconTouchable>
                        <Text style={styles.headerTextLeft}>{listSubstation}</Text>
                        <View />
                    </View>

                    <PrimaryLoadingView loading={this.state.loading}>
                        <ScrollView>
                            {this.props.stationsGraph && this.renderStationsTree()}
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
    stations: state.stations,
    stationsGraph: state.stationsGraph,
    language: state.language
})

export default connect(mapStateToProps, { loadStations })(SiteList)