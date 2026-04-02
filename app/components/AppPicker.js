import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import AppButton from './AppButton';
import AppText from './AppText';
import colors from '../config/colors';
import Screen from './Screen';
import StatePickerItem from './StatePickerItem';

function AppPicker({
  clearFilter,
  items,
  onSelectItem,
  numberOfColumns = 5,
  placeholder,
  selectedItem,
  style,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const listBottomPad = insets.bottom + 48;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle = colorScheme === 'light' ? styles.lightTextStyle : styles.darkTextStyle;

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, themeContainerStyle, style]}>
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
      <Modal
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
        visible={modalVisible}
      >
        <Screen style={styles.modalScreen} hasNoHeader>
          <View style={styles.modalBody}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Close picker"
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                onPress={() => setModalVisible(false)}
                style={styles.closeIconHit}
              >
                <FontAwesomeIcon
                  icon={['far', 'times']}
                  size={22}
                  color={colorScheme === 'light' ? colors.dark : colors.light}
                />
              </TouchableOpacity>
              <View style={styles.modalHeaderRight}>
                {selectedItem ? (
                  <AppButton
                    color="secondary"
                    onPress={() => {
                      setModalVisible(false);
                      clearFilter?.(true);
                    }}
                    title="Clear filter"
                  />
                ) : null}
              </View>
            </View>
            <View style={styles.grid}>
              <FlatList 
                data={items}
                keyExtractor={(item) => item.value.toString()}
                horizontal={false}
                numColumns={1}
                style={styles.flatList}
                contentContainerStyle={{ paddingBottom: listBottomPad }}
                bounces={false}
                alwaysBounceVertical={false}
                {...(Platform.OS === 'android' ? { overScrollMode: 'never' } : {})}
                showsVerticalScrollIndicator
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
  closeIconHit: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 44,
  },
  modalBody: {
    flex: 1,
    marginBottom: 24,
  },
  modalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginBottom: 8,
    minHeight: 44,
    paddingVertical: 4,
  },
  modalHeaderRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    minHeight: 44,
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
    flex: 1,
    marginHorizontal: 10,
    minHeight: 0,
  },
  flatList: {
    flex: 1,
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
