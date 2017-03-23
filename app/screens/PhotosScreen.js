'user strict'
import React,{Component} from 'react';
import BaseScreen from './BaseScreen';
import {View, Image, Text, TextView, ListView, TouchableOpacity} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import Constants from '../strings/Constants';
import Colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons'

class PhotosScreen extends BaseScreen {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <ViewContainer style={{flex: 1}}>
                <StatusBarBackground style={{backgroundColor: Colors.black}}/>

            </ViewContainer>
        );
    }

}

module.exports = PhotosScreen;