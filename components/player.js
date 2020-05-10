import React from "react";
import {
  asset,
  VrButton,
  View,
  NativeModules,
  StyleSheet,
  Text,
} from "react-360";
const { AudioModule } = NativeModules;

AudioModule.createAudio("song", {
  source: asset("song.mp3"),
  volume: 0.2,
  is3d: true,
});

export default class track extends React.Component {
  _playAudio() {
    AudioModule.play("song", {
      position: [6, 2, 3],
    });
  }

  _stopAudio() {
    AudioModule.stop("song");
  }

  _turnUpVol() {
    AudioModule.setParams("song", {
      volume: 0.8,
    });
  }

  render() {
    return (
      <View>
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
            style={styles.pauseButton}
            onClick={() => this._turnUpVol()}
          >
            <Text>Turn it up</Text>
          </VrButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  audio: {
    backgroundColor: "#CFF09E",
    position: "absolute",
    height: 150,
    width: 300,
  },
  playButton: {
    height: 50,
    width: 100,
    backgroundColor: "orange",
  },
  pauseButton: {
    height: 50,
    width: 100,
    backgroundColor: "red",
  },
});
