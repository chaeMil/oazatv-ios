'user strict'
import React,{Component} from 'react';
import {View, Image, Text, TextView, ListView, TouchableOpacity} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import Constants from '../strings/Constants';
import Colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons'

class BaseScreen extends Component {

    _goBack() {
        this._showTabBar();
        this.props.navigator.pop();
    }

    _showTabBar() {
        this.props.oazaApp.setState({
            tabBarBottomMargin: 0
        });
    }

    _hideTabBar() {
        this.props.oazaApp.setState({
            tabBarBottomMargin: -49
        });
    }

}

module.exports = BaseScreen;