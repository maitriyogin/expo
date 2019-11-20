import Constants from 'expo-constants';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import useDimensions from '../utils/useDimensions';
import DoneText from './DoneText';
import SuiteResult from './SuiteResult';

export default function Suites({ suites, ...props }) {
  const scrollView = React.useRef(null);
  const {
    window: { height },
  } = useDimensions();

  const onContentSizeChange = (contentWidth, contentHeight) => {
    if (!scrollView.current) {
      return;
    }
    scrollView.current.scrollTo({
      y: Math.max(0, contentHeight - height) + Constants.statusBarHeight,
    });
  };

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.contentContainerStyle}
      ref={scrollView}
      data={suites}
      keyExtractor={item => item.get('result').get('id')}
      renderItem={({ item }) => <SuiteResult r={item} depth={0} />}
      ListFooterComponent={() => <DoneText {...props} />}
      onContentSizeChange={onContentSizeChange}
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 5,
    paddingBottom: Constants.statusBarHeight,
  },
  list: {
    flex: 1,
  },
});
