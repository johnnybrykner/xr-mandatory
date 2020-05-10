import React from "react";
import { View, StyleSheet, Text, VrButton } from "react-360";
import Spotify from "../spotify";

export default class album extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeAlbumId !== this.props.activeAlbumId) {
      this.setState({
        apiCalled: false,
      });
    }
  }

  async _fetchAlbumData() {
    const callingForTheFirstTime = !this.state || !this.state.apiCalled;
    if (
      this.props &&
      this.props.token &&
      this.props.activeAlbumId &&
      this.props.activeAlbumName &&
      callingForTheFirstTime
    ) {
      albumData = await Spotify.getAlbumData(
        this.props.activeAlbumId,
        this.props.token
      );
      this.setState({
        albumData,
        apiCalled: true,
      });
    }
  }

  _renderActiveAlbum() {
    return this.state && this.state.albumData ? (
      <View>
        <Text style={styles.album__name}>
          Album name: {this.props.activeAlbumName}
        </Text>
        <Text style={styles.album__subheading}>
          Number of tracks: {this.state.albumData.total}
        </Text>
        <Text style={styles.album__artistname}>
          From: {this.state.albumData.items[0].artists[0].name}
        </Text>
        <View style={styles.song__list}>
          {albumData.items.map((track) => {
            return (
              <VrButton
                key={track.id}
                style={styles.song__item}
                // onClick={() => this.props.setActiveTrack(track.name)}
              >
                <Text style={styles.song__title}>{track.name}</Text>
              </VrButton>
            );
          })}
        </View>
      </View>
    ) : (
      <Text style={styles.album__heading}>
        Select an album to see the tracks
      </Text>
    );
  }

  render() {
    this._fetchAlbumData();
    return <View style={styles.container}>{this._renderActiveAlbum()}</View>;
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
  album__heading: {
    color: "#FFFFFF",
    width: "100%",
  },
  album__name: {},
  album__subheading: {},
  album__artistname: {},
  song__list: {
    width: "100%",
    height: "max-content",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  song__item: {
    margin: 16,
  },
  song__title: {},
  song__length: {},
});
