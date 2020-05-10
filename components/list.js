import React from "react";
import { View, StyleSheet, Text, VrButton } from "react-360";

export default class list extends React.Component {
  componentDidMount() {
    if (this.props.artists) {
      this.setState(
        {
          artists: this.props.artists,
        },
        (_) => this._renderAvailableArtists()
      );
    }
  }

  _renderAvailableArtists() {
    return this.state && this.state.artists ? (
      this.state.artists.map((artist) => {
        return (
          <VrButton
            onClick={() => this.props.setActiveArtist(artist.name)}
            key={artist.name}
            style={styles.artist}
          >
            <Text style={styles.artist__text}>{artist.name}</Text>
          </VrButton>
        );
      })
    ) : (
      <Text>Loading...</Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>PICK YOUR FAVORITE ARTIST</Text>
        {/* put line here, or just an underline one the heading */}
        {this._renderAvailableArtists()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 500,
    height: 500,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#2f2f2f",
    margin: 30,
  },
  header: {
    fontSize: 26,
    fontFamily: "Raleway-Heavy",
    color: "white",
  },
  artist: {
    height: "max-content",
    width: "max-content",
  },
  artist__text: {
    fontSize: 16,
    color: "red",
  },
});
