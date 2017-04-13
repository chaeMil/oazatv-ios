'user strict'
import React,{Component} from 'react';
import BaseScreen from './BaseScreen';
import {View, Image, Text, TextView, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import Constants from '../strings/Constants';
import Colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {getTheme} from 'react-native-material-kit';
import HTMLView from 'react-native-htmlview';

const theme = getTheme();
const backIcon = (<Icon name="ios-arrow-back" size={30} color={Colors.white} />);

class SongScreen extends BaseScreen {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            loaded: false
        };
    }

    componentDidMount() {
        this._getSongData(this.props.songId);
    }

    _getSongData(id) {
        fetch(Constants.server + Constants.api + 'songs/' + id + '/view')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    loaded: true,
                    name: responseJson.name,
                    tag: responseJson.tag,
                    author: responseJson.author,
                    body: responseJson.body_decoded
                })
            }).catch((error) => {
            console.log(error);
        });
    }

    render() {

        let activityIndicator = null;
        if (this.state.isLoading) {
            activityIndicator = (
                <ActivityIndicator
                    refs="indicator"
                    style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}/>
            );
        }

        let songCard = null;
        let songBody = null;

        const songStyle = StyleSheet.create({
            p: {
                fontFamily: 'Courier New',
                fontSize: 12,
                lineHeight: 10
            }
        });

        if (this.state.loaded) {
            songCard = (
                <View style={{padding: 8}}>
                    <View style={theme.cardStyle}>
                        <View style={{padding: 16, flex: 1, flexDirection: 'row'}}>
                            <Text style={{fontSize: 30, fontWeight: '200', color: Colors.md_grey_600}}>
                                {this.state.tag}
                            </Text>
                            <View style={{paddingLeft: 16, paddingRight: 8}}>
                                <Text>{this.state.name}</Text>
                                <Text>{this.state.author}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );

            songBody = (
                <View style={{padding: 15}}>
                    <HTMLView stylesheet={songStyle} value={this.state.body} />
                </View>

            );
        }

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
                            {this.state.name}
                        </Text>
                    </View>
                </View>
                <View style={{flex: 1, height: null}}>
                    {activityIndicator}
                    <ScrollView style={{flex: 1, height: null}}>
                        {songCard}
                        {songBody}
                    </ScrollView>
                </View>
            </ViewContainer>
        );
    }
}

module.exports = SongScreen;