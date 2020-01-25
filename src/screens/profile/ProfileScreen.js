import React from 'react';
import { AsyncStorage, Text, ScrollView, RefreshControl, TouchableOpacity, View } from 'react-native';
import { WaveIndicator } from 'react-native-indicators';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Henry, James, Luke, Oliver } from '../../common/svg-components/avatars';
import { Ellie, Lily, Maya, Zoey } from '../../common/svg-components/avatars';
import { SpinnerWrapper, DateWrapper, Ordinal, StyledDate, StyledMonth, StyledYear } from '../../common/StyledComponents';
import { StyledProfile, IdWrapper, DOJWrapper, LocationWrapper, ContactInfoWrapper, PhoneWrapper, EmailWrapper, AvatarWrapper, AboutWrapper } from './StyledComponents';
import { Id, Name, Designation, Company, Location, Phone, Email } from './StyledComponents';
import { MONTH_NAMES, getOrdinal } from '../../common/utils/dates';
import { platform } from '../../common/apis';

const ProfileScreen = ({ employeeDetails, pullToRefresh, fetchEmployeeDetails, navigation }) => {
    const onRefresh = () => fetchEmployeeDetails(employeeDetails.id);

    const _onPressLogout = async () => {
        const access = await AsyncStorage.getItem('access');
        await platform.delete(
            `/notifier/deregister/${employeeDetails.id}`,
            { headers: { Authorization: "Bearer " + access } }
        );

        await AsyncStorage.removeItem('refresh');
        await AsyncStorage.removeItem('access');

        navigation.navigate('Signin');
    }

    if (!employeeDetails.leaves)
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <WaveIndicator color="#000000" />
                <TouchableOpacity
                    style={
                        {
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#3A8BCF',
                            padding: 17,
                            width: 180,
                            borderRadius: 5,
                            marginBottom: 140
                        }
                    }
                    onPress={_onPressLogout}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>Logout</Text>
                </TouchableOpacity>
            </View>
        );

    let id = employeeDetails.id;
    let name = employeeDetails.name;
    let gender = employeeDetails.gender;
    let designation = employeeDetails.designation;
    let city = employeeDetails.location.city;
    let country = employeeDetails.location.country;
    let phone = employeeDetails.contactInfo.phone;
    let email = employeeDetails.contactInfo.email;
    let doj = new Date(employeeDetails.doj);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FEFEFE' }}>
            <ScrollView refreshControl={<RefreshControl progressViewOffset={20} refreshing={pullToRefresh} onRefresh={onRefresh} />} >

                <AboutWrapper>
                    <TouchableOpacity onPress={() => navigation.navigate('About')}>
                        <FontAwesomeIcon icon='info-circle' size={19} style={{ marginTop: 50, textAlign: 'right' }} color={'#393939'} />
                    </TouchableOpacity>
                </AboutWrapper>

                <StyledProfile>
                    <AvatarWrapper>
                        {_getRamdonlyPickedAvator(gender)}
                    </AvatarWrapper>

                    <IdWrapper>
                        <FontAwesomeIcon icon='id-badge' size={18} color={'#393939'} />
                        <Id>  {id}</Id>
                    </IdWrapper>

                    <Name>{name}</Name>
                    <Designation>{designation}</Designation>

                    <DOJWrapper>
                        <Company>@glassbeam </Company>

                        <FontAwesomeIcon icon='business-time' size={18} color={'#393939'} />

                        <StyledMonth> {MONTH_NAMES[doj.getMonth()]} </StyledMonth>
                        <DateWrapper>
                            <StyledDate>{doj.getDate()}</StyledDate>
                            <Ordinal>{getOrdinal(doj.getDate())}</Ordinal>
                        </DateWrapper>
                        <StyledYear>, {doj.getFullYear()}</StyledYear>
                    </DOJWrapper>

                    <LocationWrapper>
                        <FontAwesomeIcon icon='map-marker-alt' size={18} color={'#393939'} />
                        <Location>  {city}, {country}</Location>
                    </LocationWrapper>

                    <ContactInfoWrapper>
                        <PhoneWrapper>
                            <FontAwesomeIcon icon='phone-square-alt' size={17} color={'#393939'} />
                            <Phone>  {phone}</Phone>
                        </PhoneWrapper>

                        <EmailWrapper>
                            <FontAwesomeIcon icon='envelope' size={17} color={'#393939'} />
                            <Email>  {email}</Email>
                        </EmailWrapper>
                    </ContactInfoWrapper>

                    <TouchableOpacity
                        style={
                            {
                                alignItems: 'center',
                                backgroundColor: '#3A8BCF',
                                padding: 17,
                                width: 180,
                                borderRadius: 5,
                                marginTop: 80,
                                marginBottom: 20
                            }
                        }
                        onPress={_onPressLogout}
                    >
                        <Text style={{ color: 'white', fontSize: 16 }}>Logout</Text>
                    </TouchableOpacity>
                </StyledProfile>

            </ScrollView>
        </SafeAreaView>
    );
};

ProfileScreen.navigationOptions = {
    header: null
}

const maleAvatars = [<Henry />, <James />, <Luke />, <Oliver />];
const femaleAvatars = [<Ellie />, <Lily />, <Maya />, <Zoey />];

const _getRamdonlyPickedAvator = gender => {
    switch (gender) {
        case 'M':
            return maleAvatars[Math.floor(Math.random() * maleAvatars.length)];
        case 'F':
            return femaleAvatars[Math.floor(Math.random() * femaleAvatars.length)];
        default:
            return null;
    }
}

export default ProfileScreen;
