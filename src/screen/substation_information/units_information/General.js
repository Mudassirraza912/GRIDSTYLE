import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import styles from '../../../styles'

class General extends Component {
    general = this.props.screenProps.general

    render() {
        return (
            <ScrollView>
                <View style={styles.unitContainer}>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Manufacturer: </Text>
                        <Text style={styles.valueText}>{this.general.manufacturer}</Text>
                    </View>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Manufacturing year: </Text>
                        <Text style={styles.valueText}>{this.general.manufacturingYear}</Text>
                    </View>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Manufacturing number: </Text>
                        <Text style={styles.valueText}>{this.general.manufacturingNumber}</Text>
                    </View>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Commisioning year: </Text>
                        <Text style={styles.valueText}>{this.general.commisioningYear}</Text>
                    </View>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Type: </Text>
                        <Text style={styles.valueText}>{this.general.type}</Text>
                    </View>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>Model: </Text>
                        <Text style={styles.valueText}>{this.general.model}</Text>
                    </View>
                    <View style={styles.pairContainer}>
                        <Text style={styles.keyText}>System voltage: </Text>
                        <Text style={styles.valueText}>{this.general.systemVoltage}</Text>
                    </View>
                </View>

                <View style={{ marginBottom: 30 }} />
            </ScrollView>

        )
    }
}

export default General