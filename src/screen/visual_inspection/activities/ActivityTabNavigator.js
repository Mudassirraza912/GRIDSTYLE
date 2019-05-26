import { createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import React, { Component } from 'react'

import SiteInfo from './SiteInfo'
import TabInfo from './TabInfo'
import DatePicker from '../../util/DatePicker'

class Navigator extends Component {
    render() {
        activity = this.props.screenProps

        siteInfoNavigator = createStackNavigator(
            {
                SiteInfo,
                DatePicker
            },
            {
                headerMode: 'none',
                navigationOptions: {
                    headerVisible: false,
                }
            }
        )

        tabs = {}
        for (unit in activity.answers)
            tabs[unit] = TabInfo

        const Tabs = createMaterialTopTabNavigator(
            {
                'Site Info': siteInfoNavigator,
                ...tabs
            },
            {
                tabBarOptions: {
                    scrollEnabled: true,
                    activeTintColor: '#fff',
                    inactiveTintColor: '#91B6FB',
                    style: {
                        backgroundColor: '#236CF6',
                    },
                    indicatorStyle: {
                        backgroundColor: '#fff',
                    },
                    tabStyle: {
                        height: 50,
                        width: 140
                    },
                    labelStyle: {
                        fontFamily: 'SF_Pro_Semibold',
                        fontSize: 16
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