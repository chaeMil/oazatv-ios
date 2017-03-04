'use strict'
import React, {Component} from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import Colors from '../styles/Colors'

const styles = StyleSheet.create({

    statusBarBackground: {
        height: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: Colors.primaryColor
    }

});

class StatusBarBackground extends Component {

    componentDidMount() {
        StatusBar.setBarStyle('light-content', true);
    }

    render() {
        return (
            <View style={[styles.statusBarBackground, this.props.style || {}]}>
            </View>
        )
    }

}

module.exports = StatusBarBackground;