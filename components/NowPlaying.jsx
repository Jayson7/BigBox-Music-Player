import React, { useState, useEffect } from "react";
import { View, Text, Slider, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const NowPlaying = ({ track, sound }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (sound) {
      sound.getStatusAsync().then((status) => {
        setDuration(status.durationMillis);
      });

      const interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        setPosition(status.positionMillis);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [sound]);

  const togglePlayback = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{track.title}</Text>
      <Text style={styles.artist}>{track.artist}</Text>
      <Slider
        style={styles.progressBar}
        value={position / duration}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#888888"
      />
      <View style={styles.controls}>
        <Button icon="skip-previous" onPress={() => {}} />
        <Button icon={isPlaying ? "pause" : "play"} onPress={togglePlayback} />
        <Button icon="skip-next" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  artist: {
    fontSize: 18,
    color: "#888888",
  },
  progressBar: {
    width: "80%",
    marginTop: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
});

export default NowPlaying;
