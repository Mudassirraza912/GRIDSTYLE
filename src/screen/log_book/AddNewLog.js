import React, {Component} from 'react'
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    Picker,
    Alert
} from 'react-native'
import {Menu, MenuTrigger, MenuOptions, MenuOption, MenuProvider} from 'react-native-popup-menu'
import {DocumentPicker, ImagePicker, Permissions} from 'expo'
import * as mime from 'react-native-mime-types'

import ShiftScrollView from '../../component/ShiftScrollView'
import styles from '../../styles'
import IconTouchable from '../../component/IconTouchable'

import {EVENT_TYPES} from '../../model/constants'
import {connect} from 'react-redux'
import {addLog} from '../../model/controller/logController'

import Lang from '../../localization/lang'

class AddNewLog extends Component {
    static navigationOptions = {
        header: null
    }

    initialState = {
        event: '',
        unit: this.props.units[0].name,
        unitId: null,
        location: this.props.locations[0].name,
        locationId: this.props.locations[0].id,
        files: []
    }

    componentWillMount = () =>
        this.setState(this.initialState)

    log = {
        eventId: 0,
        responsibleId: 0,
        comment: '',
        unitId: 0,
        locationId: 0,
        attachments: []
    }

    attachFile = async () => {
        const stringConstant = Lang[this.props.language]
        DocumentPicker.getDocumentAsync({}).then(fileInfo => {
            if (fileInfo.type === 'cancel')
                return
            else if (fileInfo.size < 10 * 8 * 1024) {
                formData = new FormData()
                formData.append('file', {
                    uri: fileInfo.uri,
                    name: fileInfo.name,
                    type: mime.lookup(fileInfo.name.split('.').reverse()[0])
                })
                this.log.attachments.push({name: fileInfo.name, formData: formData, filepath: fileInfo.uri});
                this.forceUpdate()
            } else
                Alert.alert('', stringConstant.fileHasToBeLessThan10Mb)
        })
    }

    takePhoto = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        const {status2} = await Permissions.askAsync(Permissions.CAMERA_ROLL)

        //if (status === 'granted' && status2 === 'granted') {
        const image = await ImagePicker.launchCameraAsync({allowEditing: false})
        if (!image.cancelled) {
            const name = `Image-${this.state.imageCount}.jpg`

            formData = new FormData()
            formData.append('file', {uri: image.uri, name: name, type: mime.lookup('jpg')})
            this.log.attachments.push({name: name, formData: formData, filepath: image.uri});
            this.forceUpdate()
        }
        //}
    }

    handleAdd = () => {
        const stringConstants = Lang[this.props.language]

        if (this.log.comment === '')
            Alert.alert('', stringConstants.logCommentCannotBeEmpty)
        else {
            this.log.eventId++
            this.log.unitId = this.state.unit ? this.state.unitId : null
            this.log.locationId = this.state.locationId
            this.log.responsibleId = this.props.userId
            this.props.addLog(this.props.token, this.log)

            this.log.eventId = 0
            this.log.responsibleId = 0
            this.log.comment = ''
            this.log.unitId = 0
            this.log.locationId = 0
            this.log.attachments = []
            this.comment.clear()
            this.setState(this.initialState)
            this.forceUpdate()
        }
    }

    render() {
        const {addNewLog} = Lang[this.props.language]
        const stringConstants = Lang[this.props.language]

        return (
            <View backgroundColor='#236CF6'>
                <SafeAreaView backgroundColor='#236CF6'></SafeAreaView>
                <StatusBar barStyle="light-content"/>
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <IconTouchable onPress={() => this.props.navigation.goBack()} left>
                            <Image source={require('../../../assets/png/back.png')} style={{width: 13, height: 21}}/>
                        </IconTouchable>
                        <View style={styles.headerTitleView}><Text
                            style={styles.headerTextLeft}>{addNewLog}</Text></View>
                    </View>

                    <ScrollView style={styles.centerContainer}>
                        <ShiftScrollView>
                            <MenuProvider>
                                <Text style={styles.keyText}>{stringConstants.siteArea}</Text>
                                <View style={styles.valueContainer}>
                                    <Picker
                                        style={styles.pickerContainer}
                                        selectedValue={this.state.location}
                                        onValueChange={itemValue => this.setState({
                                            location: itemValue,
                                            locationId: this.props.locations.find(location => location.name === itemValue).id
                                        })}>
                                        {this.props.locations.map((item, ind) => (
                                            <Picker.Item style={styles.valueText} key={ind} label={item.name}
                                                         value={item.name}/>))}
                                    </Picker>
                                </View>

                                <Text style={styles.keyText}>Unit</Text>
                                <View style={styles.valueContainer}>
                                    <Picker
                                        style={styles.pickerContainer}
                                        enabled={!this.state.fixedUnit}
                                        selectedValue={this.state.unit}
                                        onValueChange={itemValue => {
                                            if (itemValue) {
                                                this.setState({
                                                    unit: itemValue,
                                                    unitId: this.props.units.find(unit => unit.name === itemValue).id
                                                })
                                            } else {
                                                this.setState({unit: itemValue, unitId: itemValue})
                                            }
                                        }
                                        }>
                                        <Picker.Item style={styles.valueText} key={null} label={'Leave Empty'}
                                                     value={null}/>
                                        {this.props.units
                                            .filter(item => item.locationId === this.state.locationId)
                                            .map((item, ind) => (
                                                <Picker.Item style={styles.valueText} key={ind} label={item.name}
                                                             value={item.name}/>))
                                        }
                                    </Picker>
                                </View>

                                <Text style={styles.keyText}>{stringConstants.event}</Text>
                                <View style={styles.valueContainer}>
                                    <Picker
                                        style={styles.pickerContainer}
                                        selectedValue={this.state.event}
                                        onValueChange={(itemValue, itemIndex) => {
                                            this.log.eventId = itemIndex;
                                            this.setState({event: itemValue})
                                        }}>
                                        {EVENT_TYPES.map((item, ind) => (
                                            <Picker.Item style={styles.valueText} key={ind} label={item}
                                                         value={item}/>))}
                                    </Picker>
                                </View>

                                <Text style={styles.keyText}>{stringConstants.comments}</Text>
                                <View style={styles.valueContainer}>
                                    <TextInput multiline
                                               style={[styles.valueText, {height: 90, textAlignVertical: 'top'}]}
                                               blurOnSubmit={true} onChangeText={text => this.log.comment = text}
                                               ref={input => {
                                                   this.comment = input
                                               }} multiline/>
                                </View>

                                <Menu>
                                    <MenuTrigger style={{flexDirection: 'row', marginTop: 15}}>
                                        <Image source={require('../../../assets/png/circle_plus.png')}
                                               style={{width: 24, height: 24}}/>
                                        <Text style={styles.linkText}>{stringConstants.attachFile}</Text>
                                    </MenuTrigger>
                                    <MenuOptions style={{padding: 5}}>
                                        <MenuOption onSelect={this.attachFile}>
                                            <Text style={styles.valueText}>{stringConstants.chooseFromDevice}</Text>
                                        </MenuOption>
                                        <MenuOption onSelect={this.takePhoto}>
                                            <Text style={styles.valueText}>{stringConstants.takePhoto}</Text>
                                        </MenuOption>
                                    </MenuOptions>
                                </Menu>

                                {
                                    this.log.attachments.map((file, ind) => (
                                        <View key={ind} style={styles.itemContainer}>
                                            <Text style={styles.valueText}>{file.name}</Text>
                                        </View>
                                    ))
                                }
                                <TouchableOpacity style={styles.button} onPress={this.handleAdd}>
                                    <Text style={styles.buttonText}>{stringConstants.addForm}</Text>
                                </TouchableOpacity>

                                <View style={{marginBottom: 40}}/>

                            </MenuProvider>
                        </ShiftScrollView>
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}

mapStateToProps = state => ({
    units: state.units,
    locations: state.childLocations,
    token: state.token,
    userId: state.userId,
    language: state.language
})

export default connect(mapStateToProps, {addLog})(AddNewLog)