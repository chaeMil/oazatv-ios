import React,{Component} from 'react';
import {View, Image, Text, TextView} from 'react-native'
import LangUtils from '../utils/LangUtils';
import strings from '../strings/Locale';
import Colors from '../styles/Colors';
import '../utils/Prototype';

class Category {
    constructor(input) {
        this.id = input.id;
        this.nameCs = input.name_cs;
        this.nameEn = input.name_en;
        this.color = input.color;
    }

    getId() {
        return this.id;
    }

    getColor() {
        return this.color;
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

    renderCategoryItem() {
        return (
            <View style={{backgroundColor: this.getColor(),
                padding: 12, marginBottom: 8, borderRadius: 2}}>
                <Text style={{color: Colors.white, fontWeight: 'bold'}}>
                    {this.getName().toUpperCase()}
                </Text>
            </View>
        );
    }
}

module.exports = Category;