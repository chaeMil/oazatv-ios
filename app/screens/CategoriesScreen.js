'user strict'
import React,{Component} from 'react';
import {View, Image, Text, TextView, ListView, TouchableOpacity, Navigator, ActivityIndicator} from 'react-native'
import ViewContainer from '../components/ViewContainer'
import StatusBarBackground from '../components/StatusBarBackground';
import Category from '../model/Category';
import strings from '../strings/Locale';
import Colors from '../styles/Colors';
import Constants from '../strings/Constants';

let homeData = [];

class CategoriesScreen extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
        this.state = {
            dataSource: ds.cloneWithRows(homeData)
        }
    }

    componentDidMount() {
        this._getCategoriesData();
    }

    _getCategoriesData() {
        fetch(Constants.server + Constants.api + 'categories?videos=0')
            .then((response) => response.json())
            .then((responseJson) => {
                let dataSource = [];

                for(let i = 0; i < responseJson.categories.length; i++) {
                    dataSource.push(responseJson.categories[i]);
                }

                this.setState({
                    data: dataSource,
                    dataSource: this.state.dataSource.cloneWithRows(dataSource),
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <ViewContainer>
                <StatusBarBackground/>
                <ListView style={{padding: 8}}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => this._renderRow(rowData)}/>
            </ViewContainer>
        )
    }

    _renderRow(rowData) {
        let category = new Category(rowData);
        return (
            <TouchableOpacity onPress={() => this._openCategory(category)}>
                {category.renderCategoryItem()}
            </TouchableOpacity>
        );
    }

    _openCategory(category) {
        this.props.navigator.push({
            ident: "CategoryScreen",
            oazaApp: this.props.oazaApp,
            category
        })
    }
}

module.exports = CategoriesScreen;