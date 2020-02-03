import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Divider, Button } from 'react-native-paper';
import { globalStyles } from '../styles/global';



export default function About() {
  return (
    <View style={globalStyles.container}>
      <Text style= {{textAlign: 'center', fontSize: 18}}>Tom Weather Application</Text>
      <Divider />
      <Text style= {{textAlign: 'center',fontSize: 18}}>powered by openweathermap.org</Text>
      <Divider />
      <Text style= {{textAlign: 'center', fontSize: 18}}>Made with </Text>
      <Button icon="cards-heart" color="red"></Button>
      <Text style= {{textAlign: 'center',fontSize: 18}}>from Hungary</Text>
    </View>
  );
}