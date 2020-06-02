import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Card from '../components/card';
import * as DiseaseAPI from '../API/disease';
import {v4 as uuidv4} from 'uuid';

function DiseaseTab(props) {
  const [records, setRecords] = useState([]);

  if (records.length === 0) {
    DiseaseAPI.getEpiWeek(props.epiWeek).then(data => {
      const recordList = getUniqueList(data, 'disease').map(record => {
        return {...record, id: uuidv4()};
      });
      setRecords(recordList);
    });
  }

  // The findIndex() method returns the index of the first element,
  // so if there is a second element that matches, it will never be found and added during the filter.
  const getUniqueList = (list, key) => {
    const unique = list.filter(
      (record, index) => index === list.findIndex(r => r[key] === record[key]),
    );
    return unique;
  };

  return (
    <View>
      <Text>{props.dateRange}</Text>
      <Text>{props.epiWeek}</Text>
      <View style={styles.headerStyle}>
        <Text style={styles.header}>Disease Name</Text>
        <Text style={styles.header}>Number of occurence</Text>
      </View>
      <View>
        <FlatList
          style={styles.flatList}
          data={records}
          renderItem={({item}) => (
            <Card style={styles.card}>
              <View style={styles.title1}>
                <Text>{item['disease']}</Text>
              </View>
              <View style={styles.title2}>
                <Text>{item['no._of_cases']}</Text>
              </View>
            </Card>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  header: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginHorizontal: 40,
  },
  title1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 220,
    bottom: 0,
    width: '70%',
    alignSelf: 'baseline',
    justifyContent: 'center',
  },
  title2: {
    position: 'absolute',
    top: 0,
    left: 165,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 20,
  },
  flatList: {
    marginBottom: 100,
  },
});

export default DiseaseTab;
