'use strict'
import React, {Component} from 'react'
import { View, StyleSheet } from 'react-native'
import Colors from '../styles/Colors'

class ViewContainer extends Component {
    render() {
        return (
            <View style={[styles.viewContainer, this.props.style || {}]}>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({

    viewContainer: {
        flex: 1,
        marginBottom: 49,
        backgroundColor: Colors.appBg,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch"
    }

});

module.exports = ViewContainer;