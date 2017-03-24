import React, { NativeModules, Platform } from 'react-native'
import strings from '../strings/Locale';
I18n = require('react-native-i18n');

class LangUtils {
    static getLocale() {
        return strings.locale;
    }
}

module.exports = LangUtils;