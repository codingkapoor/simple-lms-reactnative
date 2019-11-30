import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from 'react-native-calendars';
import { StyleSheet } from 'react-native';

import HolidaysContainer from '../../../../common/components/holidays/HolidaysContainer';
import { BadgeColor } from '../../../../common/Constants';
import Toasts, { CREATE, ALREADY5, WEEKENDS } from './Toasts';

export default ({ requests, holidays, stageIntimation }) => {

    let currentDate = new Date(new Date().toISOString().split('T')[0]);
    let currentMonth = currentDate.getMonth() + 1;
    let currentYear = currentDate.getFullYear();

    const [markedDates, setMarkedDates] = useState({});

    const [showToast, setShowToast] = useState(null);
    const [visible, setVisible] = useState(false);
    const setToastVisibility = () => {
        setTimeout(() => setVisible(true), 500);
        setTimeout(() => setVisible(false), 5000);
    }

    const holidaysRef = useRef();
    const updateHolidaysMonthYear = (month, year, show) => {
        holidaysRef.current.updateMonthYear(month, year, show);
    }

    let stageRequests = stageIntimation.requests ? stageIntimation.requests : [];

    useEffect(() => {
        setMarkedDates({
            ..._getDatesMarkedAsHolidays(holidays, currentMonth, currentYear),
            ..._getDatesMarkedAsRequests(requests, currentMonth, currentYear),
            ..._getDatesMarkedAsRequests(stageRequests, currentMonth, currentYear)
        });

        updateHolidaysMonthYear(currentMonth, currentYear, true);
    }, []);

    const onMonthChange = e => {
        let month = e.month;
        let year = e.year;

        updateHolidaysMonthYear(month, year, true);

        setMarkedDates({
            ..._getDatesMarkedAsHolidays(holidays, month, year),
            ..._getDatesMarkedAsRequests(requests, month, year),
            ..._getDatesMarkedAsRequests(stageRequests, month, year)
        });
    }

    const onDayPress = e => {
        let datePressed = new Date(e.dateString);

        if (datePressed.getDay() === 0 || datePressed.getDay() === 6) {
            setShowToast(WEEKENDS);
            setToastVisibility();
        } else if (datePressed < currentDate) {
            setShowToast(CREATE);
            setToastVisibility();
        } else if (datePressed === currentDate && currentDate.getHours() >= 17) {
            setShowToast(ALREADY5);
            setToastVisibility();
        }
    }

    return (
        <>
            <Calendar
                style={styles.calendar}
                markedDates={markedDates}
                onMonthChange={onMonthChange}
                onDayPress={onDayPress}
                markingType={'multi-dot'}
                theme={{
                    'stylesheet.day.multiDot': {
                        dot: {
                            width: 8,
                            height: 8,
                            marginTop: 1,
                            marginLeft: 1,
                            marginRight: 1,
                            borderRadius: 2,
                            opacity: 0
                        }
                    }
                }}
            />

            <HolidaysContainer ref={holidaysRef} />

            <Toasts showToast={showToast} visible={visible} />
        </>
    );
}

const styles = StyleSheet.create({
    calendar: {
        width: 370,
        borderWidth: 1,
        borderColor: '#D8DADA',
        borderRadius: 10,
        paddingBottom: 15,
        marginTop: 15
    }
});

const _getDatesMarkedAsHolidays = (holidays, month, year) => {
    let _markedDates = {};

    if (holidays && holidays[0][year] && holidays[0][year][month]) {
        let data = holidays[0][year][month];
        data.forEach(holiday =>
            _markedDates[`${year}-${month}-${holiday.Date}`] = {
                dots: [{ color: '#E5B001', borderColor: '#E5B001' }]
            }
        );
    }

    return _markedDates;
}

const _getDatesMarkedAsRequests = (requests, month, year) => {
    const _filterByMonthYear = (request, month, year) => {
        let dt = new Date(request.date);
        return dt.getMonth() + 1 === month && dt.getFullYear() === year;
    }

    let _markedDates = {};

    requests.filter(request => _filterByMonthYear(request, month, year)).forEach(request =>
        _markedDates[request.date] = {
            dots: [
                { color: BadgeColor[request.firstHalf], borderColor: BadgeColor[request.firstHalf] },
                { color: BadgeColor[request.secondHalf], borderColor: BadgeColor[request.secondHalf] }
            ]
        }
    );

    return _markedDates;
}