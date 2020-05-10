import React from "react";
import { View, StyleSheet, Text, Image, VrButton } from "react-360";
import Spotify from "../spotify";

export default class artist extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeArtistId !== this.props.activeArtistId) {
      this.setState({
        apiCalled: false,
      });
    }
  }

  async _fetchAlbumData() {
    const callingForTheFirstTime = !this.state || !this.state.apiCalled;
    if (
      this.props &&
      this.props.activeArtistId &&
      this.props.token &&
      this.props.activeArtistName &&
      callingForTheFirstTime
    ) {
      artistAlbums = await Spotify.getArtistAlbums(
        this.props.activeArtistId,
        this.props.token
      );
      this.setState({
        artistAlbums,
        apiCalled: true,
      });
    }
  }

  _renderAristAlbums() {
    return this.state && this.state.artistAlbums ? (
      <View style={styles.album__list}>
        <Text style={styles.album__heading}>
          Albums from {this.props.activeArtistName}
        </Text>
        {artistAlbums.items.map((album) => {
          return (
            <VrButton
              key={album.id}
              style={styles.album__item}
              onClick={() => this.props.setActiveAlbum(album.id, album.name)}
            >
              <Image
                style={styles.album__img}
                source={{ uri: `${album.images[0].url}` }}
              ></Image>
              <Text style={styles.album__name}>{album.name}</Text>
            </VrButton>
          );
        })}
      </View>
    ) : (
      <Text style={styles.album__heading}>
        Select an artist to preview the details
      </Text>
    );
  }

  render() {
    this._fetchAlbumData();
    return (
      <View style={styles.album__container}>{this._renderAristAlbums()}</View>
    );
  }
}

const styles = StyleSheet.create({
  album__container: {
    width: 600,
    height: "max-content",
    overflow: "scroll",
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
  album__list: {
    width: "100%",
    height: "max-content",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    overflow: "scroll",
  },
  album__item: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 16,
    height: 150,
  },
  album__img: {
    width: 100,
    height: 100,
  },
  album__name: {
    fontSize: 14,
    maxWidth: 100,
  },
});
