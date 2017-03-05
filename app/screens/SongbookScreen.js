'user strict'
import React,{Component} from 'react';
import {View, Image, Text, TextView, ListView, TouchableOpacity, Navigator, ActivityIndicator} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import {getTheme} from 'react-native-material-kit';

const theme = getTheme();

class SongbookScreen extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            songbookDataSource: ds.cloneWithRows([]),
        };
    }

    _getArchiveData() {
        fetch('http://oaza.tv/api/v2/songs/')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);

                let dataSource = [];

                for(let i = 0; i < responseJson.songs.length; i++) {
                    let section = responseJson.songs[i];
                    let item = {type: "section", tag: section['tag']};
                    dataSource.push(item);

                    console.log(section);

                    for(let y = 0; y < section.songs.length; y++) {
                        let song = section.songs[y];
                        let item = {type: "song",
                            id: song['id'],
                            tag: song['tag'],
                            name: song['name'],
                            author: song['author']};

                        dataSource.push(item);
                    }
                }

                this.setState({
                    data: dataSource,
                    songbookDataSource: this.state.songbookDataSource.cloneWithRows(dataSource),
                });

                setTimeout(() => {this.setState({loading: false})}, 1000);

            })
            .catch((error) => {
                console.error(error);
            });

    }

    componentWillMount() {
        this._getArchiveData();
    }

    render() {
        return (
            <ViewContainer style={{flex: 1}}>
                <StatusBarBackground/>
                <ListView style={{flex: 1, padding: 8}}
                    enableEmptySections={true}
                    dataSource={this.state.songbookDataSource}
                    renderRow={(rowData) => this._renderRow(rowData)}
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

    _renderRow(rowData) {
        if (rowData.type == "section") {
            return (
                <View>
                    <Text>
                        {rowData.tag}
                    </Text>
                </View>
            );
        }

        if (rowData.type == "song") {
            return (
                <TouchableOpacity>
                    <View style={{padding: 8}}>
                        <View style={theme.cardStyle}>
                            <View style={{padding: 8, flex: 1}}>
                                <Text>{rowData.name}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}

module.exports = SongbookScreen;