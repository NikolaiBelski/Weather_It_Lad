import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {Alert} from 'react-native';
import Loading from './components/Loading';
import * as Location from 'expo-location';
import axios from 'axios';
import Weather from './components/Weather'


const api_Key = '337b14f466ce891120bf971cafb97570'


export default class extends React.Component {

  state = {
    isLoading:true
  }


getWeather = async(latitude,longitude)=> {
   
  const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_Key}&units=metric`)
  this.setState({isLoading:false,temp:data.main.temp});
  console.log(data)
}


getLocation = async () => {
  try {
   
    await Location.requestForegroundPermissionsAsync();
    
    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync();
    this.getWeather(latitude,longitude)
    
    

  } catch (error) {
    Alert.alert('Не определяется местоположение')
  }
}

componentDidMount() {
  this.getLocation()
}



render() {
  const {isLoading,temp} = this.state

  return (

       isLoading?<Loading/>:<Weather temp = {temp} />  
     

       
  )
}


}

