import React, {Component, PropTypes} from 'react';
import {AppRegistry, TabBarIOS, StatusBarIOS} from 'react-native';
import AppNavigator from './app/navigation/AppNavigator';
import Colors from './app/styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons'
import strings from './app/strings/Locale'

export default class OazaApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: "home",
            tabBarBottomMargin: 0
        }
    }

    render() {
        return (
            <TabBarIOS
                style={{marginBottom: this.state.tabBarBottomMargin}}
                translucent={false}
                barTintColor={Colors.primaryColor}
                tintColor={Colors.white}
                unselectedItemTintColor={Colors.alphaWhite}
                selectedTab={this.state.selectedTab}>

                <Icon.TabBarItemIOS
                    selected={this.state.selectedTab === "home"}
                    title={strings.home}
                    iconName='ios-home-outline'
                    onPress={() => this.setState({selectedTab: "home"})}>
                    <AppNavigator
                        oazaApp={this}
                        initialRoute={{ident: "HomeScreen"}} />
                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    selected={this.state.selectedTab === "categories"}
                    title={strings.categories}
                    iconName='ios-albums-outline'
                    onPress={() => this.setState({selectedTab: "categories"})}>
                    <AppNavigator
                        oazaApp={this}
                        initialRoute={{ident: "CategoriesScreen"}} />
                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    selected={this.state.selectedTab === "archive"}
                    title={strings.archive}
                    iconName='ios-list-outline'
                    onPress={() => this.setState({selectedTab: "archive"})}>
                    <AppNavigator
                        oazaApp={this}
                        initialRoute={{ident: "ArchiveScreen"}} />
                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    selected={this.state.selectedTab === "songbook"}
                    title={strings.songbook}
                    iconName='ios-musical-notes-outline'
                    onPress={() => this.setState({selectedTab: "songbook"})}>
                    <AppNavigator
                        oazaApp={this}
                        initialRoute={{ident: "SongbookScreen"}} />
                </Icon.TabBarItemIOS>

                <Icon.TabBarItemIOS
                    selected={this.state.selectedTab === "search"}
                    title={strings.search}
                    iconName='ios-search-outline'
                    onPress={() => this.setState({selectedTab: "search"})}>
                    <AppNavigator
                        oazaApp={this}
                        initialRoute={{ident: "SearchScreen"}} />
                </Icon.TabBarItemIOS>

            </TabBarIOS>
        )
    }
}

AppRegistry.registerComponent('oazatv', () => OazaApp);
