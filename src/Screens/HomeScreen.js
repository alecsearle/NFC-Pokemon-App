import React from "react";
import {
  Alert,
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import AndroidPrompt from "../Components/AndroidPrompt";
import { readPokemon } from "../NfcUtils/readPokemon";
import { verifySignature } from "../NfcUtils/verifySignature";

function HomeScreen(props) {
  const { navigation } = props;
  const [hasNfc, setHasNfc] = React.useState(null);
  const [enabled, setEnabled] = React.useState(null);
  const androidPromptRef = React.useRef();

  React.useEffect(() => {
    async function checkNfc() {
      const supported = await NfcManager.isSupported();
      if (supported) {
        await NfcManager.start();
        setEnabled(await NfcManager.isEnabled());
      }
      setHasNfc(supported);
    }

    checkNfc();
  }, []);

  React.useEffect(() => {
    function handleUrl(url) {
      if (url) {
        navigation.navigate("DeepLinking", { msg: url.split("://")[1] });
      }
    }
    Linking.getInitialURL().then((url) => {
      handleUrl(url);
    });
    Linking.addEventListener("url", (event) => {
      handleUrl(event.url);
    });
    return () => {
      Linking.removeAllListeners("url");
    };
  }, [navigation]);

  // THIS PATTERN IS STANDARD EXAMPLE FOR READING NFC TAGS
  async function readNdef() {
    try {
      if (Platform.OS === "android") {
        androidPromptRef.current.setVisible(true);
      }
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      navigation.navigate("Tag", { tag });
    } catch (ex) {
      //   bypass
    } finally {
      NfcManager.cancelTechnologyRequest();
      if (Platform.OS === "android") {
        androidPromptRef.current.setVisible(false);
      }
    }
  }

  function renderNfcButtons() {
    if (hasNfc === null) {
      return null;
    } else if (!hasNfc) {
      return (
        <View style={styles.container}>
          <Text>Your device doesn't support NFC</Text>
        </View>
      );
    } else if (!enabled) {
      return (
        <View>
          <View style={styles.container}>
            <Text>Your NFC is not enabled!</Text>
          </View>
          <Pressable
            onPress={() => {
              NfcManager.goToNfcSetting();
            }}
          >
            <Text>GO TO NFC SETTINGS</Text>
          </Pressable>
          <Pressable
            onPress={async () => {
              setEnabled(await NfcManager.isEnabled());
            }}
          >
            <Text>CHECK AGAIN</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[styles.btn, styles.createBtn]}
          onPress={() => {
            navigation.navigate("Selection");
          }}
          activeOpacity={0.8}
        >
          <View style={styles.btnContent}>
            <Text style={styles.btnText}>CREATE POKEMON</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, styles.identifyBtn]}
          onPress={async () => {
            try {
              await NfcManager.requestTechnology(NfcTech.NfcA);
              const [pokemon, pokemonBytes] = await readPokemon();
              const result = await verifySignature(pokemonBytes);
              if (result) {
                navigation.navigate("Detail", {
                  pokemon,
                });
              } else {
                Alert.alert("Error", "Signature Validation Failed", [{ text: "OK" }]);
              }
            } catch (ex) {
              console.warn(ex);
            } finally {
              NfcManager.cancelTechnologyRequest();
            }
          }}
          activeOpacity={0.8}
        >
          <View style={styles.btnContent}>
            <Text style={styles.btnText}>IDENTIFY POKEMON</Text>
          </View>
        </TouchableOpacity>

        <AndroidPrompt
          ref={androidPromptRef}
          onCancelPress={() => {
            NfcManager.cancelTechnologyRequest();
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/pokemon/pokeball.png")}
          style={styles.pokeballImage}
        />
        <Text style={styles.bannerText}>NFC Pokemon</Text>
      </View>
      {renderNfcButtons()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  pokeballImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  bannerText: {
    fontSize: 42,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  bottom: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
  },
  btn: {
    width: 280,
    marginBottom: 20,
    borderRadius: 15,
    paddingVertical: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  createBtn: {
    backgroundColor: "#FF6B6B",
  },
  identifyBtn: {
    backgroundColor: "#4ECDC4",
  },
  btnContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default HomeScreen;
