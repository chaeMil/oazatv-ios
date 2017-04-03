'user strict'
import React,{Component} from 'react';
import {View, Image, Text, TextView, TextInput, ListView, TouchableOpacity, ActivityIndicator} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import BaseScreen from '../screens/BaseScreen';
import {ArchiveItem} from '../model/ArchiveItem';
import Constants from '../strings/Constants';

class SearchScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            loading: false,
            data: [],
            searchDataSource: ds.cloneWithRows([]),
        };
    }

    _getSearchData(input) {

        this.setState({
            loading: true,
            data: []
        });

        setTimeout(() => {
            fetch(Constants.server + Constants.api + 'search/' + input)
                .then((response) => response.json())
                .then((responseJson) => {
                    let dataSource = responseJson.search;

                    this.setState({
                        data: dataSource,
                        searchDataSource: this.state.searchDataSource.cloneWithRows(dataSource),
                        loading: false
                    });

                })
                .catch((error) => {
                    console.error(error);
                });

        }, 1500);

    }

    render() {

        let toolbar = this._generateToolbar();
        let activityIndicator = null;
        let searchList = null;

        if (this.state.loading) {
            activityIndicator = (
                <ActivityIndicator
                    refs="indicator"
                    style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}/>
            );
        } else {
            searchList = (
                <ListView style={{flex: 1, padding: 8}}
                          enableEmptySections={true}
                          dataSource={this.state.searchDataSource}
                          renderRow={(rowData) => this._renderRow(rowData)}
                />
            );
        }

        return (
            <ViewContainer style={{flex: 1}}>
                <StatusBarBackground/>
                {toolbar}
                <TextInput
                    style={{margin: 8, padding: 8, borderRadius: 4, height: 40, borderColor: 'gray', borderWidth: 1}}
                    onSubmitEditing={(text) => this._getSearchData(text.nativeEvent.text)}
                    value={this.state.text}/>
                {activityIndicator}
                {searchList}
            </ViewContainer>
        )
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
                return (
                    <TouchableOpacity onPress={() => this._openAlbum(archiveItem.album)}>
                        {archiveItem.album.renderArchiveItem()}
                    </TouchableOpacity>
                );
        }
    }
}

module.exports = SearchScreen;