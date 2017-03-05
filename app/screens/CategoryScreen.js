'user strict'
import React,{Component} from 'react';
import {View, Image, Text, TextView, ListView, TouchableOpacity, Navigator, ActivityIndicator} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import ArchiveItem from '../model/ArchiveItem';

class CategoryScreen extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            loading: false,
            currentPage: 1,
            perPage: 16,
            category: null,
            data: [],
            categoryDataSource: ds.cloneWithRows([]),
        };
    }

    _getCategoryData(categoryId, page, perPage) {
        fetch('http://oaza.tv/api/v2/categories/?categoryId=' + categoryId + "&page=" + page + "&perPage=" + perPage)
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
        this._getCategoryData(this.props.category.getId(), 1, this.state.perPage);
    }

    render() {
        return (
            <ViewContainer style={{flex: 1}}>
                <StatusBarBackground/>
                <ListView style={{flex: 1, padding: 8, marginTop: 20}}
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
                setTimeout(() => {this._getCategoryData(this.state.currentPage += 1)}, 2000);
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
}

module.exports = CategoryScreen;