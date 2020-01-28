import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';

export default function CityDetails({ navigation, props }) {
  const currentCity = navigation.getParam('title');
  const [city, setCity] =(currentCity);
  const [weather, setWeather] = useState({});
  const [description, setDescription] =useState(null);
  const [icon, setIcon] =useState(null);

  
  console.log(currentCity);

  return(
    <View>
      <Text>{city}</Text>
      
    </View>
  )
}

getweather = async => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=2bf63b97329b9fab7d24bf66e160db11"
  )
     .then(response => {
          return response.json();
        })
    .then(json => {
            setWeather(json.main),
            setDescription(json.weather[0].description),
            setIcon(json.weather[0].icon)
          
    })
    .catch(error => {
      console.error(error);
    });
}

  useEffect(() => {
    getweather();

  }
  );

  console.log(weather);
  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { currentCity }
        </Text>
        <Text style={globalStyles.titleText}>
          {  Math.round(weather.temp - 273.15) } 
        </Text>
        <Text style={globalStyles.titleText}>
          { description }
        </Text>
        <Text style={globalStyles.titleText}>
        <Image source={"http://openweathermap.org/img/w/" + icon + ".png"} />
        </Text>
        
      </Card>
    </View>
  );

