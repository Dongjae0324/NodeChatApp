import React, {type FC, useState, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Modal,
} from 'react-native';
import {PersonProps} from '../../types';

const PersonBlock = ({person}: PersonProps) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <View>
        <Pressable
          style={styles.container}
          onPress={() => {
            setModal(!modal);
          }}>
          <Image
            source={{uri: person.profileImage}}
            style={styles.profileImage}
          />
          <View style={{paddingHorizontal: 10}}>
            <Text style={styles.nameText}>{person.name}</Text>
            <Text style={styles.commentText}>{person.comment}</Text>
          </View>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#354f52',
          }}>
          <View style={{height: '70%'}} />
          <Image
            source={{uri: person.profileImage}}
            style={styles.profileDetailImage}
          />
          <Text style={{fontSize: 18, paddingTop: 8, fontWeight: '800'}}>
            {person.name}
          </Text>
          <Text>#{person.id}</Text>
          <Text style={{paddingVertical: 20}}>{person.comment}</Text>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    wdith: '100%',
    elevation: 1,
    backgroundColor: '#edede9',
    height: 65,
    borderRadius: 15,
  },
  profileImage: {width: 40, height: 40, borderRadius: 10},
  profileDetailImage: {borderRadius: 25, width: 80, height: 80},
  nameText: {color: 'black', fontSize: 14},
  commentText: {color: 'grey', fontSize: 13, paddingVertical: 2},
  backImage: {flex: 1, alignItems: 'center', width: '100%'},
});

export default PersonBlock;
