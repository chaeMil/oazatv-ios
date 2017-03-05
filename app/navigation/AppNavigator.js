'use strict'
import React, {Component} from 'react';
import {Navigator, Text, StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ArchiveScreen from '../screens/ArchiveScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryScreen from '../screens/CategoryScreen';

class AppNavigator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            navigationBarHidden: false
        };
    }

    _renderScene(route, navigator) {
        let globalNavigatorProps = { navigator };

        let ident = null;
        if (route.initialRoute != null) {
            ident = route.initialRoute.ident;
        } else {
            ident = route.ident;
        }

        switch(ident) {
            case "HomeScreen":
                return (
                    <HomeScreen
                        oazaApp={route.oazaApp}
                        {...globalNavigatorProps} />
                );
            case "ArchiveScreen":
                return (
                    <ArchiveScreen
                        oazaApp={route.oazaApp}
                        {...globalNavigatorProps} />
                );
            case "VideoPlayerScreen":
                return (
                    <VideoPlayerScreen
                        video={route.video}
                        oazaApp={route.oazaApp}
                        {...globalNavigatorProps} />
                );
            case "CategoriesScreen":
                return (
                    <CategoriesScreen
                        oazaApp={route.oazaApp}
                        {...globalNavigatorProps} />
                );
            case "CategoryScreen":
                return (
                    <CategoryScreen
                        category={route.category}
                        oazaApp={route.oazaApp}
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
                initialRoute={{
                    initialRoute: this.props.initialRoute,
                    oazaApp: this.props.oazaApp
                }}
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