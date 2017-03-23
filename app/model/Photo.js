import React,{Component} from 'react';
import {View, Image, Text, TextView} from 'react-native'
import LangUtils from '../utils/LangUtils';
import strings from '../strings/Locale';
import Colors from '../styles/Colors';
import '../utils/Prototype';

class Photo {
    constructor(input) {
        this.order = input.order;
        if (input.description_cs != null) {
            this.descriptionCs = input.description_cs;
        }
        if (input.description_en != null) {
            this.descriptionEn = input.description_en;
        }
        this.originalFile = input.original_file;
        this.thumb128 = input.thumb_128;
        this.thumb256 = input.thumb_256;
        this.thumb512 = input.thumb_512;
        this.thumb1024 = input.thumb_1024;
        this.thumb2048 = input.thumb_2048;
    }

    getDescription() {
        switch(LangUtils.getLocale()) {
            case "en":
                return this.descriptionEn;
            case "cs":
            case "sk":
                return this.descriptionCs;
            default:
                return this.descriptionEn;
        }
    }

    renderThumb() {
        return (
            <Image source={this.thumb256}
                   style={{margin: 3, width: 100}} />
        );
    }
}

module.exports = Photo;