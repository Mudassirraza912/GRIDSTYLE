import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, StatusBar, Image } from 'react-native'

import ComponentPanel from './ComponentPanel'
import styles from '../../../styles'
import IconTouchable from '../../../component/IconTouchable'

class Components extends Component {
    static navigationOptions = {
        header: null
    }

    componentWillMount = () => {
        this.setState({ components: this.props.navigation.getParam('components') })

    }

    render() {
        return (
            <View backgroundColor='#236CF6'>
                <SafeAreaView backgroundColor='#236CF6' ></SafeAreaView>
                <StatusBar barStyle="light-content" />
                <SafeAreaView style={styles.grayContainer}>
                    <View style={styles.header}>
                        <IconTouchable onPress={() => this.props.navigation.goBack()} left>
                            <Image source={require('../../../../assets/png/back.png')} style={{ width: 13, height: 21 }} />
                        </IconTouchable>
                        <Text style={styles.headerTextLeft}>Components</Text>
                        <View />
                    </View>

                    <ScrollView style={styles.centerContainer}>
                        <View style={{ marginBottom: 15 }} />
                        {
                            this.state.components.map(component => (
                                <ComponentPanel key={component.id} component={component} />
                            ))
                        }
                        <View style={{ marginBottom: 15 }} />
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}

export default Components