'use strict'
import React, {Component} from 'react';
import {Navigator, Text, StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ArchiveScreen from '../screens/ArchiveScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SongbookScreen from '../screens/SongbookScreen';

class AppNavigator extends Component {

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
            case "SongbookScreen":
                return (
                    <SongbookScreen
                        oazaApp={route.oazaApp}
                        {...globalNavigatorProps} />
                );
            default:
                return (
                    <Text style={{margin: 20}}>{`YO YOU MESSED SOMETHING UP ${route.ident}`}</Text>
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