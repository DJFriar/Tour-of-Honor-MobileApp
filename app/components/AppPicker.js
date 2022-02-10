import React from 'react';
import { FlatList, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react/cjs/react.development';

import AppButton from './AppButton';
import AppText from './AppText';
import defaultStyles from '../config/styles';
import PickerItem from './PickerItem';
import Screen from './Screen';

function AppPicker({ items, onSelectItem, numberOfColumns = 1, PickerItemComponent = PickerItem, placeholder, selectedItem, width = '100%' }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container]}>
          { selectedItem ? (
            <AppText style={styles.text}>{selectedItem.shortName}</AppText>
          ) : ( 
            <AppText style={styles.placeholder}>{placeholder}</AppText> 
          )}
          <MaterialCommunityIcons 
            name="chevron-down" 
            size={20} 
            color={defaultStyles.colors.medium} 
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType='slide'>
        <Screen hasNoHeader>
          <View style={styles.closeButton}>
            <AppButton title="Close" onPress={() => setModalVisible(false)}/>
          </View> 
          <View style={styles.grid}>

          <FlatList 
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent 
                item={item}
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
          </View>
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    marginHorizontal: 50
  },
  container: {
    alignItems: 'center',
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
  },
  grid: {
    marginHorizontal: 10
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
  text: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  }
})

export default AppPicker;