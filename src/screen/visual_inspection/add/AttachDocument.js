import React, {Component} from 'react'
import {Text, View, TouchableOpacity, ScrollView, Image, Alert, Dimensions} from 'react-native'
import DocumentPanel from './DocumentPanel'
import ShiftScrollView from '../../../component/ShiftScrollView'
import styles from '../../../styles'
import {DocumentPicker, ImagePicker, Permissions} from 'expo'
import * as mime from 'react-native-mime-types'

import {connect} from 'react-redux'
import {addActivity} from '../../../model/controller/activityController'
import Lang from '../../../localization/lang'

class AttachDocument extends Component {
    activity = this.props.screenProps.activity

    state = {
        imageCount: 1
    }

    attachPDF = async () => {
        DocumentPicker.getDocumentAsync({type: 'application/pdf'}).then(fileInfo => {
            if (fileInfo.type === 'cancel')
                return
            else {
                let formData = new FormData()
                formData.append('file', {uri: fileInfo.uri, name: fileInfo.name, type: 'application/pdf'});
                this.activity.attachments.push({
                    name: fileInfo.name,
                    formData: formData,
                    uri: fileInfo.uri,
                    fileType: 'application/pdf'
                });
                this.forceUpdate()
            }
        })
    }

    attachImage = async () => {
        ImagePicker.launchImageLibraryAsync().then(fileInfo => {
            if (fileInfo.type === 'cancel')
                return
            else {
                name = fileInfo.uri.split('/').reverse()[0]

                let formData = new FormData()
                formData.append('file', {
                    uri: fileInfo.uri,
                    name: name,
                    type: mime.lookup(name.split('.').reverse()[0])
                });
                this.activity.attachments.push({
                    name: name,
                    formData: formData,
                    uri: fileInfo.uri,
                    fileType: 'image/jpeg'
                });
                this.forceUpdate()
            }
        })
    }

    takePhoto = async () => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        const {status2} = await Permissions.askAsync(Permissions.CAMERA_ROLL)

        const image = await ImagePicker.launchCameraAsync({allowEditing: false})
        if (!image.cancelled) {
            const name = `Image-${this.state.imageCount}.jpg`

            formData = new FormData()
            formData.append('file', {uri: image.uri, name: name, type: mime.lookup('jpg')})
            this.activity.attachments.push({name: name, formData: formData, fileType: 'image/jpeg', uri: image.uri});
            this.forceUpdate()
        }
    }

    handleAction = () => {
        const stringConstants = Lang[this.props.language];

        Alert.alert(
            stringConstants.saveInformation,
            stringConstants.areYouSureYouWantToSave,
            [
                {
                    text: 'Save', onPress: () => {
                        this.activity.date = this.state.date

                        if (this.activity.date === '')
                            Alert.alert('', stringConstants.dateFieldCannotBeEmpty)
                        else {
                            this.activity.date = this.props.screenProps.date.date
                            this.props.screenProps.addActivity()
                            Alert.alert('', stringConstants.saved, [{
                                text: 'Ok', onPress: () => this.props.screenProps.navigation.navigate('Menu')
                            }])
                        }
                    }
                },
                {text: stringConstants.cancel, style: 'cancel'}
            ],
            {cancelable: false}
        )
    };

    render() {
        const stringConstants = Lang[this.props.language];

        return (
            <ShiftScrollView style={{height: Dimensions.get('window').height - 110}}>
                <ScrollView style={[styles.centerContainer, styles.regularTMargin]}>

                    <View>
                        <TouchableOpacity style={styles.lightItemPanel}
                                          onPress={this.attachPDF}>
                            <Text style={styles.valueText}>{stringConstants.attachAPdfFile}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.lightItemPanel} onPress={this.attachImage}>
                            <Text style={styles.valueText}>{stringConstants.attachAnImage}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.lightItemPanel} onPress={this.takePhoto}>
                            <Text style={styles.valueText}>{stringConstants.takeAPhoto}</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        this.activity.attachments.map((document, ind) =>
                            <DocumentPanel
                                stringConstants={stringConstants}
                                key={ind}
                                document={document}
                                expanded={document.name.split('.').reverse()[0] === 'pdf'}
                                deleteDocument={() => {
                                    this.activity.attachments.splice(ind, 1);
                                    this.forceUpdate()
                                }}
                            />
                        )
                    }

                    <View style={{marginBottom: 40}}/>
                </ScrollView>
                <TouchableOpacity
                    style={[styles.actionButton, {backgroundColor: '#4FC295'}]}
                    onPress={this.handleAction}
                >
                    <Image source={require('../../../../assets/png/save.png')} style={{width: 25, height: 25}}/>
                </TouchableOpacity>
            </ShiftScrollView>
        )
    }
}

mapStateToProps = state => ({
    token: state.token,
    language: state.language,
})

export default connect(mapStateToProps, {addActivity})(AttachDocument)