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

const backIcon = (<Icon name="ios-arrow-back" size={30} color={Colors.white} />);

class PhotosScreen extends BaseScreen {

    render() {

        let pages = [];

        for (let i = 0; i < this.props.album.getPhotos().length; i++) {
            let photo = this.props.album.getPhotos()[i];
            let item = {key: i, photo: photo};
            let pageRender = this._renderPage(item);
            pages.push(pageRender);
        }

        return (
            <ViewContainer>
                <StatusBarBackground style={{backgroundColor: Colors.black}}/>
                <TouchableOpacity onPress={() => this.goBack()}
                    style={{position: 'absolute', top: 20, left: 0, zIndex: 10, backgroundColor: Colors.black,
                        width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                    {backIcon}
                </TouchableOpacity>
                <IndicatorViewPager
                    initialPage={this.props.photoToShow}
                    style={{flex:1, backgroundColor:'white'}}
                    indicator={this._renderDotIndicator()}>
                    {pages}
                </IndicatorViewPager>
            </ViewContainer>
        );
    }

    goBack() {
        this._goBack();
        this._hideTabBar();
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={this.props.album.getPhotos().length} />;
    }

    _renderPage(pageData) {
        return (
            <View key={pageData.key}
                  style={{backgroundColor: Colors.black, flex: 1}}>
                <Image style={{flex: 1, resizeMode: 'contain'}}
                       source={{uri: pageData.photo.thumb2048}} />
            </View>
        );
    }

}

module.exports = PhotosScreen;