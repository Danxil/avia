import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

const styles = StyleSheet.create({
    bg: {
        width: '100%',
        height: '100%'
      }
});

const Bird = ({birdBottom, birdLeft}) => {
    const birdWidth = 200
    const birdHeight = 100

    return (
        <View style={{
            zIndex: 444,
            position: 'absolute',
            width: birdWidth,
            height: birdHeight,
            left: birdLeft - (birdWidth/2),
            bottom: birdBottom - (birdHeight/2),
        }}>
            <ImageBackground source={require('../assets/plane.png')} resizeMode="contain" style={styles.bg}></ImageBackground>
        </View>
    )
}

export default Bird
