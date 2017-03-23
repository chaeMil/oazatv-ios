'user strict'
import React,{Component} from 'react';
import {View, Image, Text, TextView, ListView, TouchableOpacity} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import Constants from '../strings/Constants';
import BaseScreen from '../screens/BaseScreen';
import Share, {ShareSheet, Button} from 'react-native-share';
import Colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons'
import {Album} from '../model/ArchiveItem';
import Photo from '../model/Photo';
import constants from '../strings/Constants'
import strings from '../strings/Locale'
import Dimensions from 'Dimensions';


const backIcon = (<Icon name="ios-arrow-back" size={30} color={Colors.white} />);
const shareIcon = (<Icon name="ios-share-outline" size={30} color={Colors.white} />);

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
                let newDataSource = [];
                newDataSource.push({type: "description", description: album.getDescription()});
                for (let i = 0; i < album.getPhotos().length; i++) {
                    newDataSource.push({type: "photo", photo: album.getPhotos()[i]});
                }
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
                <View style={{marginTop: 20, width: null, height: 40, flexDirection: 'row', flexWrap: 'wrap',
                    backgroundColor: Colors.primaryColor}}>
                    <TouchableOpacity onPress={() => this._goBack()}
                        style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                        {backIcon}
                    </TouchableOpacity>
                    <View style={{alignItems: 'center', flex: 1}}>
                        <Text style={{color: Colors.white, height: 40, lineHeight: 40, fontSize: 14}}>
                            {this.props.album.getName()}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => this._shareAlbum()}
                                      style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                        {shareIcon}
                    </TouchableOpacity>
                </View>
                <ListView contentContainerStyle={{padding: 0, flexDirection: 'row', flexWrap: 'wrap'}}
                          dataSource={this.state.albumDataSource}
                          pageSize={this.state.photosCount}
                          enableEmptySections={true}
                          renderRow={(rowData) => this._renderRow(rowData)}
                />
            </ViewContainer>
        )
    }

    _renderRow(rowData) {
        if (rowData.type === "photo") {
            return rowData.photo.renderThumb();
        }
        if (rowData.type === "description") {
            let width = Dimensions.get('window').width;

            return ( //TODO height
                <Text style={{padding: 16, height: 200, width: width}}>
                    {this.props.album.getDescription()}
                </Text>
            );
        }
    }

    _shareAlbum() {
        let shareOptions = {
            title: strings.shareAlbumDialogTitle,
            url: constants.albumShareLink + this.props.album.hash,
            subject: this.props.album.nameCs + "｜" + this.props.album.nameEn
        };

        Share.open(shareOptions);
    }

}

module.exports = AlbumScreen;