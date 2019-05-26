import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import styles from '../../../styles'

class Other extends Component {
    documents = this.props.screenProps.documents

    render() {
        return (
            <ScrollView>
                {
                    this.documents.map(document => (
                        <View style={styles.unitContainer} key={document.id}>
                            <View style={styles.pairContainer}>
                                <Text style={styles.keyText}>Name: </Text>
                                <Text style={styles.valueText}>{document.name}</Text>
                            </View>
                            <View style={styles.pairContainer}>
                                <Text style={styles.keyText}>Type: </Text>
                                <Text style={styles.valueText}>{document.type}</Text>
                            </View>
                            <View style={styles.pairContainer}>
                                <Text style={styles.keyText}>Language: </Text>
                                <Text style={styles.valueText}>{document.language}</Text>
                            </View>
                            <View style={styles.pairContainer}>
                                <Text style={styles.keyText}>Description: </Text>
                                <Text style={styles.valueText}>{document.description}</Text>
                            </View>
                        </View>
                    ))
                }
                <View style={{ marginBottom: 30 }} />
            </ScrollView>

        )
    }
}

export default Other