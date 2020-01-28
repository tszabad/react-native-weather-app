import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/global.js';
import { Formik } from 'formik';
import * as yup from 'yup';

const citySchema = yup.object({
    title: yup.string()
      .required()
      .min(4),
    
  });

export default function CityForm({ addCity }) {

  return (
    
    <View style={globalStyles.container}>
    <Formik
        initialValues={ {title: ''}}
        validationSchema={citySchema}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          addCity(values);
        }}
      >
        {props => (
          <View>
          <TextInput
              style={globalStyles.input}
              placeholder='City title'
              onChangeText={props.handleChange('title')}
              onBlur={props.handleBlur('title')} 
              value={props.values.title}
            />
            {/* only if the left value is a valid string, will the right value be displayed */}
            <Text style={globalStyles.errorText}>{props.touched.title && props.errors.title}</Text>

           
            <Button color='maroon' title="Submit" onPress={props.handleSubmit} /> 
          </View>
        )}
      </Formik>
    </View>
    
  );
}