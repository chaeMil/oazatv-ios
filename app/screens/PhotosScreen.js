'user strict'
import React,{Component} from 'react';
import BaseScreen from './BaseScreen';
import {View, Image, Text, TextView, ListView, TouchableOpacity} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import Constants from '../strings/Constants';
import Colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator} from 'rn-viewpager';
import {Album} from '../model/ArchiveItem';

class PhotosScreen extends BaseScreen {

    render() {

        console.log(this.props.photoToShow);

        let pages = [];

        for (let i = 0; i < this.props.album.getPhotos().length; i++) {
            let photo = this.props.album.getPhotos()[i];
            let pageRender = this._renderPage(photo);
            pages.push(pageRender);
        }

        return (
            <ViewContainer>
                <StatusBarBackground style={{backgroundColor: Colors.black}}/>
                <IndicatorViewPager
                    initialPage={this.props.photoToShow}
                    style={{flex:1, paddingTop:20, backgroundColor:'white'}}
                    indicator={this._renderDotIndicator()}>
                    {pages}
                </IndicatorViewPager>
            </ViewContainer>
        );
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={this.props.album.getPhotos().length} />;
    }

    _renderPage(pageData) {
        return (
            <View style={{backgroundColor: Colors.black, flex: 1}}>
                <Image style={{flex: 1, resizeMode: 'contain'}}
                       source={{uri: pageData.thumb2048}} />
            </View>
        );
    }

}

module.exports = PhotosScreen;