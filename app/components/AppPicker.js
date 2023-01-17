import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import AppButton from './AppButton';
import AppText from './AppText';
import defaultStyles from '../config/styles';
import Screen from './Screen';
import StatePickerItem from './StatePickerItem';

function AppPicker({ clearFilter, items, onSelectItem, numberOfColumns = 5, placeholder, selectedItem }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container]}>
          {selectedItem ? (
            <AppText style={styles.text}>{selectedItem.shortName}</AppText>
          ) : ( 
            <AppText style={styles.placeholder}>{placeholder}</AppText> 
          )}
          <FontAwesomeIcon 
            icon={['far','chevron-down']}
            size={10}
            color={defaultStyles.colors.medium} 
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} transparent={true} animationType='slide'>
        <Screen style={styles.modalScreen} hasNoHeader>
          <View style={selectedItem ? {marginBottom: 150} : {marginBottom: 75}}>
            <View style={styles.closeButton}>
              <View style={styles.clearFilter}>
                {selectedItem && 
                  <AppButton 
                    color="secondary" 
                    onPress={() => {
                      setModalVisible(false);
                      clearFilter(true);
                    }}
                    title="Clear Filter" 
                  />
                }
              </View>
            </View> 
            <View style={styles.grid}>
              <FlatList 
                data={items}
                keyExtractor={(item) => item.value.toString()}
                horizontal={false}
                numColumns={1}
                renderItem={({ item }) => (
                  <StatePickerItem 
                    item={item}
                    onPress={() => {
                      setModalVisible(false);
                      onSelectItem(item);
                    }}
                  />
                )}
              />
            </View>
          </View>
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bottomSpacer:{
    height: 40
  },
  clearFilter: {
    flex: 2
  },
  closeButton: {
    flexDirection: 'row-reverse',
    marginHorizontal: 10
  },
  closeX: {
    marginLeft: 14,
    marginRight: 4
  },
  container: {
    alignItems: 'center',
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flex: 1,
    flexDirection: "row",
    paddingRight: 10,
    marginVertical: 10,
  },
  grid: {
    marginHorizontal: 10
  },
  modalScreen: {
    marginTop: 20,
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
