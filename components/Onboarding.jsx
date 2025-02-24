import React from "react";
import { Image, View, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#121212",
          image: <Image source={require("../assets/images/onboarding1.jpg")} />,
          title: "Welcome to Vibex",
          subtitle: "Your ultimate music player",
        },
        {
          backgroundColor: "#121212",
          image: <Image source={require("../assets/images/onboarding2.jpg")} />,
          title: "Explore Music",
          subtitle: "Discover and play your favorite songs",
        },
        {
          backgroundColor: "#121212",
          image: <Image source={require("../assets/images/onboarding3.jpg")} />,
          title: "Get Started",
          subtitle: "Tap below to start your music journey",
        },
      ]}
      onDone={() => navigation.replace("Home")}
      onSkip={() => navigation.replace("Home")}
    />
  );
};

export default OnboardingScreen;
