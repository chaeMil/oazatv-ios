import React,{Component} from 'react';
import {Dimensions, View, Text, StyleSheet} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import Video from 'react-native-video';
import Colors from '../styles/Colors'

class VideoPlayerScreen extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <ViewContainer style={{flex: 1}}>
                <StatusBarBackground style={{backgroundColor: Colors.black}}/>
                <Video source={{uri: this.props.video.getMp4FileLowRes()}}
                    style={{backgroundColor: Colors.black,
                        marginTop: 20,
                        height: Dimensions.get('window').width * 0.5625 ,
                        width: null}}/>
            </ViewContainer>
        )
    }
}

module.exports = VideoPlayerScreen;