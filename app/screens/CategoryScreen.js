'user strict'
import React,{Component} from 'react';
import {View, Image, Text, TextView, ListView, TouchableOpacity, ActivityIndicator} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import BaseScreen from '../screens/BaseScreen';
import StatusBarBackground from '../components/StatusBarBackground';
import {ArchiveItem} from '../model/ArchiveItem';
import Colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons'
import Constants from '../strings/Constants';

const backIcon = (<Icon name="ios-arrow-back" size={30} color={Colors.white} />);

class CategoryScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            loading: false,
            currentPage: 0,
            perPage: 16,
            category: null,
            data: [],
            categoryDataSource: ds.cloneWithRows([]),
        };
    }

    _getCategoryData(categoryId, page, perPage) {
        let url = Constants.server + Constants.api +
            '/categories/?categoryId=' + categoryId +
            "&page=" + page +
            "&perPage=" + perPage;

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                let dataSource = this.state.data;
                let newDataSource = responseJson.categories.videos;
                dataSource.push.apply(dataSource, newDataSource);

                this.setState({
                    data: dataSource,
                    categoryDataSource: this.state.categoryDataSource.cloneWithRows(dataSource),
                    currentPage: page,
                });

                setTimeout(() => {this.setState({loading: false})}, 1000);

            })
            .catch((error) => {
                console.error(error);
            });

    }

    componentWillMount() {
        this._getCategoryData(this.props.category.getId(), this.state.currentPage, this.state.perPage);
    }

    render() {
        return (
            <ViewContainer style={{flex: 1}}>
                <StatusBarBackground style={{backgroundColor: this.props.category.getColor()}} />
                <View style={{marginTop: 20, width: null, height: 40,
                    backgroundColor: this.props.category.getColor()}}>
                    <View style={{alignItems: 'center', position: 'absolute', left: 0, right: 0}}>
                        <Text style={{color: Colors.white, height: 40, lineHeight: 40, fontSize: 16}}>
                            {this.props.category.getName()}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => this._goBack()}
                        style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                        {backIcon}
                    </TouchableOpacity>
                </View>
                <ListView style={{flex: 1, padding: 8}}
                    enableEmptySections={true}
                    dataSource={this.state.categoryDataSource}
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
                setTimeout(() => {this._getCategoryData(this.props.category.getId(),
                    this.state.currentPage += 1, this.state.perPage)}, 2000);
            }
        }
    }

    _renderFooter() {
        return <ActivityIndicator style={{margin: 12}}/>;
    }

    _renderRow(rowData) {
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

module.exports = CategoryScreen;