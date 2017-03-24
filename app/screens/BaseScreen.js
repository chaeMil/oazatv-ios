'user strict'
import React,{Component} from 'react';
import {View, Image, Text, TextView, ListView, TouchableOpacity} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import Constants from '../strings/Constants';
import Colors from '../styles/Colors';
import strings from '../strings/Locale';
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

    _playVideo(video) {
        this._hideTabBar();

        this.props.navigator.push({
            ident: "VideoPlayerScreen",
            oazaApp: this.props.oazaApp,
            navigationBarHidden: true,
            video
        })
    }

    _openAlbum(album) {
        this._hideTabBar();

        this.props.navigator.push({
            ident: "AlbumScreen",
            oazaApp: this.props.oazaApp,
            navigatorBarHidden: true,
            album
        });
    }

    _generateToolbar() {
        return (
            <View style={{marginTop: 20, width: null, height: 40,
                    flexDirection: 'row', flexWrap: 'wrap',
                    backgroundColor: Colors.primaryColor,
                    zIndex: 500}}>
                <View style={{flex: 1, flexDirection: 'row',
                        alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={require('../../assets/icons/logo.png')}
                           style={{width: 25, height: 25, marginRight: 8}}/>
                    <Text style={{fontSize: 18, color: Colors.white}}>
                        {strings.appName}
                    </Text>
                </View>

            </View>
        );
    }

}

module.exports = BaseScreen;