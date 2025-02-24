import * as MediaLibrary from "expo-media-library";

// Fetch songs from the device's media library
export const getSongsFromDevice = async () => {
  // Request permission to access media library
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission to access media library denied");
    return [];
  }

  // Fetch audio files from the media library
  const media = await MediaLibrary.getAssetsAsync({
    mediaType: MediaLibrary.MediaType.audio,
  });

  // Map the media assets to a simplified format
  const songs = media.assets.map((asset) => ({
    id: asset.id,
    title: asset.filename,
    artist: "Unknown Artist",
    url: asset.uri,
    artwork: asset.albumId
      ? `file://${asset.albumId}`
      : require("../assets/images/default_artwork.jpg"),
  }));

  return songs;
};

// Listen for changes in the media library
export const listenForMediaLibraryChanges = (callback) => {
  const subscription = MediaLibrary.addListener((event) => {
    if (event.hasIncrementalChanges) {
      callback();
    }
  });

  return subscription;
};
