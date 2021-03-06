'user strict'
import React,{Component} from 'react';
import {Platform, View, Image, Text, TextView, ListView, TouchableOpacity} from 'react-native'
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

    _showSong(id) {
        this._hideTabBar();

        this.props.navigator.push({
            ident: "SongScreen",
            oazaApp: this.props.oazaApp,
            navigatorBarHidden: true,
            id
        });
    }

    _generateToolbar() {

        if (Platform.OS === 'ios') {
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
                            {strings.appName} [alpha]
                        </Text>
                    </View>

                </View>
            );
        }

        if (Platform.OS === 'android') {
            return (
                <View style={{height: 40}} />
            );
        }

        return null;

    }

    _decodeHTMLEntities(str) {
        return str.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
        });
    }

}

module.exports = BaseScreen;