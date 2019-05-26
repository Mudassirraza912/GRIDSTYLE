import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import React, { Component } from 'react'

import General from './General'

import TransformerDescription from './TransformerDescription'
import GridInformation from './GridInformation'
import Other from './Other'
import Scheme from './Scheme'

import BreakerDescription from './BreakerDescription'
import MotorDrive from './MotorDrive'

import Documents from './Documents'

class Navigator extends Component {
    render() {
        const specificTabs = () => {
            switch (this.props.screenProps.general.type) {
                case 'Transformer':
                    return {
                        'Description': TransformerDescription,
                        'Grid information': GridInformation,
                        'Other': Other,
                        'Scheme': Scheme
                    }
                case 'Breaker': {
                    return {
                        'Description': BreakerDescription,
                        'Motor drive': MotorDrive
                    }
                }
                default:
                    return {}
            }
        }

        const Tabs = createMaterialTopTabNavigator(
            {
                'General': General,
                ...specificTabs(),
                'Documents': Documents
            },
            {
                tabBarOptions: {
                    scrollEnabled: true,
                    activeTintColor: '#236CF6',
                    inactiveTintColor: '#91B6FB',
                    style: {
                        backgroundColor: '#fff',
                    },
                    indicatorStyle: {
                        backgroundColor: '#236CF6',
                    },
                    tabStyle: {
                        height: 50,
                        width: 140
                    },
                    labelStyle: {
                        fontFamily: 'SF_Pro_Semibold',
                        fontSize: 14
                    }
                }
            })

        TabNavigator = createAppContainer(Tabs)

        return (
            <TabNavigator screenProps={this.props.screenProps} />
        )
    }
}

export default Navigator