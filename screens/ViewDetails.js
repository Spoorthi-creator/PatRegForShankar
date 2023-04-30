import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get("window");

export default class ViewDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:this.props.route.params.patientDetails['name'],
      age:'',
      height:'',
      weight:'',
      bpm:'',
      bp:'',
      mrn:'',

      // mrn: this.props.route.params.patientDetails['mrn'],
      // name: this.props.route.params.patientDetails['name'],
      // age: this.props.route.params.patientDetails['age'],
      // height:
      //   this.props.route.params.patientDetails['height'],
      //   weight: this.props.route.params.patientDetails['weight'],
      //   bpm: this.props.route.params.patientDetails['bpm'],
      //   bp: this.props.route.params.patientDetails['BP'],
      //   bloodgroup: this.props.route.params.patientDetails['bloodgroup'],
      //   date: this.props.route.params.patientDetails['date'],
      //   gender: this.props.route.params.patientDetails['gender'],
      //   phone: this.props.route.params.patientDetails['phoneNo'],
      //   refered: this.props.route.params.patientDetails['referredBy'],
    };
   
  }
  componentDidMount = () => {
    this.readDetails();
  };
  readDetails = async () => {
    const user = firebase.auth().currentUser;
    const email = user.email
    var docRef = db.collection(email).doc(this.state.name);

  docRef.get().then((doc) => {
      if (doc.exists) {
        //  console.log("Document data:", doc.data());
        this.setState({ name: doc.data().name });
        this.setState({ mrn: doc.data().mrn });
        this.setState({ age: doc.data().age });
        this.setState({ height: doc.data().height });
        this.setState({ weight: doc.data().weight });
        this.setState({ bpm: doc.data().bpm });
          
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch((error) => {
      console.log("Error getting document:", error);
  }); 
}

  updateProfile = async () => {
  
    const user = firebase.auth().currentUser;
    const email = user.email
  
    db.collection(email).doc(this.state.name).set({
    
      mrn: this.state.mrn,
      name: this.state.name,
      date: new Date(),
      age: this.state.age,
      gender: "",
      BP:this.state.bp,
      height:this.state.height,
      weight:this.state.weight,
      phoneNo: " ",
      referredBy: "",
      bloodgroup:'',
      bpm:this.state.bpm,
      //userId:firebase.auth.currentUser.uid,

    
    name: this.state.name
    });
   alert("Profile Updated")
  };

  

  render() {
    return (
      // <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView style={{flex:1,height:height}} >
      <ScrollView
     
      >
        <ImageBackground
        source={require("../assets/ViewDetailsBackground.png")}
        style = {{height:height+200}}
        >
           
         
          
      <View
      style = {styles.titleContainer}
      >
        <View style = {{alignSelf:'center'}}>
      
        <Ionicons name={'person-circle-outline'} size={80} color={'grey'} style = {{marginLeft: 0}}/>
        {/* <View style = {styles.edit}>
          <TouchableOpacity>
         <Ionicons name={'create-outline'} size={40} color={'grey'} />
         </TouchableOpacity>
         </View> */}
         </View>
      <Text
      
      style = {styles.title}>
        {this.state.name}
      </Text>

      <Text
      style = {styles.subtitle2}
      >
        {this.state.mrn}
      </Text>

      </View>
      
      
    <View >
        <Text
        style = {styles.subtitle}
        >
          Reports
        </Text>
   
      <View style = {styles.container3}>
        <TouchableOpacity onPress={()=>this.props
        .navigation.navigate('EnterDataMeds')}>
        <Ionicons name={'add-circle'} size={70} color={'#41C264'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.props
        .navigation.navigate('Bloods',{userN: this.state.name})}>
        <Ionicons name="water" size={70} color='red'/>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={()=>this.props
        .navigation.navigate('Bloods')}>
        <Ionicons name="time" size={70} color='blue'/>
        </TouchableOpacity> */}

        
      </View>
      <Text
        style = {styles.subtitle}
        >
          Details
        </Text>
      <View style = {styles.container }>
        <Text style={styles.subtitle2}>Age</Text>
        <TextInput
        style={{alignSelf:'center',borderWidth:1,width:200,borderRadius:20,padding:10, fontSize: 20,marginLeft:17}}
         placeholder='Type your age'
         onChangeText={(text) => {
          this.setState({ age: text });
         }}
         value={this.state.age}>

        </TextInput>
        </View>

        <View style = {styles.container }>
        <Text style={styles.subtitle2}>Height</Text>
        <TextInput
        style={{alignSelf:'center',borderWidth:1,width:200,borderRadius:20,padding:10, fontSize: 20}}
         placeholder='Type your height'
         value={this.state.height}
         onChangeText={(text) => {
          this.setState({ height: text });
         }}>

        </TextInput>
        </View>

        <View style = {styles.container }>
        <Text style={styles.subtitle2}>Weight</Text>
        <TextInput
        style={{alignSelf:'center',borderWidth:1,width:200,borderRadius:20,padding:10, fontSize: 20}}
         placeholder='Type your weight'
         value={this.state.weight}
         onChangeText={(text) => {
          this.setState({ weight: text });
         }}>

        </TextInput>
        </View>

        <View style = {styles.container }>
        <Text style={styles.subtitle2}>BPM</Text>
        <TextInput
        style={{alignSelf:'center',borderWidth:1,width:200,borderRadius:20,padding:10, fontSize: 20,marginLeft:17}}
         placeholder='Type your BPM'
         value={this.state.bpm}
         onChangeText={(text) => {
          this.setState({ bpm: text });
         }}>

        </TextInput>
        </View>

        <View style = {styles.container }>
        <Text style={styles.subtitle2}>BP</Text>
        <TextInput
        style={{alignSelf:'center',borderWidth:1,width:200,borderRadius:20,padding:10, fontSize: 20,marginLeft:17}}
         placeholder='Type the BP value'
         value={this.state.bp}
         onChangeText={(text) => {
          this.setState({ bp: text });
         }}>
 
        </TextInput>
      
        </View>
        <TouchableOpacity style={styles.containerUpdate} onPress={()=>this.updateProfile()}>
          <Text style={styles.subtitle2} >Update</Text>
        </TouchableOpacity>
        </View>
          
        

       
        </ImageBackground>
       
        </ScrollView>
        </KeyboardAvoidingView>
      // </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({

  header: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
  headerImg: {
    width: '90%',
    height: 60,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  updateButton: {
    width: '60%',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#62A001',
    borderRadius: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    marginTop: 15,
    backgroundColor: "#E2F0D9",
    width: width-15,
    alignSelf: "center",
    borderRadius: 25,
    height: 50,
  
  },
  containerUpdate: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    marginTop: 15,
    backgroundColor: "#19969d",
    width: width-15,
    alignSelf: "center",
    borderRadius: 25,
    height: 50,
    borderWidth:2,
    borderColor:'green'
  
  },
  container3: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    marginTop: 15,
    backgroundColor: "#E2F0D9",
    width: width-15,
    alignSelf: "center",
    borderRadius: 25,
    
  },
  bg: {
    width: width,
    height: height,
    alignSelf: "center",
    resizeMode: "contain",
  },
  titleContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    width: width-100,
    height: 200,
    alignSelf: "center",
    margin: 30,
    marginBottom: 10,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: 'black',
    paddingRight: 0,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: "center",
    justifyContent: "center",
  },
  subtitle: {
    color: 'black',
    paddingRight: 0,
    fontSize: 27,
    fontWeight: 'bold',
    // textAlign: 'center',
   // alignSelf: "",
    justifyContent: "center",
    marginLeft: 10,
    marginTop: 42
  },
  subtitle2: {
    color: 'black',
    //marginLeft:25,
   // paddingRight: 0,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: "center",
    justifyContent: "center",
  },
  edit: {
    marginLeft: 40,
    // marginTop: 30
  },
  container2: {
   // flexDirection: "column",
    //justifyContent: "space-around",
    alignContent: "center",
    marginTop: 15,
    backgroundColor: "#E2F0D9",
    width: width-15,
    alignSelf: "center",
    borderRadius: 25,
    marginLeft: 0
  },
  subheading: {
    color: 'black',
    paddingRight: 0,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
   // alignSelf: "",
    justifyContent: "center",
    marginLeft: 10,
    marginTop: 5
  },
  subheading1: {
    color: 'black',
    paddingRight: 0,
    fontSize: 23,
    // fontWeight: 'bold',
    textAlign: 'center',
   // alignSelf: "",
    justifyContent: "center",
    marginLeft: 10,
    marginTop: 5
  }
});
