import React from 'react';
import { View, StyleSheet, Text, StatusBar, Dimensions } from "react-native";
//import styles from 'react-native-multiple-choice/styles';
import * as Animatable from 'react-native-animatable'

export default class FlashScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.header}>
                    <Animatable.Image
                        animation="bounceInLeft"
                        duration={1000}
                        source={require("../assets/flash.jpeg")}
                        style={styles.logo}
                        resizeMode='stretch' />

                    <Animatable.Text
                        animation="bounceInRight"
                        
                        duration={1200}
                        style={styles.heading}>PAT</Animatable.Text>
                    <Animatable.Text
                        animation="bounceIn"
                        duration={1200}
                        style={styles.heading}>REG</Animatable.Text>

                </View>

                <Animatable.View style={styles.footer} animation="fadeInUpBig" duration={1000}>

                    <Text style={styles.text}>SignIn</Text>
                </Animatable.View>

            </View>
        )
    }
}

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
const { height_logo } = height * 0.7 * 0.4;
var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A7C7E7'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    footer: {
        flex: 1,
        backgroundColor: 'white',
        height:height/5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 50,
    },
    logo: {
        width: 300,
        height: 300,
        borderRadius: 100,
       
    },
    title: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,

    },

    heading: {
        fontSize: 40,
        
        //backgroundColor:'#d9d9d9',
       
       },
    
})