import React, { Component } from 'react'
import { TouchableOpacity, ScrollView, Alert, Dimensions, Image, AsyncStorage} from 'react-native'

import AmoundInput from '../../../component/AmountInput'
import QualityInput from '../../../component/QualityInput'
import ActInput from '../../../component/ActInput'
import ShiftView from '../../../component/ShiftScrollView'
import styles from '../../../styles'

import { connect } from 'react-redux'
import { updateActivity } from '../../../model/controller/activityController'
import Lang from '../../../localization/lang'

class TabInfo extends Component {
    activity = this.props.screenProps

    state = {
        editing: false,
    }

    

    componentWillMount = () => {
        this.info = this.props.screenProps.answers[this.props.navigation.state.routeName]
        // this._retriveData()
    }

    // componentDidMount = () => {
    //     this._retriveData()
    // }

    enableEditButton = async ()=>{
        var edit = JSON.stringify(!this.state.editing)
        try {
            await AsyncStorage.setItem('editKey',edit);
            console.log('enableEditButton =>')
          } catch (error) {
            // Error saving data
                        console.log('enableEditButton error =>')

          }
    }

    _retriveData = async () => {
        try {
            const value = await AsyncStorage.getItem('editKey');
            if (value !== null) {
              // We have data!!
            console.log('enableEditButton getting data =>', value)
            var convertVal = JSON.parse(value)
            console.log('enableButton getting data After JSON in TEABINFO =>', value)
            this.setState({editing: convertVal})
            }
          } catch (error) {
            // Error retrieving data
            console.log('Errr getting data =>', error)

          }
    }

    handleAction = () => {
        this.enableEditButton()
        const stringConstants = Lang[this.props.language];

        if (this.state.editing) {
            Alert.alert(
                stringConstants.saveInformation,
                stringConstants.areYouSureYouWantToSave,
                [
                    {
                        text: stringConstants.save, onPress: () => {
                            this.activity.date = this.state.date
                            this.props.updateActivity(this.props.token, this.activity)

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

    renderQuestion = question => {
        const stringConstants = Lang[this.props.language];

        // console.warn(question)
        if (question.type == 2)
            return (
                <AmoundInput stringConstants={stringConstants} key={question.question} editing={this.state.editing} question={question} answer={question.answer} />
            )
        else if (question.type == 3)
            return (
                <QualityInput stringConstants={stringConstants} key={question.question} editing={this.state.editing} question={question} answer={question.answer} />
            )
        else if (question.type == 5)
            return (
                <ActInput stringConstants={stringConstants} key={question.question} editing={this.state.editing} question={question} answer={question.answer} />
            )
    }

    render() {

        this._retriveData()

        let actionIcon
        if (this.state.editing)
            actionIcon = <Image source={require('../../../../assets/png/save.png')} style={{ width: 25, height: 25 }} />
        else
            actionIcon = <Image source={require('../../../../assets/png/edit.png')} style={{ width: 22, height: 22 }} />

        return (
            <ShiftView style={{ height: Dimensions.get('window').height - 110 }}>
                <ScrollView style={[styles.centerContainer, { opacity: this.state.editing ? 1 : 0.7 }]}>
                    {this.info && this.info.map(question => this.renderQuestion(question))}
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

export default connect(mapStateToProps, { updateActivity })(TabInfo)