import React, { Component } from 'react'
import { View, ScrollView, Alert, TouchableOpacity, Image } from 'react-native'

import PrimaryLoadingView from '../../../../component/PrimaryLoadingView'
import AmoundInput from '../../../../component/AmountInput'
import QualityInput from '../../../../component/QualityInput'
import QuestionHeader from '../../../../component/QuestionHeader'
import ActInput from '../../../../component/ActInput'
import styles from '../../../../styles'

import { connect } from 'react-redux'
import { loadMaintenanceQuestions } from '../../../../model/controller/maintenanceController'
import { addMaintenance } from '../../../../model/controller/maintenanceController'

class Protocol extends Component {
    state = {
        loading: true
    }

    answers = this.props.screenProps.answers
    maintenance = this.props.screenProps

    componentWillMount = () => {
        this.props.loadMaintenanceQuestions(this.props.token, this.maintenance.unitId, this.props.language).then(() => {
            this.props.maintenanceQuestions.map(question => this.answers.push({
                question: question.id,
                value_dec: 0,
                value_bool: undefined
            }))
            this.setState({ loading: false })
            this.forceUpdate()
        })
    }

    handleAdd = () => {
        Alert.alert(
            'Save information',
            'Are you sure you want to save entered information?',
            [
                { text: 'Save', onPress: () => {
                    this.maintenance.reporterId = this.props.userId
                    this.maintenance.unitId = this.props.navigation.getParam('unitId')
            
                    console.log(this.maintenance)
            
                    if (this.maintenance.date !== '') {
                        this.props.addMaintenance(this.props.token, this.maintenance)
                        this.props.navigation.navigate('Menu')
                    }
                    else
                        Alert.alert('', 'Maintenance date cannot be empty')
                    } 
                },
                { text: 'Cancel', style: 'cancel' }
            ],
            { cancelable: false }
        )  
    }

    renderQuestion = question => {
        answer = this.answers.find(answer => answer.question === question.id)

        if (question.type == 2)
            return (
                <AmoundInput key={question.id} question={question} answer={answer} />
            )
        else if (question.type == 3)
            return (
                <QualityInput key={question.id} question={question} answer={answer} />
            )
        else if (question.type == 4)
            return (
                <QuestionHeader key={question.id} question={question} />
            )
        else if (question.type == 5)
            return (
                <ActInput key={question.id} question={question} answer={answer} />
            )
    }

    render() {
        return (
            <PrimaryLoadingView loading={this.state.loading}>
                <ScrollView style={styles.centerContainer}>
                    {
                        this.props.maintenanceQuestions && this.answers.length > 0 &&
                        this.props.maintenanceQuestions.map(question => this.renderQuestion(question))
                    }
                    <View style={{ marginBottom: 15 }} />
                </ScrollView>
                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#4FC295' }]}
                    onPress={this.handleAdd}
                >
                    <Image source={require('../../../../../assets/png/save.png')} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
            </PrimaryLoadingView>
        )
    }
}

mapStateToProps = state => ({
    token: state.token,
    companyId: state.companyId,
    language: state.language,
    maintenanceQuestions: state.maintenanceQuestions,
    userId: state.userId
})

export default connect(mapStateToProps, { loadMaintenanceQuestions, addMaintenance })(Protocol)