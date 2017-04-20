/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';
import ViewContainer from './app/components/ViewContainer'

import { TabViewAnimated, TabBar } from 'react-native-tab-view';

export default class OazaApp extends Component {
    state = {
        index: 0,
        routes: [
            { key: 'home', title: 'Home' },
            { key: 'categories', title: 'Categories' },
            { key: 'archive', title: 'Archive' },
            { key: 'songbook', title: 'Songbook' },
            { key: 'search', title: 'Search' }
        ],
    };

    _handleChangeTab = (index) => {
        this.setState({ index });
    };

    _renderFooter = (props) => {
        return <TabBar {...props} />;
    };

    _renderScene = ({ route }) => {
        var scene = null;

        switch (route.key) {
            case 'home':
                scene = (
                    <AppNavigator
                        oazaApp={this}
                        initialRoute={{ident: "HomeScreen"}} />
                );
                break;
            case 'categories':
                scene = (
                    <AppNavigator
                        oazaApp={this}
                        initialRoute={{ident: "CategoriesScreen"}} />
                );
                break;
            case 'archive':
                scene = (
                    <AppNavigator
                        oazaApp={this}
                        initialRoute={{ident: "ArchiveScreen"}} />
                );
                break;
            case 'songbook':
                scene = (
                    <AppNavigator
                        oazaApp={this}
                        initialRoute={{ident: "SongbookScreen"}} />
                );
                break;
            case 'search':
                scene = (
                    <AppNavigator
                        oazaApp={this}
                        initialRoute={{ident: "SearchScreen"}} />
                );
        }

        return (
            <ViewContainer style={{flex: 1, height: null, marginTop: -20, marginBottom: -49}}>
                {scene}
            </ViewContainer>
        );

    };

    render() {
        return (
            <TabViewAnimated
                style={styles.container}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderFooter={this._renderFooter}
                onRequestChangeTab={this._handleChangeTab}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

AppRegistry.registerComponent('oazatv', () => OazaApp);
