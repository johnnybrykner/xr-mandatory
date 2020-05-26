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
      AudioModule.createAudio("song", {
        source: asset(`${newProps.activeTrackName}.opus`),
        volume: 0.75,
        is3d: true,
      });
      this.setState(
        {
          activeTrackName: newProps.activeTrackName.split(/\(/)[0],
          activeArtistName: newProps.activeArtistName,
          isPlaying: false,
        },
        () => {
          this._playAudio();
        }
      );
    }
  }

  state = {
    volume: 0.75,
    activeTrackName: "No track selected",
    positionX: 0,
    positionZ: 0,
    isPlaying: false,
    isSpatial: false,
  };

  positioningTimeout = null;

  positioningTimeoutForwards() {
    this.state.positionX < 2
      ? (this.positioningTimeout = setTimeout(() => {
          let newPostionX = this.state.positionX;
          newPostionX += 0.25;
          this.setState(
            {
              isSpatial: true,
              positionX: newPostionX,
            },
            (_) => {
              AudioModule.setParams("song", {
                position: [this.state.positionX, 0, 0],
              });
              this.positioningTimeoutForwards();
            }
          );
        }, 250))
      : this.positioningTimeoutBackwards();
  }

  positioningTimeoutBackwards() {
    this.state.positionX > -2
      ? (this.positioningTimeout = setTimeout(() => {
          let newPostionX = this.state.positionX;
          newPostionX -= 0.25;
          this.setState(
            {
              isSpatial: true,
              positionX: newPostionX,
            },
            (_) => {
              AudioModule.setParams("song", {
                position: [this.state.positionX, 0, 0],
              });
              this.positioningTimeoutBackwards();
            }
          );
        }, 250))
      : this.positioningTimeoutForwards();
  }

  _playAudio() {
    if (this.state.isPlaying) {
      this._stopAudio();
      return;
    }
    AudioModule.play("song", {
      position: [0, 0, 0],
    });
    this.setState({
      isPlaying: true,
    });
    Environment.setBackgroundVideo("backgroundVideo");
    VideoModule.resume("backgroundVideo");
  }
  _stopAudio() {
    this.setState({
      isPlaying: false,
    });
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
  _spatialAudio() {
    if (this.state.isSpatial) {
      clearTimeout(this.positioningTimeout);
      this.setState(
        {
          isSpatial: false,
        },
        (_) => {
          AudioModule.setParams("song", {
            position: [0, 0, 0],
          });
        }
      );
      return;
    }
    this.positioningTimeoutForwards();
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

          {/* Toggle spatial audio */}
          <VrButton
            style={styles.spatialButton}
            onClick={() => this._spatialAudio()}
          >
            <Text>Toggle spatial audio</Text>
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
    justifyContent: "space-between",
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
  spatialButton: {
    height: 100,
    width: 200,
    backgroundColor: "blue",
  },
});
