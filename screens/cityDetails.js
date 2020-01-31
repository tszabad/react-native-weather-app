import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Text, Image } from 'react-native';
import { globalStyles } from '../styles/global';
import Card from '../shared/card';

export default function CityDetails({ navigation }) {
  const currentCity = navigation.getParam('title');
  const [weather, setWeather] = useState({});
  const [description, setDescription] =useState(null);
  const [icon, setIcon] =useState(null);
  const [isloading, setLoading] = useState(true);

  
  console.log(currentCity);

 
getweather = async => {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      currentCity +
      "&appid=2bf63b97329b9fab7d24bf66e160db11"
  )
     .then(response => {
          return response.json();
        })
    .then(json => {
            setWeather(json.main);
            setDescription(json.weather[0].description);
            setIcon(json.weather[0].icon);
            setLoading(false);
            console.log(weather[0])
          
    })
    .catch(error => {
      console.error(error);
    });
}

  useEffect(() => {
    getweather();

  }, []);

  console.log(weather);
  return (
    <View style={globalStyles.container}>
    { isloading && <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>}
      { !isloading &&<Card >
            <Text style={globalStyles.titleText}>  {currentCity}</Text>
            <Image style={{width:75, height:75, alignSelf: 'center'}} 
             source={{uri:'http://openweathermap.org/img/w/'+icon+'.png'}} />   
            <Text style={globalStyles.titleText}> { description } </Text>
            <Text style={globalStyles.titleText}>{ Math.round(weather.temp - 273.15) }  &#8451;</Text>
            <Text style={globalStyles.paragraph}>Air Pressure: { weather.pressure } Pa</Text>
            <Text style={globalStyles.paragraph}>Humidity: { weather.humidity } %</Text>
            <Text style={globalStyles.paragraph}>Minimum temperature: { Math.round(weather.temp_min - 273.15) }  &#8451;</Text>
            <Text style={globalStyles.paragraph}>Maximum temperature: { Math.round(weather.temp_max - 273.15) }  &#8451;</Text>
          </Card>}
    </View>
  );


}