import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, ImageBackground, Image, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

import Bird from './components/Bird'
import Obstacles from './components/Obstacles'
import CheckPlayer from './CheckPlayer'
import Game from './Game'

export default function App() {
  const [blockPlayer, setBlockPlayer] = useState();

  useEffect(() => {
    console.log('111blockPlayer', blockPlayer)
  }, [blockPlayer])

  return (
    <SafeAreaView style={styles.container}>
      {
        blockPlayer === undefined && <CheckPlayer setBlockPlayer={setBlockPlayer} />
      }
      {
        blockPlayer === false && (
          <WebView
            style={{ flex: 1 }}
            source={{ uri: 'https://slotscity.ua/ru' }}
          />
        )
      }
      {
        blockPlayer === true && (<Game />)
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
})
