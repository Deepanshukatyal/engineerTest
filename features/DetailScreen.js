

import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image
} from 'react-native';
import { Form, Item, Button, Toast, Input } from 'native-base'
import { svgUri, SvgUri } from 'react-native-svg'
import {weatherApi} from './api'


class DetailScreen extends Component {

    state = {
        showTemperature: null,
        loadingData:false,
        weather_icons:null,
        precip:'',
        wind_speed:'',
        temp:''

    }

    
    
    showToast=(text)=>{
        Toast.show({
            text,
            duration:3000
        })
    }
    getTemperature(capital){
    this.setState({ showTemperature: true })
    const{ navigation:{navigate}}=this.props
    weatherApi(capital)
    .then(response =>{
        this.setState({loadingData:false}) 
        console.log('temp-----------',response)
        if(response&&response.data&&response.data.current ){
            this.setState({temp:response.data.current.temperature}) 
            this.setState({wind_speed:response.data.current.wind_speed}) 
            this.setState({precip:response.data.current.precip,weather_icons:response.data.current.weather_icons}) 
          
            console.log('weather_icons-----------',this.state.weather_icons)
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
    render() {
        const{weather_icons}=this.state
        const countryDetails = this.props.navigation.getParam('item');
        const { flag, latlng, capital, population } = countryDetails

        console.log("weather_icons render-----------",weather_icons)
        return (
            <View style={styles.container}>
                <ScrollView style={styles.detailView}>
                    <SvgUri

                        width="100%"
                        height='200'
                        uri={flag} />

             

                <Text style={styles.btnText}>{capital}</Text>
                <Text style={styles.btnText}>{population}</Text>
                <Text style={styles.btnText}>{latlng}</Text>

                <Text style={styles.btnText}> precip :{this.state.precip}</Text>
               
               <Text style={styles.btnText}>Temperature :{this.state.temp}</Text>
               
               <Text style={styles.btnText}>wind_speed :{this.state.wind_speed}</Text>

               {weather_icons && weather_icons.length && weather_icons.map((item,index)=>{
                return(
                    <Image
                    source={{ uri: item }}
                    style={{width:100,height:200,margin:"10%"}}
                     />
                   
                )
            })}
                <Button primary
           style={styles.btn}
           onPress={()=>this.getTemperature(capital)}
           >
               <Text style={styles.btnText}>Submit</Text>

             
           </Button>
          
           </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    loadingText: {
        textAlign: "center"
    },
    detailView: {
        marginVertical:'10%',
        width: '100%'
    },
    btnText: {
        color: "#000",
        alignSelf: "center",
        fontWeight: 'bold',
        marginVertical:5
    },
    btn: {
        margin: 15,
        justifyContent: "center"
    },
    input: {
        marginBottom: 10
    }

});
export default DetailScreen;
