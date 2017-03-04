import React, { NativeModules, Platform } from 'react-native'
I18n = require('react-native-i18n');

class LangUtils {
    static getLocale() {
        return I18n.currentLocale();
    }
}

module.exports = LangUtils;