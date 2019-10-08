import React, {
  useState,
  createContext,
  useContext,
  useRef,
  useMemo,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    selected: false,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    selected: false,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    selected: false,
  },
];

const Main = ({ navigation }) => {
  const [data, setData] = useState(DATA);

  const onSelect = useRef(id => {
    setData(oldData => {
      return [
        ...oldData.map(item => {
          if (id === item.id) {
            return {
              ...item,
              selected: !item.selected,
            };
          }
          return item;
        }),
      ];
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            item={item}
            onSelect={onSelect.current}
            handleShowDetails={item => {
              navigation.navigate('Details', {
                item,
                onSelect: onSelect.current,
              });
            }}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

function Item({ item, onSelect, handleShowDetails }) {
  const { id, title, selected } = item;
  return useMemo(() => {
    console.log('L44 "item is rendering" ===', id);
    return (
      <TouchableOpacity
        onPress={() => onSelect(id)}
        style={[
          styles.item,
          { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 18,
          }}>
          <Text style={styles.title}>{title}</Text>
          <Text onPress={() => handleShowDetails(item)}>Details</Text>
        </View>
      </TouchableOpacity>
    );
  }, [selected, title]);
}

const Details = ({
  navigation: {
    state: {
      params: { item, onSelect },
    },
  },
}) => {
  const [detailsSelected, setDetailsSelected] = useState(item.selected);
  return (
    <View style={styles.centered}>
      <Text style={styles.largeText}>{`Details for ID: ${item.id}`}</Text>
      <Text
        onPress={() => {
          onSelect(item.id);
          setDetailsSelected(!detailsSelected);
        }}>{`Is selected: ${detailsSelected}\n\n(click me to toggle selected)`}</Text>
    </View>
  );
};

const StackNavigation = createStackNavigator({
  Main: Main,
  Details: Details,
});

const App = createAppContainer(StackNavigation);

export default App;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '400',
  },
  container: {
    flex: 1,
    marginTop: 24,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
