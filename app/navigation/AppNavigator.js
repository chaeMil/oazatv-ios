'use strict'
import React, {Component} from 'react';
import {Navigator, Text, StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ArchiveScreen from '../screens/ArchiveScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';

class AppNavigator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigationBarHidden: false
        };
    }

    _renderScene(route, navigator) {
        var globalNavigatorProps = { navigator };

        switch(route.ident) {
            case "HomeScreen":
                return (
                    <HomeScreen
                        {...globalNavigatorProps} />
                );
            case "ArchiveScreen":
                return (
                    <ArchiveScreen
                        {...globalNavigatorProps} />
                );
            case "VideoPlayerScreen":
                return (
                    <VideoPlayerScreen
                        video={route.video}
                        {...globalNavigatorProps} />
                );
            default:
                return (
                    <Text>{`YO YOU MESSED SOMETHING UP ${route}`}</Text>
                );
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={this.props.initialRoute}
                ref="appNavigator"
                navigationBarHidden={this.props.navigationBarHidden}
                style={styles.navigatorStyles}
                renderScene={this._renderScene} />
        )
    }

}

const styles = StyleSheet.create({

    navigatorStyles: {

    }

});

module.exports = AppNavigator;