import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'

import styles from '../../styles'

class ExpansionPanel extends Component {
    state = {
        expanded: false
    }

    render() {
        const {stringConstants} = this.props;
        return (
            <View style={styles.panel}>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstants.date}:</Text>
                    <Text style={styles.valueText}>{this.props.log.date}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstants.event}:</Text>
                    <Text style={styles.valueText}>{this.props.log.event}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstants.responsible}:</Text>
                    <Text style={styles.valueText}>{this.props.log.responsible}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.keyText}>{stringConstants.comments}:</Text>
                    <Text style={styles.valueText}>{this.props.log.comment}</Text>
                </View>
            </View>
        )
    }
}

export default ExpansionPanel