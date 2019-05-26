import React, { Component } from 'react'
import { Calendar } from 'react-native-calendars'

class SiteInfo extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <Calendar
                style={{ marginTop: 30 }}
                current={Date()}
                onDayPress={(date) => { this.props.navigation.getParam('handleDate')(date); this.props.navigation.goBack()}}
                monthFormat={'MMMM yyyy'}
                hideArrows={false}
                hideExtraDays={false}
                disableMonthChange={false}
                firstDay={1}
                hideDayNames={false}
                showWeekNumbers={true}
                onPressArrowLeft={substractMonth => substractMonth()}
                onPressArrowRight={addMonth => addMonth()}
            />
        )
    }
}

export default SiteInfo