import React from "react";
import { asset, View, StyleSheet, Text, Image } from "react-360";
import Spotify from "../spotify";

export default class artist extends React.Component {
  //TODO tweak the looping request
  async componentDidUpdate() {
    console.log("trigger!", this.props);
    if (this.props && this.props.activeArtistId && this.props.token) {
      const artistJson = await Spotify.getArtistData(
        this.props.activeArtistId,
        this.props.token
      );
      this.setState(
        {
          artistJson,
        },
        (_) => console.log(this.state.artistJson)
      );
    }
  }

  render() {
    return (
      <View style={styles.album__container}>
        <Text style={styles.album__heading}>ALBUMS FROM "artist.name"</Text>

        {/* Viewtag instead of UL tag */}
        <View style={styles.album__list}>
          {/* foreach */}
          <View style={styles.album__item}>
            <Image style={styles.album__img}></Image>
            <Text style={styles.album__name}>Random text</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  album__container: {
    width: 500,
    height: "max-content",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#2f2f2f",
    margin: 30,
  },
  album__heading: {
    color: "#FFFFFF",
  },
  /* Foreach this should be */
  album__list: {
    width: 112.5,
    height: 112.5,
  },
  album__item: {},
  album__img: {},
  album__name: {},
});
