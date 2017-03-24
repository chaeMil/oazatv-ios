'user strict'
import React,{Component} from 'react';
import {View, Image, Text, ListView, TouchableOpacity, ActivityIndicator} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import BaseScreen from '../screens/BaseScreen';
import {ArchiveItem, Album, Video} from '../model/ArchiveItem';
import strings from '../strings/Locale';
import Colors from '../styles/Colors';
import Constants from '../strings/Constants';

let homeData = [];

class HomeScreen extends BaseScreen {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.state = {
            isLoading: true,
            stickyHeaders: [],
            homeDataSource: ds.cloneWithRows(homeData)
        }
    }

    componentDidMount() {
        this._getHomeData();
    }

    _getHomeData() {
        fetch(Constants.server + Constants.api + '?appVersionCode=ios-alpha')
            .then((response) => response.json())
            .then((responseJson) => {
                let dataSource = [];
                let stickyHeaders = [];

                dataSource.push({
                    section: strings.featured,
                    type: 'header'
                });
                stickyHeaders.push(0);
                for(let i = 0; i < responseJson.featured.length; i++) {
                    let video = responseJson.featured[i];
                    video['type'] = 'video';
                    dataSource.push(video);
                }

                dataSource.push({
                        section: strings.popularVideos,
                        type: 'header'
                    });
                stickyHeaders.push(responseJson.featured.length + 1);
                for(let i = 0; i < responseJson.popularVideos.length; i++) {
                    let video = responseJson.popularVideos[i];
                    video['type'] = 'video';
                    dataSource.push(video);
                }

                dataSource.push({
                    section: strings.newestVideos,
                    type: 'header'
                });
                stickyHeaders.push(responseJson.featured.length + 1 +
                    responseJson.popularVideos.length + 1);
                for(let i = 0; i < responseJson.newestVideos.length; i++) {
                    let video = responseJson.newestVideos[i];
                    video['type'] = 'video';
                    dataSource.push(video);
                }

                dataSource.push({
                    section: strings.newestAlbums,
                    type: 'header'
                });
                stickyHeaders.push(responseJson.featured.length + 1 +
                    responseJson.popularVideos.length + 1 +
                    responseJson.newestVideos.length + 1);
                for(let i = 0; i < responseJson.newestAlbums.length; i++) {
                    let album = responseJson.newestAlbums[i];
                    album['type'] = 'album';
                    dataSource.push(album);
                }

                this.setState({
                    isLoading: false,
                    data: dataSource,
                    stickyHeaders: stickyHeaders,
                    homeDataSource: this.state.homeDataSource.cloneWithRows(dataSource),
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {

        let toolbar = this._generateToolbar();
        let activityIndicator = null;
        if (this.state.isLoading) {
            activityIndicator = (
                <ActivityIndicator
                    refs="indicator"
                    style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}/>
            );
        }

        return (
            <ViewContainer>
                <StatusBarBackground/>
                {toolbar}
                {activityIndicator}
                <ListView style={{marginTop: -20, paddingLeft: 8, paddingRight: 8, paddingBottom: 8}}
                    stickyHeaderIndices={this.state.stickyHeaders}
                    enableEmptySections={true}
                    pageSize={50}
                    dataSource={this.state.homeDataSource}
                    renderRow={(rowData) => this._renderRow(rowData)}/>
            </ViewContainer>
        )
    }

    _renderRow(rowData) {
        if (rowData.type === "header") {
            return (
                <View style={{paddingTop: 8, paddingBottom: 8, backgroundColor: Colors.appBg}}>
                    <Text style={{fontSize: 18, color: Colors.primaryColor}}>
                        {rowData.section}
                    </Text>
                </View>
            );
        } else {
            let archiveItem = new ArchiveItem(rowData);

            switch (archiveItem.type) {
                case "video":
                    return (
                        <TouchableOpacity
                            onPress={() => this._playVideo(archiveItem.video)}>
                            {archiveItem.video.renderArchiveItem()}
                        </TouchableOpacity>
                    );
                case "album":
                    return (
                        <TouchableOpacity
                            onPress={() => this._openAlbum(archiveItem.album)}>
                            {archiveItem.album.renderArchiveItem()}
                        </TouchableOpacity>
                    );
            }
        }
    }
}

module.exports = HomeScreen;