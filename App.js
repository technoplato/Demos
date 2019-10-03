import React, {useState, createContext, useContext} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {DrawerNavigatorItems} from 'react-navigation-drawer';

const BlueContext = createContext(true);

const HomeScreen = ({navigation}) => {
  const {blue, setBlue} = useContext(BlueContext);
  const bg = blue ? 'blue' : 'red';

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={[styles.body, {backgroundColor: bg}]}>
        <Text
          onPress={() => {
            navigation.openDrawer();
          }}
          style={styles.sectionTitle}>
          Open Drawer
        </Text>
        <Text style={styles.sectionDescription}>
          Click <Text style={styles.highlight}>Open Drawer</Text> and click the
          button to change the color. Then come back here and check it out!
        </Text>

        <Text
          onPress={() => {
            setBlue(!blue);
          }}
          style={{fontSize: 22, color: 'white'}}>
          Click me to toggle my color
        </Text>
      </View>
    </>
  );
};

const CustomDrawer = props => {
  const {blue, setBlue} = useContext(BlueContext);
  const textColor = blue ? 'blue' : 'red';
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 32}}>Drawer</Text>
      <Text
        onPress={() => {
          setBlue(!blue);
        }}
        style={{fontSize: 22, color: textColor}}>
        Click me to toggle my color
      </Text>
      <DrawerNavigatorItems {...props} />
    </View>
  );
};

const DrawerNavigation = createDrawerNavigator(
  {
    Home: HomeScreen,
  },
  {
    contentComponent: CustomDrawer,
  },
);

const ApplicationContainer = createAppContainer(DrawerNavigation);

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.white,
  },
  highlight: {
    fontWeight: '700',
  },
});

export default () => {
  const [blue, setBlue] = useState(true);
  return (
    <BlueContext.Provider value={{blue, setBlue}}>
      <ApplicationContainer />
    </BlueContext.Provider>
  );
};
