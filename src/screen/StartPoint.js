import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'
import { loadToken } from '../model/controller/logInController'
import PrimaryLoadingView from '../component/PrimaryLoadingView'

class StartPoint extends Component {
    static navigationOptions = {
        header: null
    }

    navigate = (routeName) => {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: routeName, params: { from: 'login' } })]
            })
        )
    }

    componentWillMount = async () => {
        this.props.loadToken().then(() => {
            routeName = ''

            if (this.props.token)
                if (this.props.defaultSubstation)
                    routeName = 'Menu'
                else
                    routeName = 'ChooseSubstation'
            else
                routeName = 'Login'
            this.props.navigation.navigate(routeName, {'from' : 'login'})
        })
        .catch(error => this.props.navigation.navigate('Login'))

    }

    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position)
                console.log(location)
                this.setState({ location })
            }
        )
    }

    render() {
        return (
            <PrimaryLoadingView loading={true} />
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        defaultSubstation: state.defaultSubstation
    }
}

export default connect(mapStateToProps, { loadToken })(StartPoint)