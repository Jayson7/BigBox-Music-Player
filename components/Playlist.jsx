import React, { useEffect, useState } from "react";
import { List } from "react-native-paper";
import {
  getSongsFromDevice,
  listenForMediaLibraryChanges,
} from "../utils/getSongs";

const Playlist = ({ onSelectTrack }) => {
  const [songs, setSongs] = useState([]);

  // Fetch songs from the device on component mount
  useEffect(() => {
    const fetchSongs = async () => {
      const deviceSongs = await getSongsFromDevice();
      setSongs(deviceSongs);
    };

    fetchSongs();

    // Listen for changes in the media library
    const subscription = listenForMediaLibraryChanges(fetchSongs);

    // Cleanup subscription on unmount
    return () => subscription.remove();
  }, []);

  return (
    <List.Section>
      {songs.map((track) => (
        <List.Item
          key={track.id}
          title={track.title}
          description={track.artist}
          onPress={() => onSelectTrack(track)}
          left={(props) => <List.Icon {...props} icon="music" />}
        />
      ))}
    </List.Section>
  );
};

export default Playlist;
