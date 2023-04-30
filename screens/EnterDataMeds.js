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
} from 'react-native';
import db from '../config';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { nameValue } from './EnterDataDetails';
import { nameValue2 } from './ViewDetails';
import { triggered } from './ViewDetails';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import firebase, { doc, setDoc } from 'firebase';


var nameReal

const allMeds = [];


export default class EnterDataMeds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      drug: '',
      drugValue: [],
      dosage: '',
      frequency: '',
      route: '',
      timings: '',
      modalOpen: false,
      dropdownHeight: 40,
      routeMed: 'PO',
      duration: '',
      delete:false,
    };
    var medicine = this.state.drug;
  }
  componentDidMount = () => {
    this.getMeds();
    this.readDetails();
    this.testForNavigation();
    this.setState({delete:false})
  };
  getMeds = () => {
    const allMeds = [
      this.state.drug,
      this.state.frequency,
      this.state.dosage,
      this.state.route,
      this.state.timings,
      this.state.duration,
    ];
  };
  renderItem = ({ item }) => {
    return (
      <View style={styles.itemStyle}>
        <Text style={styles.title}>{allMeds}</Text>
      </View>
    );
  };
  goBack = () => {
    this.props.navigation.navigate('ViewData');
  };

  readDetails = async () => {
    const user = firebase.auth().currentUser;
    const email = user.email;
    var drugg = [];
    db.collection(user.uid).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var fort = doc.data();
        drugg.push(fort)
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          this.setState({ drugValue: drugg });
      });
  });
  
  //  const {userN}=this.props.route.params;
  //   var docRef = db.collection(user.uid).doc("meds");

  // docRef.get().then((doc) => {
  //     if (doc.exists) {
  //       //  console.log("Document data:", doc.data());
  //       // this.setState({ name: doc.data().name });
  //       this.setState({ drugValue: doc.data() });
  //       console.log(doc.data());
  //       // this.setState({ age: doc.data().age });
  //       // this.setState({ height: doc.data().height });
  //       // this.setState({ weight: doc.data().weight });
  //       // this.setState({ bpm: doc.data().bpm });
          
  //     } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //     }
  // }).catch((error) => {
  //     console.log("Error getting document:", error);
  // }); 
  }


  testForNavigation(){
    if(triggered==true){
      nameReal = nameValue2
    } else{
      nameReal = nameValue
    }
  }
  handleUpdate = async () => {
    // console.log(this.state.drug);
    var { date} = this.state;
    const user = firebase.auth().currentUser;
    const email = user.email
   if(this.state.drug!=""){
    var addMed = db
      .collection(user.uid)
      .doc(this.state.drug);

    var setWithMerge = addMed.set(
      {
            drug: this.state.drug,
            frequency: this.state.frequency,
            dosage: this.state.dosage,
            route: this.state.route,
            timings: this.state.timings,
            duration: this.state.duration,
      },
     
    );
    alert('Saved');
    this.props.navigation.navigate('ViewData')
   }else{
    alert("Please enter the Drug's name")
   }
    
   // console.log(allMeds);
  };
  renderItem = ({ item,i }) => {
    return (
    //<ViewDetails details={viewDetails} navigation={this.props.navigation} />
      <View style={{ borderWidth: 1 }}>
         {/* <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('MedDetails', {
              medDetails: item,
             
            })
            }}> */}
        <Text style={{alignSelf:'center',fontSize:17,fontWeight:'bold'}}>
          Medicine:{item.drug}
        </Text>
        <Text style={{alignSelf:'center',fontSize:17}}>
          Dosage:{item.dosage},Frequency:{item.frequency},Duration:{item.duration}
        </Text>
        {/* </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => this.delete(item.id)} style={{alignSelf:'flex-end',marginRight:10}}>
        <MaterialCommunityIcons name="delete-outline" size={24} color="red" />
          </TouchableOpacity> */}
      </View>
    )
  };
  modalHandle = () => {
    this.setState({
      modalOpen: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  addMedication = () => {
    const user = firebase.auth().currentUser;
    const email = user.email
    db.collection(email+'/allMeds');
  };

  delete=(Id)=>{
    db.collection(firebase.auth().currentUser.uid).doc(Id).delete().then(() => {
      console.log("Document successfully deleted!");
      alert("Deleted");
      this.setState({delete:true})
  }).catch((error) => {
      console.error("Error removing document: ", error);
      alert("Something went wrong !Try again later")
  });
  }

  render() {
    const { showAlert } = this.state;
    return (
      <View style={{flex:1,height:'100%'}}>
        <Text style={{fontSize:25,alignSelf:'center',backgroundColor:'#19969d',width:'100%',color:'white',margin:10,height:50,textAlign:'center'}}>Subscribed Medication</Text>
        <FlatList
            data={this.state.drugValue}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
           // onEndReached={() => this.fetchMorePatients(searchText)}
            onEndReachedThreshold={0.7}
            ListHeaderComponent={() => (!this.state.drugValue?
              <Text style={styles.emptyMessageStyle}>No Records at the moment.Click on the '+' icon to add.</Text>  
              : null)
            }
          
          />
        
        <View
          style={{ alignSelf: 'flex-end' }}>
          <TouchableOpacity onPress={() => this.modalHandle()}>
            <Ionicons name={'add-circle'} size={80} color={'#19969d'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.goBack()} style={{}}>
          <MaterialCommunityIcons name="database-search-outline" size={60} color={'#19969d'} />
          </TouchableOpacity>
        </View>


        <Modal
          visible={this.state.modalOpen}
          animationType="slide"
          style={styles.modal}>

            <View style= {styles.textContainer}>
              <TouchableOpacity onPress={() => this.setState({ modalOpen: false })}>
                <Ionicons name={'close-circle-outline'} size={50} color={"white"} style={{marginBottom: 0}}/>
              </TouchableOpacity>

              <Text style={styles.text}>Medications</Text>
              
            </View>

          
          <View>
            <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Drug*"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ drug: text });
              }}></TextInput>
            <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Dosage*"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ dosage: text });
              }}></TextInput>
           
           <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Route*"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ route: text });
              }}></TextInput>

            <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Timings*"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ timings: text });
              }}></TextInput>

            <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Frequency*"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ frequency: text });
              }}></TextInput>

            <TextInput
              style={styles.inputBoxShort}
              placeholder="Enter Duration*"
              placeholderTextColor="black"
              onChangeText={(text) => {
                this.setState({ duration: text });
              }}></TextInput>
          </View>
          <View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                this.handleUpdate();
                this.setState({
                  modalOpen: false,
                  drug: '',
                  duration: '',
                  frequency: '',
                  dosage: '',
                  route: '',
                  timings: '',
                });
              }}>
              <Text style={styles.text2}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  saveButton: {
    //left: 0,
    //right: 0,
    //bottom: 0,
    //height: 67,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20,
    backgroundColor: '#19969d',
    marginTop: 10,
    borderColor:'green',
    borderWidth:2,
    width:'60%',
    height:50,
    alignSelf:'flex-start',
    marginLeft:25

  },
  text: {
    color: '#256D85',
    padding: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 0,
    borderRadius: 0,
  },
  inputBoxShort: {
    width: '80%',
    // alignSelf: 'center',
    height: 50,
    // textAlign: 'center',
    borderWidth: 4,
    marginLeft: 20,
    borderColor: "#D3D3D3",
    marginTop: 20,
    fontSize: 12,
    fontWeight: "bold",
    padding: 10,
    borderRadius: 35,
  },
  text2: {
    color: 'white',
    alignSelf:'center',
    fontSize: 20,
    fontWeight: 'bold',
   // textAlign: 'center',
    //borderWidth: 0,
   // borderRadius: 0,
  },
  fillContainer2: {
    flexDirection: 'row',
    padding: 0,
    alignItems: 'center',
    margin: 20,
    borderWidth: 4,
    borderColor: '#256D85',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  textContainer:{
    backgroundColor: '#19969d',
    flexDirection: "row"
  },
  text:{
    color: 'white',
    padding: 20,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
