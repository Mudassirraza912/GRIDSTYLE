import React, {Component} from 'react'
import {Text, View, SafeAreaView, ScrollView, StatusBar, TextInput, Image, Picker} from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'

import ExpansionPanel from './ExpansionPanel'
import PrimaryLoadingView from '../../component/PrimaryLoadingView'
import styles from '../../styles'
import IconTouchable from '../../component/IconTouchable'

import {connect} from 'react-redux'
import {loadLogs} from '../../model/controller/logController'

import Lang from '../../localization/lang'

class LogBook extends Component {
    static navigationOptions = {
        header: null
    }

    initialState = {
        unit: null,
        unitId: null,
        location: null,
        locationId: null,
        logs: [],
        searching: false,
        search: '',
        loading: true
    }

    state = {}
    logList = []

    handleSearch = () => {
        query = this.state.search
        filteredLogs = this.props.logs
            .filter(log => log.event.includes(query) || log.responsible.includes(query) || log.comment.includes(query))
        this.setState({logs: filteredLogs})
    }

    componentWillMount = () => {
        this.setState(this.initialState)
        this.props.loadLogs(this.props.token, this.props.companyId, this.props.language).then(() => this.setState({
            logs: this.props.logs,
            loading: false
        }))
    }

    // filteredList = () => {
    //     this.logList = []

    //     if(this.state.locationId){
    //         if(this.state.unitId) {
    //             this.state.logs
    //                 .filter(item => item.location === this.state.locationId && item.unit === this.state.unitId)
    //                 .map(log => (
    //                     this.logList.push(log)
    //                 ))
    //         } else {
    //             this.state.logs
    //                 .filter(item => item.location === this.state.locationId)
    //                 .map(log => (
    //                     this.logList.push(log)
    //                 ))
    //         }

    //     } else {
    //         this.logList = this.state.logs
    //     }
    // }

    render() {
        // if(this.state.locationId){
        //     if(this.state.unitId) {
        //         this.state.logs
        //             .filter(item => item.location === this.state.locationId && item.unit === this.state.unitId)
        //             .map(log => (
        //                 this.logList.push(log)
        //             ))
        //     } else {
        //         this.state.logs
        //             .filter(item => item.location === this.state.locationId)
        //             .map(log => (
        //                 this.logList.push(log)
        //             ))
        //     }

        // } else {
        //     this.logList = this.state.logs
        // }
        const {logBook} = Lang[this.props.language]
        return (
            <GestureRecognizer backgroundColor='#236CF6'
                               onSwipeRight={(state) => this.props.navigation.navigate('Menu')}>
                <SafeAreaView backgroundColor='#236CF6'></SafeAreaView>
                <StatusBar barStyle="light-content"/>
                <SafeAreaView style={styles.grayContainer}>

                    {
                        this.state.searching ?
                            (
                                <View style={styles.searchBar}>
                                    <IconTouchable
                                        onPress={() => this.setState({searching: false, search: ''}, this.handleSearch)}
                                        left>
                                        <Image source={require('../../../assets/png/search_back.png')}
                                               style={{opacity: 0.5, width: 24, height: 24}}/>
                                    </IconTouchable>

                                    <View style={styles.searchWrapper}><TextInput style={styles.searchInput}
                                                                                  placeholder='Type here...' autoFocus
                                                                                  returnKeyType='search'
                                                                                  onChangeText={text => this.setState({search: text}, this.handleSearch)}/></View>

                                    <IconTouchable onPress={this.handleSearch} right>
                                        <Image source={require('../../../assets/png/search_black.png')}
                                               style={{opacity: 0.5, width: 24, height: 24}}/>
                                    </IconTouchable>
                                </View>
                            ) : (

                                <View style={styles.header}>
                                    <IconTouchable left onPress={() => this.props.navigation.goBack()}>
                                        <Image source={require('../../../assets/png/back.png')}
                                               style={{width: 13, height: 21}}/>
                                    </IconTouchable>
                                    <Text style={styles.headerText}>{logBook}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <IconTouchable right onPress={() => this.props.navigation.navigate('AddNewLog')}>
                                            <Image source={require('../../../assets/png/plus_white.png')}
                                                   style={{width: 24, height: 24}}/>
                                        </IconTouchable>
                                        <IconTouchable right onPress={() => this.setState({searching: true})}>
                                            <Image source={require('../../../assets/png/search.png')}
                                                   style={{width: 24, height: 24}}/>
                                        </IconTouchable>
                                    </View>

                                </View>
                            )
                    }

                    <PrimaryLoadingView loading={this.state.loading}>
                        <ScrollView style={styles.centerContainer}>
                            <View style={{marginBottom: 15}}/>
                            {/* <View style={styles.panel_small}>
                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>Substations</Text>
                                </View>
                                <View style={styles.picker_block}>
                                    <View style={styles.valueContainer}>
                                        <Picker
                                            style={styles.pickerContainer}
                                            selectedValue={this.state.location}
                                            onValueChange={itemValue => {
                                                if(itemValue) {
                                                    this.setState({ 
                                                            location: itemValue, 
                                                            locationId: this.props.locations.find(location => 
                                                                location.name === itemValue
                                                                ).id,
                                                            unit: null,
                                                            unitId: null
                                                        }, this.filteredList)
                                                } else {
                                                    this.setState({ 
                                                            location: itemValue, 
                                                            locationId: itemValue,
                                                            unit: null,
                                                            unitId: null
                                                        }, this.filteredList)
                                                }
                                            }
                                            }>
                                            <Picker.Item style={styles.valueText} key={null} label={'-'} value={null} />
                                            {this.props.locations.map((item, ind) => (<Picker.Item style={styles.valueText} key={ind} label={item.name} value={item.name} />))}
                                        </Picker>
                                    </View>
                                </View>

                                <View style={styles.infoRow}>
                                    <Text style={styles.keyText}>Unit</Text>
                                </View>
                                <View style={styles.picker_block}>
                                    <View style={styles.valueContainer}>
                                        <Picker
                                            style={styles.pickerContainer}
                                            enabled={!this.state.fixedUnit}
                                            selectedValue={this.state.unit}
                                            onValueChange={
                                                itemValue => {
                                                    if(itemValue) {
                                                        this.setState({ unit: itemValue, unitId: this.props.units.find(unit => unit.name === itemValue).id }, this.filteredList)
                                                    } else {
                                                        this.setState({ unit: itemValue, unitId: itemValue }, this.filteredList)
                                                    }
                                                }
                                            }>
                                            <Picker.Item style={styles.valueText} key={null} label={'-'} value={null} />
                                            {this.props.units
                                                .filter(item => item.locationId === this.state.locationId)
                                                .map((item, ind) => (<Picker.Item style={styles.valueText} key={ind} label={item.name} value={item.name} />))
                                            }
                                        </Picker>
                                    </View>
                                </View>
                            </View> */}
                            {
                                // 
                                this.state.logs
                                    .map(log => (
                                        <ExpansionPanel
                                            stringConstants={Lang[this.props.language]}
                                            key={log.id} log={log}/>
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
        logs: state.logs,
        language: state.language,
        units: state.units,
        locations: state.childLocations,
        language: state.language
    }
}

export default connect(mapStateToProps, {loadLogs})(LogBook)