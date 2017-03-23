'user strict'
import React,{Component} from 'react';
import {View, Image, Text, TextView, ListView, TouchableOpacity} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import Constants from '../strings/Constants';
import BaseScreen from '../screens/BaseScreen';
import Colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons'
import Photo from '../model/Photo';
import {Album} from '../model/ArchiveItem';

const backIcon = (<Icon name="ios-arrow-back" size={30} color={Colors.white} />);

class AlbumScreen extends BaseScreen {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            data: [],
            albumDataSource: ds.cloneWithRows([]),
        };
    }

    componentDidMount() {
        this._getAlbumData(this.props.album.hash);
    }

    _getAlbumData(albumHash) {
        fetch(Constants.server + Constants.api + 'album/' + albumHash)
            .then((response) => response.json())
            .then((responseJson) => {
                let dataSource = this.state.data;
                let album = new Album(responseJson.album);
                let newDataSource = album.getPhotos();
                dataSource.push.apply(dataSource, newDataSource);

                this.setState({
                    data: dataSource,
                    photosCount: album.getPhotos().length,
                    albumDataSource: this.state.albumDataSource.cloneWithRows(dataSource)
                });

            })
            .catch((error) => {
                console.error(error);
            });

    }

    render() {
        return (
            <ViewContainer style={{flex: 1}}>
                <StatusBarBackground style={{backgroundColor: Colors.primaryColor}} />
                <View style={{marginTop: 20, width: null, height: 40,
                    backgroundColor: Colors.primaryColor}}>
                    <View style={{alignItems: 'center', position: 'absolute', left: 0, right: 0}}>
                        <Text style={{color: Colors.white, height: 40, lineHeight: 40, fontSize: 16}}>
                            {this.props.album.getName()}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => this._goBack()}
                                      style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                        {backIcon}
                    </TouchableOpacity>
                </View>
                <ListView contentContainerStyle={{flex: 1, padding: 3, flexDirection: 'row', flexWrap: 'wrap'}}
                          dataSource={this.state.albumDataSource}
                          pageSize={this.state.photosCount}
                          enableEmptySections={true}
                          renderRow={(photo) => this._renderRow(photo)}
                />
            </ViewContainer>
        )
    }

    _renderRow(photo) {
        return photo.renderThumb();
    }

}

module.exports = AlbumScreen;