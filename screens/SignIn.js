import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  CheckBox,
  Modal,
  Button,
  FlatList,
  ImageBackground,
} from 'react-native';
import firebase from 'firebase';
import db from "../config"
import {Input} from "react-native-elements"
import { Feather, AntDesign, Entypo } from '@expo/vector-icons'; 
import config from '../config';

export default class SignIn extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            secureTextEntry: true,
        }
    }

   
    render(){
        return(
            <View 
            style = {styles.container}
            >
            <ImageBackground
            source={require("../assets/wave.png")}
            style={styles.waveImage}
            >
            
            </ImageBackground>
            <TouchableOpacity>
            <Image
            source={require("../assets/right-arrow.png")}
            style={styles.arrow}
            >   
            </Image>   
            </TouchableOpacity>
            
            <Image
            source={require("../assets/ambulance.png")}
            style={styles.van}
            >   
            </Image>
            <Text
            style = {styles.Title}
            >
            Sign In
            </Text>
            <View style={{ flexDirection: 'row', alignSelf: 'center', width: '85%', justifyContent: 'center', alignItems: 'center'}}>
            <Input
            placeholder='Email'
            placeholderTextColor={"white"}
            value = {this.state.email}
            selectionColor={"white"}
            onChangeText = {(value)=>{
                this.setState({email: value})
            }}
            leftIcon = {<Feather name="mail" size={24} color="white" />}
            style = {styles.textInput}
            >
            </Input>
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'center', width: '85%', justifyContent: 'center', alignItems: 'center',paddingLeft: 10}}>


            <Input
            placeholder='Password'
            placeholderTextColor={"white"}
            value = {this.state.password}
            onChangeText = {(value)=>{
                this.setState({password: value})
            }}
            secureTextEntry = {this.state.secureTextEntry}
            leftIcon = {<AntDesign name="lock" size={30} color="white" />}
            style = {styles.textInput}
            >
            
            </Input>  

            <TouchableOpacity
            onPress={this.changeSecureText}
            >
            {this.state.secureTextEntry? <Entypo name="eye-with-line" size={24} color="white" style = {styles.eye}/>: <Entypo name="eye" size={24} color="white" styles = {styles.eye}/>}
            </TouchableOpacity>


            </View>

            <TouchableOpacity
            onPress={()=>{
              this.forgotPassword()
            }}
            >
            <Text
            style = {styles.forgotText}
            >
                Forgot Password?
            </Text>
            </TouchableOpacity>  

            <TouchableOpacity
            onPress={()=>{
              this.props.navigation.navigate('Register')
            }}
            >
            <Text
            style = {styles.subText}
            >
                Don't have an account?
            </Text>
            </TouchableOpacity>   
            <View
                style={styles.button}
                >
                    <TouchableOpacity
                    onPress={
                        this.SignIn
                      }
                    >
                        <Text
                        style={styles.buttonText}
                        >
                            Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    changeSecureText = () => {

      this.setState({ secureTextEntry: !this.state.secureTextEntry })
  }

  forgotPassword=()=>{
    firebase.auth().sendPasswordResetEmail(this.state.email)
  .then(() => {
  alert("Email has been sent! Check you spam too!")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
    // ..
  });
  }
    SignIn=()=>{
        if(this.state.email!=""&&this.state.password!=""){
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
        // Signed in 
        this.props.navigation.navigate('ViewData')
        var user = userCredential.user;
        // ...
        alert("You have been successfully signed in!");
        //The navigation part comes here
        this.setState({password: ""})
        this.setState({email: ""})
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ..
    });
    }
    else{
        alert("Please fill in all the fields")
    }
}
        
}


const styles = StyleSheet.create({
      container: {
        flex: 1
      },
      van: {
        width: "100%",
        height: "40%",
        marginLeft: 10,
        zindex: 0,
        marginBottom:-20
      },
      arrow: {
        width: "10%",
        height: "35%",
        marginTop: 0,
        marginLeft: 5,
        transform: [{rotate: '180deg'}],
        zindex: 1,
        position: "absolute",
        top: 0
      },
      Title: {
        color: '#5A5A5H',
        paddingRight: 20,
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 15,
        marginTop: 15
      },
      subText: {
        color: 'white',
       // paddingRight: 20,
        fontSize: 18,
        fontWeight: 'bold',
       // marginLeft: 130,
        marginTop: 0,
        alignSelf:'flex-end',
        marginRight:20,

      },

      forgotText: {
        color: 'black',
        alignSelf:'flex-end',
        marginRight:20,
       // paddingRight: 20,
        fontSize: 15,
        fontWeight: 'bold',
       // marginLeft: 130,
        marginTop: 0,
        marginBottom:10

      },
      waveImage: {
        width: "100%",
        height: "82%",
        bottom: -100,
        position: "absolute"
      
        // display: "none"
    },
    textInput: {
        color: "white",
        zindex: 1,
    },
    button:{
        backgroundColor: 'white',
        borderRadius: 50,
        width: 250,
        zindex: 4,
        bottom: 0,
        marginLeft: 50,
        marginTop: 30
      },
    buttonText:{
        color: '#',
        padding: 20,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        zindex: 4,
      },
      eye: {
        zindex:2,
        marginBottom: 20,
      }

})