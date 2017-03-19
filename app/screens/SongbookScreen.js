'user strict'
import React,{Component} from 'react';
import {View, Image, Text, TextView, ListView, TouchableOpacity, Navigator, ActivityIndicator} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import {getTheme} from 'react-native-material-kit';
import Colors from '../styles/Colors';
import Constants from '../strings/Constants';

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
        fetch(Constants.server + Constants.api + 'songs/')
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
                <View style={{flex: 1, marginTop: 10, marginBottom: 4}}>
                    <Text style={{textAlign: 'center', color: Colors.primaryColor,
                        fontSize: 40, fontWeight: '200'}}>
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
                            <View style={{padding: 16, flex: 1, flexDirection: 'row'}}>
                                <Text style={{fontSize: 30, fontWeight: '200', color: Colors.md_grey_600}}>
                                    {rowData.tag}
                                </Text>
                                <View style={{paddingLeft: 16, paddingRight: 8}}>
                                    <Text>{rowData.name}</Text>
                                    <Text>{rowData.author}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}

module.exports = SongbookScreen;