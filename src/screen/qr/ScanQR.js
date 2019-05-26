import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image } from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'
import GestureRecognizer from 'react-native-swipe-gestures'

import styles from '../../styles'
import IconTouchable from '../../component/IconTouchable'

import Lang from '../../localization/lang'

export default class ScanQR extends React.Component {
    static navigationOptions = {
        header: null
    }

    state = {
        hasCameraPermission: null,
        data: null,
        language: 'EN'
    }

    componentWillMount() {
        this.setState({ language: this.props.navigation.getParam('language') })
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    handleScan = ({ type, data }) => this.setState({ data: data }) //TODO get information from link

    render() {
        const { hasCameraPermission } = this.state
        const { qrCode, siteInformation, lastActivities, plannedActivities } = Lang[this.state.language]

        if (hasCameraPermission === null)
            return <Text>Requesting for camera permission</Text>
        if (hasCameraPermission === false)
            return <Text>No access to camera</Text>


        if (this.state.data) return (
            <GestureRecognizer backgroundColor='#236CF6' onSwipeRight={(state) => this.props.navigation.navigate('Menu')}>
                <SafeAreaView backgroundColor='#236CF6' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <IconTouchable onPress={() => this.props.navigation.navigate('Menu')} left>
                            <Image source={require('../../../assets/png/menu.png')} style={{ width: 24, height: 20 }} />
                        </IconTouchable>
                        <View style={styles.headerTitleView}><Text style={styles.headerTextLeft}>{qrCode}</Text></View>
                    </View>

                    <TouchableOpacity
                        style={styles.itemPanel}
                        onPress={() => this.props.navigation.navigate('StationsInformation', { documents: this.state.data.siteInformation, language: this.props.language })}>
                        <Text style={styles.valueText}>{siteInformation}</Text>
                        <View><Image source={require('../../../assets/png/go.png')} style={{ width: 7, height: 13 }} /></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.itemPanel}
                        onPress={() => this.props.navigation.navigate('Activities', { documents: this.state.data.lastActivities, from: 'qr' })}>
                        <Text style={styles.valueText}>{lastActivities}s</Text>
                        <View><Image source={require('../../../assets/png/go.png')} style={{ width: 7, height: 13 }} /></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.itemPanel}
                        onPress={() => this.props.navigation.navigate('Planning', { documents: this.state.data.plannedActivities })}>
                        <Text style={styles.valueText}>{plannedActivities}</Text>
                        <View><Image source={require('../../../assets/png/go.png')} style={{ width: 7, height: 13 }} /></View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ margin: 10 }} onPress={() => this.props.navigation.navigate('StartVisualInspection')}><Text style={styles.linkText}>+ Add visual inspection</Text></TouchableOpacity>

                </SafeAreaView>
            </GestureRecognizer>
        )
        else return (
            <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')} style={{ position: 'absolute', top: 50, left: 20, zIndex: 100 }}>
                <Image source={require('../../../assets/png/close.png')} style={{ width: 22, height: 22 }} />
                </TouchableOpacity>

                <BarCodeScanner
                    onBarCodeScanned={this.handleScan}
                    style={StyleSheet.absoluteFill}
                />
            </View>
        )
    }
}