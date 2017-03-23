'user strict'
import React,{Component} from 'react';
import {View, Image, Text, TextView, ListView, TouchableOpacity, ActivityIndicator} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import BaseScreen from '../screens/BaseScreen';
import ArchiveItem from '../model/ArchiveItem';
import Constants from '../strings/Constants';

class ArchiveScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            loading: false,
            currentPage: 1,
            data: [],
            archiveDataSource: ds.cloneWithRows([]),
        };
    }

    _getArchiveData(page) {
        fetch(Constants.server + Constants.api + 'archive/' + page)
            .then((response) => response.json())
            .then((responseJson) => {
                let dataSource = this.state.data;
                let newDataSource = responseJson.archive;
                dataSource.push.apply(dataSource, newDataSource);

                this.setState({
                    data: dataSource,
                    archiveDataSource: this.state.archiveDataSource.cloneWithRows(dataSource),
                    currentPage: page,
                });

                setTimeout(() => {this.setState({loading: false})}, 1000);

            })
            .catch((error) => {
                console.error(error);
            });

    }

    componentWillMount() {
        this._getArchiveData(1);
    }

    render() {
        return (
            <ViewContainer style={{flex: 1}}>
                <StatusBarBackground/>
                <ListView style={{flex: 1, padding: 8}}
                    enableEmptySections={true}
                    dataSource={this.state.archiveDataSource}
                    renderRow={(rowData) => this._renderRow(rowData)}
                    renderFooter={() => this._renderFooter()}
                    onScroll={(scroll) => this._onScroll(scroll)}
                />
            </ViewContainer>
        )
    }

    _onScroll(scroll) {
        let contentOffset = scroll.nativeEvent.contentOffset.y;
        let layoutHeight = scroll.nativeEvent.layoutMeasurement.height;
        let contentHeight = scroll.nativeEvent.contentSize.height;

        if ((contentHeight - layoutHeight - contentOffset) <= 0) {
            if (!this.state.loading) {
                this.setState({
                    loading: true
                });
                setTimeout(() => {this._getArchiveData(this.state.currentPage += 1)}, 2000);
            }
        }
    }

    _renderFooter() {
        return <ActivityIndicator style={{margin: 12}}/>;
    }

    _renderRow(rowData) {
        let archiveItem = new ArchiveItem(rowData);

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

    _playVideo(video) {
        this._hideTabBar();

        this.props.navigator.push({
            ident: "VideoPlayerScreen",
            oazaApp: this.props.oazaApp,
            navigationBarHidden: true,
            video
        })
    }
}

module.exports = ArchiveScreen;