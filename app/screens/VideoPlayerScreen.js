import React,{Component} from 'react';
import {Dimensions, View, Text, ScrollView, StyleSheet, WebView, TouchableOpacity} from 'react-native'
import {getTheme} from 'react-native-material-kit';
import HTMLView from 'react-native-htmlview';
import Share, {ShareSheet, Button} from 'react-native-share';
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import VideoPlayer from 'react-native-video-player';
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../styles/Colors'
import constants from '../strings/Constants'
import strings from '../strings/Locale'

const theme = getTheme();
const backIcon = (<Icon name="ios-arrow-back" size={30} color={Colors.white} />);
const viewsIcon = (<Icon name="ios-eye-outline" size={30} color={Colors.primaryColor} />);
const dateIcon = (<Icon name="ios-calendar-outline" size={30} color={Colors.primaryColor} />);
const shareIcon = (<Icon name="ios-share-outline" size={30} color={Colors.primaryColor} />);

        class VideoPlayerScreen extends Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        let description = this.props.video.getDescription().toString();
        let descriptionView = null;

        if (description.length > 0) {
            descriptionView = (
                <View style={{padding: 8}}>
                    <View style={theme.cardStyle}>
                        <View style={{margin: 16}}>
                            <HTMLView value={description} />
                        </View>
                    </View>
                </View>
            );
        }

        let tags = "";
        for (let i = 0; i < this.props.video.getTags().length; i++) {
            tags += "#" + this.props.video.getTags()[i] + " ";
        }

        return (
            <ViewContainer style={{flex: 1}}>
                <StatusBarBackground/>
                <View style={{marginTop: 20, height: 40,
                    width: null, backgroundColor: Colors.primaryColor}}>
                    <View style={{alignItems: 'center', position: 'absolute', left: 0, right: 0}}>
                        <Text style={{color: Colors.white, height: 40, lineHeight: 40, fontSize: 16}}>
                            {this.props.video.getName()}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => this._goBack()}
                        style={{width: 40, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                        {backIcon}
                    </TouchableOpacity>
                </View>
                <VideoPlayer
                    video={{uri: this.props.video.getMp4FileLowRes()}}
                    thumbnail={{uri: this.props.video.getThumbFile()}}
                    duration={this.props.video.getDuration()}
                    style={{backgroundColor: Colors.black,
                        height: Dimensions.get('window').width * 0.5625 ,
                        width: null}}/>
                <ScrollView>
                    <View style={{padding: 8}}>
                        <View style={theme.cardStyle}>
                            <View style={{padding: 16, flex: 1,
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    {viewsIcon}
                                    <Text style={{color: Colors.primaryColor}}>
                                        {this.props.video.getViews()} {strings.views}
                                    </Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'center'}}>
                                    {dateIcon}
                                    <Text style={{color: Colors.primaryColor}}>
                                        {this.props.video.getDate()}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => this._shareVideo()}
                                    style={{flex: 1, alignItems: 'center'}}>
                                    {shareIcon}
                                    <Text style={{color: Colors.primaryColor}}>
                                        {strings.share}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{padding: 8}}>
                        <View style={theme.cardStyle}>
                            <View style={{padding: 16, flex: 1}}>
                                <Text style={{fontWeight: 'bold'}}>
                                    {tags}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {descriptionView}

                </ScrollView>
            </ViewContainer>
        )
    }

    _goBack() {
        this._showTabBar();
        this.props.navigator.pop();
    }

    _showTabBar() {
          this.props.oazaApp.setState({
            tabBarBottomMargin: 0
        });
    }

    _shareVideo() {
        let shareOptions = {
            title: strings.shareVideoDialogTitle,
            url: constants.videoShareLink + this.props.video.getHash(),
            subject: this.props.video.nameCs + "｜" + this.props.video.nameEn
        };

        Share.open(shareOptions);
    }
}

module.exports = VideoPlayerScreen;