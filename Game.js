import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback, ImageBackground, Image } from 'react-native';

import Bird from './components/Bird'
import Obstacles from './components/Obstacles'
import CheckPlayer from './CheckPlayer'

export default function Game() {
  const screenWidth = Dimensions.get("screen").width
  const screenHeight = Dimensions.get("screen").height
  const birdLeft = screenWidth / 2
  const [birdBottom, setBirdBottom]= useState(screenHeight / 2)
  const [obstaclesLeft, setObstaclesLeft]= useState(screenWidth)
  const [obstaclesLeftTwo, setObstaclesLeftTwo]= useState(screenWidth + screenWidth/2 + 30)
  const [obstaclesNegHeight, setObstaclesNegHeight]= useState(0)
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo]= useState(0)
  const [isGameOver, setIsGameOver]= useState(false)
  const [score, setScore]= useState(0)
  const gravity = 3
  let obstacleWidth = 60
  let obstacleHeight = 300
  let gap = 200
  let scoreStep = 100
  let gameTimerId
  let obstaclesTimerId
  let obstaclesTimerIdTwo

//start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity)
      },30)
  
      return () => {
        clearInterval(gameTimerId)
      }
    }
    //if i dont have birdBottom as a dependecy, it wont stop
  }, [birdBottom])

  const jump = () => {
    if (!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50)
    }
  }

  //start first obstacle
  useEffect(() => {
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5)
      }, 30)
      return () => {
        clearInterval(obstaclesTimerId)
      }
    } else {
      setScore(score => score + scoreStep)
      setObstaclesLeft(screenWidth)
      setObstaclesNegHeight( - Math.random() * 100)
    }
  }, [obstaclesLeft])

  //start second obstacle
  useEffect(() => {
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5)
      }, 30)
        return () => {
          clearInterval(obstaclesTimerIdTwo)
        }
      } else {
          setScore(score => score + scoreStep)
          setObstaclesLeftTwo(screenWidth)
          setObstaclesNegHeightTwo( - Math.random() * 100)
        }
  }, [obstaclesLeftTwo])

  //check for collisions
  useEffect(() => {
    if (
      ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
      birdBottom > (obstaclesNegHeight + obstacleHeight + gap -30)) &&
      (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30 )
      )
      || 
      ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
      birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
      (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30 )
      )
      ) 
      {
      gameOver()
    }
  })

  const gameOver = () => {
    clearInterval(gameTimerId)
    clearInterval(obstaclesTimerId)
    clearInterval(obstaclesTimerIdTwo)
    setIsGameOver(true)
  }

  const tryAgain = () => {
    setBirdBottom(screenHeight / 2)
    setObstaclesLeft(screenWidth)
    setObstaclesLeftTwo(screenWidth + screenWidth/2 + 30)
    setObstaclesNegHeight(0)
    setObstaclesNegHeightTwo(0)
    setScore(0)
    setIsGameOver(false)
  }

  return (
    <TouchableWithoutFeedback onPress={jump}>
    <View style={styles.container}>
        <ImageBackground source={require('./assets/sky.jpg')} resizeMode="cover" style={styles.bg}>
        {
            isGameOver ? (
                <ImageBackground source={require('./assets/sky.jpg')} resizeMode="cover" style={styles.boxOverlay}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>
                Earned: {score} <Image source={require('./assets/money.png')} style={{ width: 50, height: 50 }} />
                </Text>
                <View style={styles.btn}>
                <TouchableWithoutFeedback onPress={tryAgain}>
                    <Text style={{ fontWeight: 'bold' }}>Try again</Text>
                </TouchableWithoutFeedback>
                </View>
                </ImageBackground>
            ) : null
        }
        <View style={{ flex: 1, position: 'relative' }}>
            <View style={{ marginTop: 50, marginLeft: 20, zIndex: 22 }}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}><Image source={require('./assets/money.png')} style={{ width: 50, height: 50 }} /> {score}</Text>
            </View>
            <Bird 
            birdBottom = {birdBottom} 
            birdLeft = {birdLeft}
            />
            <Obstacles 
            color={'green'}
            obstacleWidth = {obstacleWidth}
            obstacleHeight = {obstacleHeight}
            randomBottom = {obstaclesNegHeight}
            gap = {gap}
            obstaclesLeft = {obstaclesLeft}
            />
            <Obstacles 
            color={'yellow'}
            obstacleWidth = {obstacleWidth}
            obstacleHeight = {obstacleHeight}
            randomBottom = {obstaclesNegHeightTwo}
            gap = {gap}
            obstaclesLeft = {obstaclesLeftTwo}
            />
        </View>
        </ImageBackground>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boxOverlay: {
    flex: 2,
    zIndex: 2222,
    backgroundColor: 'gray',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    backgroundColor: 'yellow',
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    width: '100%',
    height: '100%'
  }
})
