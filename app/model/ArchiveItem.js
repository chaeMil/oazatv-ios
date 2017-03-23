import React,{Component} from 'react';
import {View, Image, Text, TextView} from 'react-native'
import LangUtils from '../utils/LangUtils';
import strings from '../strings/Locale';
import Colors from '../styles/Colors';
import '../utils/Prototype';
import Photo from './Photo';

class ArchiveItem {
    constructor(input) {
        this.type = input.type;
        if (input.type === "video") {
            this.video = new Video(input);
        }
        if (input.type === "album") {
            this.album = new Album(input);
        }
    }
}

class Video {
    constructor(input) {
        this.id = input.id;
        this.hash = input.hash;
        if (input.mp4_file != null) {
            this.mp4File = input.mp4_file;
        }
        if (input.mp4_file_lowres != null) {
            this.mp4FileLowRes = input.mp4_file_lowres;
        }
        if (input.mp3_file != null) {
            this.mp3File = input.mp3_file;
        }
        if (input.thumb_file != null) {
            this.thumbFile = input.thumb_file;
        }
        if (input.thumb_file_lowres != null) {
            this.thumbFileLowRes = input.thumb_file_lowres;
        }
        this.subtitlesFile = input.subtitles_file;
        this.thumbColor = input.thumb_color;
        this.date = input.date;
        this.nameCs = input.name_cs;
        this.nameEn = input.name_en;
        this.tags = input.tags.replace(/\s/g,'').split(",");
        this.views = input.views;
        this.categories = input.categories.replace(/\s/g,'').split(",");
        this.descriptionCs = input.description_cs;
        this.descriptionEn = input.description_en;
        this.metadata = [];
        this.metadata.durationInSeconds = input.metadata.duration_in_seconds;
        this.metadata.durationString = input.metadata.duration_string;
    }

    getServerId() {
        return this.id;
    }

    getHash() {
        return this.hash;
    }

    getMp4File() {
        return this.mp4File;
    }

    getMp4FileLowRes() {
        return this.mp4FileLowRes;
    }

    getName() {
        switch(LangUtils.getLocale()) {
            case "en":
                return this.nameEn;
            case "cs":
            case "sk":
                return this.nameCs;
            default:
                return this.nameEn;
        }
    }

    getDescription() {
        switch(LangUtils.getLocale()) {
            case "en":
                if (this.descriptionEn == "") {
                    return this.descriptionCs;
                }
                return this.descriptionEn;
            case "cs":
            case "sk":
                return this.descriptionCs;
            default:
                if (this.descriptionEn == "") {
                    return this.descriptionCs;
                }
                return this.descriptionEn;
        }
    }

    getTags() {
        return this.tags;
    }

    getDate() {
        return this.date;
    }

    getViews() {
        return this.views;
    }

    getDuration() {
        return this.metadata.durationInSeconds;
    }

    getDurationString() {
        return this.metadata.durationString;
    }

    getLanguage() {
        if (this.tags.contains('english') && this.tags.contains('czech')) {
            return null;
        } else {
            if (this.tags.contains('english')) {
                return strings.english;
            }
            if (this.tags.contains('czech')) {
                return strings.czech;
            }
        }
    }

    getThumbFile() {
        return this.thumbFile;
    }

    getThumbColor() {
        if (this.thumbColor == null) {
            return Colors.md_grey_500;
        }
        return this.thumbColor;
    }

    renderArchiveItem() {
        var langBadge = null;
        if (this.getLanguage() != null) {
            langBadge = <View style={{position: 'absolute',
                                    bottom: 4, left: 4,
                                    padding: 2,
                                    borderRadius: 1, overflow: 'hidden',
                                    backgroundColor: Colors.alphaBlack}}>
                <Text style={{color: Colors.white, fontSize: 10}}>
                    {this.getLanguage()}
                </Text>
            </View>;
        }

        return (
            <View style={{height: 80, marginBottom: 8}}>
                <View style={{height: 80, width: 142, borderRadius: 2, overflow: 'hidden'}}>
                    <Image source={{uri: this.getThumbFile()}}
                           style={{flex: 1, backgroundColor: this.getThumbColor()}} />
                    <View style={{position: 'absolute',
                            bottom: 4, right: 4,
                            padding: 2,
                            borderRadius: 1, overflow: 'hidden',
                            backgroundColor: Colors.alphaBlack}}>
                        <Text style={{color: Colors.white, fontSize: 10}}>
                            {this.getDurationString()}
                        </Text>
                    </View>
                    {langBadge}
                </View>
                <View style={{position: 'absolute', left: 150, right: 8}}>
                    <Text style={{marginBottom: 6}}>
                        {this.getName()}
                    </Text>
                    <Text style={{color: Colors.md_grey_600}}>
                        {this.getDate()}
                    </Text>
                    <Text style={{color: Colors.md_grey_600}}>
                        {this.getViews()} {strings.views}
                    </Text>
                </View>
            </View>
        );
    }
}

class Album {
    constructor(input) {
        this.id = input.id;
        this.hash = input.hash;
        this.thumbFile = input.thumbs.thumb_1024;
        this.thumbColor = input.thumb_color;
        this.date = input.date;
        this.nameCs = input.name_cs;
        this.nameEn = input.name_en;
        this.tags = input.tags.replace(/\s/g,'').split(",");
        this.descriptionCs = input.description_cs;
        this.descriptionEn = input.description_en;
        this.photos = [];

        if (input.photos != null) {
            for (let i = 0; i < input.photos.length; i++) {
                let photo = new Photo(input.photos[i]);
                this.photos.push(photo);
            }
        }
    }

    getName() {
        switch(LangUtils.getLocale()) {
            case "en":
                return this.nameEn;
            case "cs":
            case "sk":
                return this.nameCs;
            default:
                return this.nameEn;
        }
    }

    getPhotos() {
        return this.photos;
    }

    getDate() {
        return this.date;
    }

    getThumbFile() {
        return this.thumbFile;
    }

    renderArchiveItem() {
        return (
            <View style={{height: 80, marginBottom: 8}}>
                <View style={{height: 80, width: 142, borderRadius: 2, overflow: 'hidden'}}>
                    <Image source={{uri: this.getThumbFile()}}
                           style={{flex: 1, backgroundColor: Colors.md_grey_600}} />
                </View>
                <View style={{position: 'absolute', left: 150, right: 8}}>
                    <Text style={{marginBottom: 6}}>
                        {this.getName()}
                    </Text>
                    <Text style={{color: Colors.md_grey_600}}>
                        {this.getDate()}
                    </Text>
                </View>
            </View>
        );
    }
}

module.exports = {ArchiveItem, Video, Album};