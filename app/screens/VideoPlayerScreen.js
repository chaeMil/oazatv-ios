import React,{Component} from 'react';
import {View, Text} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import VideoPlayer from 'react-native-video-player';
import Colors from '../styles/Colors'

class VideoPlayerScreen extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <ViewContainer style={{flex: 1}}>
                <StatusBarBackground/>
                <VideoPlayer video={{uri: "http://oaza.tv/db/videos/804/DZVHK7.mp4"}} />
            </ViewContainer>
        )
    }
}

module.exports = VideoPlayerScreen;