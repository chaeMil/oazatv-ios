import React,{Component} from 'react';
import {Dimensions, View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import VideoPlayer from 'react-native-video-player';
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../styles/Colors'
const backIcon = (<Icon name="ios-arrow-back" size={30} color={Colors.white} />);

class VideoPlayerScreen extends Component {

    componentDidMount() {

    }

    render() {
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
                          style={{width: 40, height: 40, alignItems: 'center',
                          justifyContent: 'center'}}>
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
            </ViewContainer>
        )
    }

    _goBack() {
        this.props.navigator.jumpBack();
    }
}

module.exports = VideoPlayerScreen;