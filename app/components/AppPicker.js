import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import AppButton from './AppButton';
import AppText from './AppText';
import colors from '../config/colors';
import Screen from './Screen';
import StatePickerItem from './StatePickerItem';

function AppPicker({ clearFilter, items, onSelectItem, numberOfColumns = 5, placeholder, selectedItem }) {
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle = colorScheme === 'light' ? styles.lightTextStyle : styles.darkTextStyle;

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, themeContainerStyle]}>
          {selectedItem ? (
            <AppText style={[styles.text, themeTextStyle]}>{selectedItem.shortName}</AppText>
          ) : ( 
            <AppText style={styles.placeholder}>{placeholder}</AppText> 
          )}
          <FontAwesomeIcon 
            icon={['far','chevron-down']}
            size={10}
            color={colors.medium} 
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
    backgroundColor: colors.light,
    borderRadius: 25,
    flex: 1,
    flexDirection: "row",
    paddingRight: 10,
    marginVertical: 10,
  },
  darkContainer: {
    backgroundColor: colors.darkBackground
  },
  darkTextStyle: {
    color: colors.light
  },
  lightContainer: {
    backgroundColor: colors.white
  },
  lightTextStyle: {
    color: colors.dark
  },
  grid: {
    marginHorizontal: 10
  },
  modalScreen: {
    marginTop: 20,
  },
  placeholder: {
    color: colors.medium,
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
