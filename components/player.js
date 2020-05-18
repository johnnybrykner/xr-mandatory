import React from "react";
import {
  asset,
  VrButton,
  View,
  NativeModules,
  StyleSheet,
  Text,
  Environment,
} from "react-360";
const { AudioModule, VideoModule } = NativeModules;

export default class track extends React.Component {
  componentWillReceiveProps(newProps) {
    if (
      newProps &&
      newProps.activeTrackName &&
      newProps.activeArtistName &&
      newProps.activeTrackName !== this.state.activeTrackName
    ) {
      AudioModule.destroy("song");
      this.setState(
        {
          activeTrackName: newProps.activeTrackName,
          activeArtistName: newProps.activeArtistName,
        },
        (_) => {
          AudioModule.createAudio("song", {
            source: asset(`${this.state.activeTrackName}.opus`),
            volume: 0.75,
            is3d: true,
          });
        }
      );
    }
  }

  state = {
    volume: 0.75,
    activeTrackName: "No track selected",
  };

  _playAudio() {
    AudioModule.play("song", {
      position: [6, 2, 3],
    });
    Environment.setBackgroundVideo("backgroundVideo");
    VideoModule.resume("backgroundVideo");
    setInterval(() => {
      console.log("change positioning");
    }, 1000);
  }
  _stopAudio() {
    AudioModule.stop("song");
    VideoModule.stop("backgroundVideo");
    Environment.setBackgroundImage(asset("360_world.jpg"));
  }
  _turnUpVol() {
    if (this.state.volume >= 1) return;
    this.setState(
      {
        volume: this.state.volume + 0.25,
      },
      (_) => {
        AudioModule.setParams("song", {
          volume: this.state.volume,
        });
      }
    );
  }
  _turnDownVol() {
    if (this.state.volume <= 0.25) return;
    this.setState(
      {
        volume: this.state.volume - 0.25,
      },
      (_) => {
        AudioModule.setParams("song", {
          volume: this.state.volume,
        });
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.audio}>
          {/* Playbutton */}
          <VrButton style={styles.playButton} onClick={() => this._playAudio()}>
            <Text>Play</Text>
          </VrButton>

          {/* PauseButton */}
          <VrButton
            style={styles.pauseButton}
            onClick={() => this._stopAudio()}
          >
            <Text>Pause</Text>
          </VrButton>

          {/* Turn it up */}
          <VrButton
            style={styles.volumeButton}
            onClick={() => this._turnUpVol()}
          >
            <Text>Turn it up</Text>
          </VrButton>

          {/* Turn it down */}
          <VrButton
            style={styles.volumeButton}
            onClick={() => this._turnDownVol()}
          >
            <Text>Turn it down</Text>
          </VrButton>
        </View>
        <View style={styles.trackInfoContainer}>
          {this.state.activeTrackName && this.state.activeArtistName ? (
            <View>
              <Text style={styles.trackTitle}>
                {this.state.activeTrackName}
              </Text>
              <Text style={styles.trackTitle}>by</Text>
              <Text style={styles.trackTitle}>
                {this.state.activeArtistName}
              </Text>
            </View>
          ) : (
            <Text style={styles.trackTitle}>{this.state.activeTrackName}</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    width: "max-content",
    height: "max-content",
    padding: 100,
  },
  audio: {
    backgroundColor: "#CFF09E",
    height: "max-content",
    width: "max-content",
  },
  playButton: {
    height: 100,
    width: 200,
    backgroundColor: "orange",
  },
  pauseButton: {
    height: 100,
    width: 200,
    backgroundColor: "red",
  },
  volumeButton: {
    height: 100,
    width: 200,
    backgroundColor: "green",
  },
  trackTitle: {
    fontSize: 30,
  },
  trackInfoContainer: {
    margin: 50,
  },
});
