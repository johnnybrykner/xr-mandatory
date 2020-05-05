import React from "react";
import { asset, StyleSheet, VrButton, Text, View, Image } from "react-360";
import Album from "../components/album";
import Track from "../components/track";
import Artist from "../components/artist";
import List from "../components/list";
import Spotify from "../spotify";

export default class home extends React.Component {
  async componentDidMount() {
    const token = await Spotify.generateToken();
    this.setState({
      token,
      availableArtists: require("../artists.json"),
    });
  }

  _setActiveArtist(artistName) {
    const filteredArtist = this.state.availableArtists.find(
      (artist) => artist.name === artistName
    );
    this.setState(
      {
        activeArtistId: filteredArtist.spotifyId,
      },
      (_) => console.log(this.state.activeArtistId)
    );
  }

  render() {
    console.log("rerendered!");
    return this.state && this.state.token ? (
      <View style={styles.container}>
        <View style={styles.routerButtons}>
          <VrButton
            onClick={() => this.props.history.push("./scene/Sky")}
            style={styles.button}
          >
            <Text style={styles.greeting}>To first scene</Text>
          </VrButton>

          <VrButton
            onClick={() => this.props.history.push("./scene/City")}
            style={styles.button}
          >
            <Text style={styles.greeting}>To second scene</Text>
          </VrButton>
        </View>

        <View style={styles.contentSections}>
          <List
            setActiveArtist={(artistName) => this._setActiveArtist(artistName)}
            artists={this.state.availableArtists}
          />
          <Artist
            activeArtistId={this.state.activeArtistId}
            token={this.state.token}
          />
          <Album />
          <Track />
        </View>
      </View>
    ) : (
      <View style={styles.loading}>
        <Text style={styles.greeting}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    flexDirection: "column",
    width: "max-content",
    height: "max-content",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "red",
    width: 250,
    padding: 50,
    margin: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    color: "rgb(255, 255, 255)",
  },
  routerButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  contentSections: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    width: 200,
    height: 200,
    top: 400,
    left: 1200,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
});
