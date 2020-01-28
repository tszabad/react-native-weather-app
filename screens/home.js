import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator,Text, TouchableOpacity, FlatList, Modal,
  TouchableWithoutFeedback, Keyboard } from 'react-native';
  import * as Location from 'expo-location';
  import * as Permissions from 'expo-permissions';

import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons';


import Card from '../shared/card';
import CityForm from './cityForm';

export default function Home({ navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  
  const [lat, setLat]  = useState("");
  const [long, setLong]  = useState("");
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState([]);
  const [location, setLocation] = useState(null);
  const [isloading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

 
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      
        setErrorMessage('Permission to access location was denied')
     
    }

    let loc = await Location.getCurrentPositionAsync({});
   
    console.log(loc);
    
        const latitude = loc.coords.latitude;
        console.log(lat);
        const longitude = loc.coords.longitude;
        
        fetch(
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
            latitude +
            "&lon=" +
            longitude +
            "&appid=2bf63b97329b9fab7d24bf66e160db11"
        )
          .then(response => {
            return response.json();
          })
          .then(json => {
           
              setLocation(json.name);
              setWeather(json.main);
              setLoading(false);
            //  description: json.weather[0].description,
            //  icon: json.weather[0].icon
             
           
          })
          .catch(error => console.error(error));
        
      

        
  };
  
    
   
 
  useEffect(() => {
    _getLocationAsync();
  
  });
  

  const addCity = (city) => {
    city.key = Math.random().toString();
    setCity((currentCity) => {
      return [city, ...currentCity];
    });
    setModalOpen(false);
  };

  const deleteCity= (key) => {
    const newCity = city.filter((i,key) => i.key = key);
    
    setCity(newCity);
  }

  return (
    <View style={globalStyles.container}>
    { isloading && <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>}
    
    { !isloading &&<Card >
            <Text style={globalStyles.titleText}> Your location:{location}</Text>
            <Text style={globalStyles.titleText}>{ Math.round(weather.temp - 273.15) }  &#8451;</Text>
            <Text style={globalStyles.paragraph}>{ weather.pressure } Pa</Text>
            <Text style={globalStyles.paragraph}>{ weather.humidity } %</Text>
            <Text style={globalStyles.paragraph}>{ Math.round(weather.temp_min - 273.15) }  &#8451;</Text>
            <Text style={globalStyles.paragraph}>{ Math.round(weather.temp_max - 273.15) }  &#8451;</Text>
            
        
          </Card>}
      <Modal visible={modalOpen} animationType='slide'>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons 
              name='close'
              size={24} 
              style={{...styles.modalToggle, ...styles.modalClose}} 
              onPress={() => setModalOpen(false)} 
            />
            <CityForm addCity={addCity} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MaterialIcons 
        name='add' 
        size={24} 
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)} 
      />

     { city && <FlatList data={city} renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('CityDetails', item)}>
          <Card >
            <Text style={globalStyles.titleText}>{ item.title }</Text>
            
          </Card>
          <MaterialIcons 
        name='delete' 
        size={24} 
        style={styles.deleteButton}
        onPress={deleteCity}  />
        
        </TouchableOpacity>
        
      )} />}
     
    </View>
  );
}

const styles = StyleSheet.create({
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
  deleteButton:{
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  
});