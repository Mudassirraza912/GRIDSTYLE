import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import LoadingView from 'react-native-loading-view'

export default class PrimaryLoadingView extends Component {
    render() {
        return (
            <LoadingView loading={this.props.loading} indicator={<ActivityIndicator size="large" color="#236CF6" />}>
                {this.props.children}
            </LoadingView>
        )
    }
}