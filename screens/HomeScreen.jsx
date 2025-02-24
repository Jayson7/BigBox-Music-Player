import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { Appbar } from "react-native-paper";
import { Audio } from "expo-av";
import Playlist from "../components/Playlist";
import NowPlaying from "../components/NowPlaying";

const HomeScreen = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [sound, setSound] = useState(null);

  // Load and play the selected track
  const playTrack = async (track) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: track.url },
      { shouldPlay: true }
    );
    setSound(newSound);
    setCurrentTrack(track);
  };

  // Cleanup sound on unmount
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Appbar.Header>
        <Appbar.Content title="Vibex Music Player" />
      </Appbar.Header>
      {currentTrack ? (
        <NowPlaying track={currentTrack} sound={sound} />
      ) : (
        <Playlist onSelectTrack={playTrack} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
});

export default HomeScreen;
