import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OTP, Email } from './StyledComponents';
import Styles from './Styles';
import { platform } from '../../common/apis';

const SignInScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');

    const _onPressGenerateOTP = () => {
        platform.get(`/passwordless/employees/${email}/otp`)
            .then(() => {
                alert('OTP sent on the registered email id');
            })
            .catch(error => {
                alert('Something went wrong');
                console.log(error);
            });
    }

    // TODO: Save to async storage and navigate to mainFlow
    const _onPressLogin = () => {
        platform.post(`/passwordless/employees/${email}/tokens`, otp)
            .then(res => {
                console.log('access: ', res.data.access);
                console.log('refresh: ', res.data.refresh);
                navigation.navigate('mainFlow');
            })
            .catch(error => {
                alert('Something went wrong');
                console.log(error);
            });
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FEFEFE', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Image source={require('./intimations.png')} style={{ width: 200, height: 200, marginTop: 50, marginBottom: 20 }} />
            <View>
                <Email
                    placeholder='Registered Email'
                    value={email}
                    onChangeText={setEmail}
                />

                <OTP
                    placeholder='One Time Password'
                    value={otp}
                    onChangeText={setOTP}
                />

                <TouchableOpacity
                    style={Styles.buttonWrapper}
                    onPress={_onPressGenerateOTP}
                >
                    <Text style={Styles.buttonText}>Generate OTP</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={Styles.buttonWrapper}
                    onPress={_onPressLogin}
                >
                    <Text style={Styles.buttonText}>Log In</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default SignInScreen;