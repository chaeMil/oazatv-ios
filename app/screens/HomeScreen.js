'user strict'
import React,{Component} from 'react';
import {View, Image, Text, TextView, ListView, TouchableOpacity, Navigator, ActivityIndicator} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import ArchiveItem from '../model/ArchiveItem';
import strings from '../strings/Locale';
import Colors from '../styles/Colors';

let homeData = [];

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.state = {
            stickyHeaders: [],
            homeDataSource: ds.cloneWithRows(homeData)
        }
    }

    componentDidMount() {
        this._getHomeData();
    }

    _getHomeData() {
        fetch('http://oaza.tv/api/v2/?appVersionCode=ios-alpha')
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
        return (
            <ViewContainer>
                <StatusBarBackground/>
                <ListView style={{paddingLeft: 8, paddingRight: 8, paddingBottom: 8}}
                    stickyHeaderIndices={[]}
                    enableEmptySections={true}
                    dataSource={this.state.homeDataSource}
                    renderRow={(rowData) => this._renderRow(rowData)}/>
            </ViewContainer>
        )
    }

    _renderRow(rowData) {
        if (rowData.type == "header") {
            return <View style={{paddingTop: 8, paddingBottom: 8, backgroundColor: Colors.appBg}}>
                <Text style={{fontSize: 18, color: Colors.primaryColor}}>
                    {rowData.section}
                </Text>
            </View>
        } else {
            var archiveItem = new ArchiveItem(rowData);

            switch (archiveItem.type) {
                case "video":
                    return (
                        <TouchableOpacity onPress={() => this._playVideo(archiveItem.video)}>
                            {archiveItem.video.renderArchiveItem()}
                        </TouchableOpacity>
                    );
                case "album":
                    return archiveItem.album.renderArchiveItem();
            }
        }
    }

    _playVideo(video) {
        this.props.navigator.push({
            ident: "VideoPlayerScreen",
            navigationBarHidden: true,
            video
        })
    }
}

module.exports = HomeScreen;