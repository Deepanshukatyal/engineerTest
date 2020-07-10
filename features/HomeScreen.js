

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  FlatList,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import {Form,Item,Button,Toast,Input} from 'native-base'
import {getCountryApi} from './api'


class HomeScreen extends Component{
    state= {
        inputValue:null,
        loadingData:false,
        ListData:[]
    }

    showToast=(text)=>{
        Toast.show({
            text,
            duration:3000
        })
    }
handleInputChange=(newValue)=>{
    this.setState({inputValue:newValue?newValue:null})
}

handleSubmit=()=>{
    this.setState({loadingData:true})
    const{ navigation:{navigate}}=this.props
    getCountryApi(this.state.inputValue)
    .then(response =>{
        this.setState({loadingData:false}) 
        console.log('country-----------',response)
        if(response&&response.data&&response.data.length>0){
            this.setState({ListData:response.data}) 
        }
        //else if(){}
        else{
        this.showToast('OOps Something went Wrong')
        }
    })
    .catch(error=>{
        this.setState({loadingData:false}) 
        this.showToast(error.message)
    })
      

}
render(){
    const{ navigation:{navigate}}=this.props
  return(
   <View style={styles.container}>
       {this.state.loadingData&&<Text style={styles.loadingText}>Loading...........</Text>}


       <Form>
           <Item style={styles.input}>
               <Input placeholder="Enter Country Name"
               onChangeText={this.handleInputChange}
               value={this.state.inputValue}
               editable={!this.state.loadingData}
              />

           </Item>
           <Button primary
           style={styles.btn}
           onPress={this.handleSubmit}
           disabled={this.state.inputValue?false:true}>
               <Text style={styles.btnText}>Submit</Text>
           </Button>

           <FlatList  
                    data={this.state.ListData}  
                    renderItem={({item}) => 
                    <View>
                       <TouchableOpacity onPress={()=>navigate('Detail',{item})}> 
                           <Text style={styles.textSearched}  
                            >{item.name}</Text>
                            </TouchableOpacity>
                            <View style={{height:1,width:'100%',backgroundColor:"#000"}}></View>
                            </View> }  
                    ItemSeparatorComponent={this.renderSeparator}  
                />  
       </Form>

   </View>
  )
}
}


const styles = StyleSheet.create({
    container: {
        flex:1,
      backgroundColor: "#fff",
    },
    loadingText:{
        textAlign:"center"
    },
    textSearched:{
        textAlign:"center",
        margin:"5%"
    },
    btnText:{
        color:"white",
        alignSelf:"center",
        fontWeight:'bold'
    },
    btn:{
        margin:15,
        justifyContent:"center"
    },
    input:{
        marginBottom:10
    }
    
  });

export default HomeScreen;
