import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

const styles = StyleSheet.create({
    bg: {
        width: '100%',
        height: '100%'
      }
});

const Obstacles = ({
    color,
    obstacleWidth, 
    obstacleHeight, 
    randomBottom, 
    gap, 
    obstaclesLeft,
}) => {

    return (
        <>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: 500,
                left: obstaclesLeft,
                bottom: randomBottom + obstacleHeight + gap,
            }}>
                <ImageBackground source={require('../assets/asphalt.jpg')} resizeMode="repeat" style={styles.bg} />
            </View>
            <View style={{
                position: 'absolute',
                backgroundColor: color,
                width: obstacleWidth,
                height: obstacleHeight,
                left: obstaclesLeft,
                bottom: randomBottom,
            }}>
                <ImageBackground source={require('../assets/asphalt.jpg')} resizeMode="repeat" style={styles.bg} />
            </View>
        </>
    )
}

export default Obstacles