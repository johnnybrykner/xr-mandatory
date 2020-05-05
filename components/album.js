import React from "react";
import { asset, View, StyleSheet, Text, Image } from "react-360";

export default class album extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.album__img}
          source={asset("PUT SOURCE HERE")}
        ></Image>
        <Text style={styles.album__name}>Album name</Text>
        <Text style={styles.album__subheading}>
          number of songs and length of album???
        </Text>
        <Text style={styles.album__artistname}>Artist name</Text>

        {/* View tag instead of UL tag */}
        <View style={styles.song__list}>
          {/* foreach song */}
          <View style={styles.song__item}>
            <Text style={styles.song__title}>Title of the song</Text>
            <Text style={styles.song__length}>length of the song</Text>
            {/* plus and underline to devide the songs */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 500,
    height: "max-content",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#2f2f2f",
    margin: 30,
  },
  album__img: {},
  album__name: {},
  album__subheading: {},
  album__artistname: {},
  song__list: {},
  song__item: {},
  song__title: {},
  song__length: {},
});
