import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Title, List, Banner, Paragraph, Card } from 'react-native-paper';
import { AuthContext } from '../../Navigation/AuthProvider';
import auth from '@react-native-firebase/auth';
import {Container, Content} from 'native-base';

export default function ProfileTab({ navigation }) {
    const { logout, user, setUser } = useContext(AuthContext);

    const bannerDisplay = () => {
      return (
        <Banner
          visible={true}
          actions={[
            {
              label: 'About Us',
              onPress: () => navigation.navigate('About Us'),
              mode: 'contained',
            },
            {
              label: 'Change Password',
              onPress: () => navigation.navigate('Reset Password'),
              mode: 'contained',
              color: 'green',
            },
            {
              label: 'Logout',
              onPress: () => logout(),
              mode: 'contained',
              color: 'purple',
            },
          ]}>
          <Title style={styles.title}>Welcome {user.displayName}</Title>
        </Banner>
      );
    };

   const faqDisplay = () => {
      return(
        /*
        <View>
          <Title>FAQ</Title>
          <List>

          </List>
        </View>*/
        <Card>
          <Card.Title title='Question 1'/>
          <Card.Content>
            <Text>Answer to question 1</Text>
          </Card.Content>
        </Card>
      );
    }

    function onAuthStateChanged(user) {
      setUser(user);
    }
  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, [user]);

    return(
      <Container style={styles.container}> 
        <Content>
          {bannerDisplay()}
          {faqDisplay()}
        </Content>
      </Container>
    );

  /*
    return (
        <View style={styles.container}>
          <Title>Welcome {user.displayName}</Title>
          <FormButton
          title='Change password?'
          modeValue='text'
          uppercase={false}
          labelStyle={styles.navButtonText}
          onPress={() => navigation.navigate('Reset Password')}
        />
          <FormButton
            title='Logout'
            modeValue='contained'
            labelStyle={styles.loginButtonLabel}
            onPress={() => {
                logout();
                //navigation.navigate('Login');
                //might not need navigation, logout should auto go back to login screen
            }}
          />
        </View>
      );
      */
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f5f5',
      flex: 1,
      justifyContent: 'center',
    },
    titleText: {
      fontSize: 24,
      marginBottom: 10
    },
    title: {
      textAlign: 'center',
    },
    loginButtonLabel: {
      fontSize: 22
    },
    navButtonText: {
      fontSize: 16
    }
  });