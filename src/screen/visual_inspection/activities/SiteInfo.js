import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Alert, Dimensions, TextInput, Image, AsyncStorage } from 'react-native'
import { DocumentPicker, FileSystem } from 'expo'

import ShiftView from '../../../component/ShiftScrollView'
import ActInput from '../../../component/ActInput'
import DocumentPanel from './DocumentPanel'
import EditableDocumentPanel from '../add/DocumentPanel'
import styles from '../../../styles'

import { ACTIVITY_TYPE } from '../../../model/constants'
import { DOWNLOAD_ACTIVITY_DOCUMENT_LINK } from '../../../model/constants'

import { connect } from 'react-redux'
import { updateActivity } from '../../../model/controller/activityController'
import { updateMaintenance } from '../../../model/controller/maintenanceController'
import Lang from '../../../localization/lang'


class SiteInfo extends Component {
    activity = this.props.screenProps

    state = {
        editing: false,
        date: this.activity.date
    }

    componentWillMount = () => {
        this.enableButton
    }

    componentDidMount = () => {
        this._retriveSITEData()
    }

    enableButton = async ()=>{
        var edit = JSON.stringify(!this.state.editing)
        try {
            await AsyncStorage.setItem('editKey',edit);
//             console.log('enableButton =>')
          } catch (error) {
            // Error saving data
//                         console.log('enableButton error =>')

          }
    }

    _retriveSITEData = async () => {
        try {
            const value = await AsyncStorage.getItem('editKey');
            if (value !== null) {
              // We have data!!
//             console.log('enableButton getting data =>', value)
            var convertVal = JSON.parse(value)
//             console.log('enableButton getting data After JSON in SITEINFO =>', value)
            this.setState({editing: convertVal})
            }
          } catch (error) {
            // Error retrieving data
//             console.log('Errr getting data =>', error)

          }
    }


    handleDate = (date) => this.setState({ date: date.dateString })

    handleAction = () => {
        this.enableButton()
        const stringConstants = Lang[this.props.language];

        if (this.state.editing) {
            Alert.alert(
                stringConstants.saveInformation,
                stringConstants.areYouSureYouWantToSave,
                [
                    {
                        text: stringConstants.save, onPress: () => {
                            this.activity.date = this.state.date
                            if (this.activity.type === ACTIVITY_TYPE[1])
                                this.props.updateActivity(this.props.token, this.activity)
                            else if (this.activity.type === ACTIVITY_TYPE[2])
                                this.props.updateMaintenance(this.props.token, this.activity)

                            this.setState({ editing: !this.state.editing })
                        }
                    },
                    { text: stringConstants.cancel, style: 'cancel' }
                ],
                { cancelable: false }
            )
        }
        else
            this.setState({ editing: !this.state.editing })
    }

    attachFile = async () => {
        DocumentPicker.getDocumentAsync({ type: 'application/pdf' }).then(fileInfo => {
            if (fileInfo.type === 'cancel')
                return
            else {
                formData = new FormData()
                formData.append('file', { uri: fileInfo.uri, name: fileInfo.name, type: 'application/pdf' })
                this.activity.attachments.push({ name: fileInfo.name + '.pdf', formData: formData });
                this.forceUpdate()
            }
        })
    }

    downloadFile = async (document) => {
        console.log(DOWNLOAD_ACTIVITY_DOCUMENT_LINK(document.id))
        FileSystem.downloadAsync(DOWNLOAD_ACTIVITY_DOCUMENT_LINK(document.id), FileSystem.documentDirectory + document.name)
    }



    render() {
        const stringConstants = Lang[this.props.language];
        this._retriveSITEData()

        let actionIcon
        if (this.state.editing)
            actionIcon = <Image source={require('../../../../assets/png/save.png')} style={{ width: 25, height: 25 }} />
        else
            actionIcon = <Image source={require('../../../../assets/png/edit.png')} style={{ width: 22, height: 22 }} />

        return (
            <ShiftView style={{ height: Dimensions.get('window').height - 110 }}>
                <ScrollView style={[styles.centerContainer, { opacity: this.state.editing ? 1 : 0.7 }]}>
                    <Text style={[styles.keyText, styles.regularTMargin]}>{stringConstants.reporter}</Text>
                    <TextInput style={styles.valueContainer} defaultValue={this.activity.reporter} editable={false} />


                    <Text style={styles.keyText}>{stringConstants.date}</Text>
                    <View style={styles.iconInput}>
                        <TextInput editable={this.state.editing} style={styles.dateInput} defaultValue={this.state.date} />
                        <TouchableOpacity style={{ opacity: 0.4 }} onPress={() => this.props.navigation.navigate('DatePicker', { handleDate: this.handleDate })} disabled={!this.state.editing}>
                            <Image source={require('../../../../assets/png/calendar.png')} style={[styles.rightIcon, { width: 24, height: 24 }]} />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.keyText, styles.regularTMargin]}>{stringConstants.participants}</Text>
                    <TextInput style={styles.valueContainer} onChangeText={text => this.activity.participants = text} defaultValue={this.activity.participants} editable={this.state.editing} />

                    <Text style={[styles.keyText, styles.regularTMargin]}>{stringConstants.comments}</Text>
                    <TextInput style={styles.valueContainer} onChangeText={text => this.activity.comments = text} defaultValue={this.activity.comments} editable={this.state.editing} />

                    {
                        this.activity.type === ACTIVITY_TYPE[2] ? (
                            <View>
                                <ActInput editing={this.state.editing} question={{ text: stringConstants.gasSamplesTaken }} answer={{ value_bool: this.activity.gasSamples }} />
                                <ActInput editing={this.state.editing} question={{ text: stringConstants.oilSamplesTaken }} answer={{ value_bool: this.activity.oilSamples }} />
                            </View>
                        ) : null
                    }

                    {
                        this.activity.attachments.map((document, ind) =>
                            document.id || !this.state.editing ?
                                <DocumentPanel
                                    stringConstants={stringConstants}
                                    key={ind}
                                    document={document}
                                    downloadDocument={() => this.downloadFile(document)}
                                />
                                : <EditableDocumentPanel
                                    stringConstants={stringConstants}
                                    key={ind}
                                    document={document}
                                    deleteDocument={() => { this.activity.attachments.splice(ind, 1); this.forceUpdate() }}
                                />
                        )
                    }

                    <TouchableOpacity style={{ flexDirection: 'row', marginTop: 15 }} disabled={!this.state.editing}>
                        <Image source={require('../../../../assets/png/circle_plus.png')} style={{ width: 24, height: 24 }} />
                        <Text style={styles.linkText} onPress={this.attachFile}>{stringConstants.attachADocument}</Text>
                    </TouchableOpacity>

                    <View style={{ marginBottom: 40 }} />
                </ScrollView>

                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: this.state.editing ? '#4FC295' : '#236CF6' }]}
                    onPress={this.handleAction}
                >
                    {actionIcon}
                </TouchableOpacity>
            </ShiftView>
        )
    }
}

mapStateToProps = state => ({
    token: state.token,
    language: state.language,
})

export default connect(mapStateToProps, { updateActivity, updateMaintenance })(SiteInfo)
