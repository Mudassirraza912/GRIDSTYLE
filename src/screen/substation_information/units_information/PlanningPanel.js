import React, { Component } from 'react'
import { Text, View } from 'react-native'

import styles from '../../../styles'

class PlanningPanel extends Component {

    render() {
        return (
            <View style={styles.panel}>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Date:</Text>
                    <Text style={styles.valueText}>{this.props.report.date}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>Type:</Text>
                    <Text style={styles.valueText}>{this.props.report.type}</Text>
                </View>
            </View>
        )
    }
}

export default PlanningPanel