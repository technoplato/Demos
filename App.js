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

const DATA = {
  'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba': {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    selected: false,
  },
  '3ac68afc-c605-48d3-a4f8-fbd91aa97f63': {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    selected: false,
  },
  '58694a0f-3da1-471f-bd96-145571e29d72': {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    selected: false,
  },
};

const DataContext = createContext({
  data: [],
  selectItem: () => {},
});

const DataContextProvider = props => {
  const selectItem = id => {
    const item = state.data[id];
    item.selected = !item.selected;
    setState(oldState => {
      const dataCopy = { ...oldState.data };
      dataCopy[id] = { ...item };
      return { ...oldState, data: { ...dataCopy } };
    });
  };

  const initialState = {
    data: DATA,
    selectItem: selectItem,
  };

  const [state, setState] = useState(initialState);

  return (
    <DataContext.Provider value={state}>{props.children}</DataContext.Provider>
  );
};

const Main = ({ navigation }) => {
  const { data, selectItem } = useContext(DataContext);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.values(data)}
        renderItem={({ item }) => (
          <Item
            item={item}
            onSelect={selectItem}
            handleShowDetails={id => {
              navigation.navigate('Details', {
                id,
                onSelect: selectItem,
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
    return (
      <TouchableOpacity
        onPress={() => {
          onSelect(id);
        }}
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
          <Text onPress={() => handleShowDetails(id)}>Details</Text>
        </View>
      </TouchableOpacity>
    );
  }, [selected, title]);
}

const Details = ({
  navigation: {
    state: {
      params: { id },
    },
  },
}) => {
  const { data, selectItem } = useContext(DataContext);
  const item = data[id];

  return (
    <View
      style={[
        styles.centered,
        { backgroundColor: item.selected ? '#6e3b6e' : '#f9c2ff' },
      ]}>
      <Text style={styles.title}>{`Details for Item: ${item.title}`}</Text>
      <Text
        onPress={() => {
          selectItem(item.id);
        }}>{`Is selected: ${item.selected}\n\n(click me to toggle selected)`}</Text>
    </View>
  );
};

const StackNavigation = createStackNavigator({
  Main: Main,
  Details: Details,
});

const Container = createAppContainer(StackNavigation);

const App = () => (
  <DataContextProvider>
    <Container />
  </DataContextProvider>
);

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
