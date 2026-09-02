import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image } from "react-native";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { ArrowLeft, Camera } from "lucide-react-native";
import { useProfile } from "../contexts/ProfileContext";

export default function PersonalInformation() {
  const { fullName, phone, stateOfResidence, updateProfile, photoUri, setPhotoUri } =
    useProfile();

  const initial = fullName.trim().charAt(0).toUpperCase() || "?";

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission needed", "Allow photo library access to continue.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission needed", "Allow camera access to continue.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleChangePhoto = () => {
    Alert.alert("Change photo", "Choose a source", [
      { text: "Take Photo", onPress: takePhoto },
      { text: "Choose from Gallery", onPress: pickFromGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ArrowLeft size={20} color="#111827" />
      </Pressable>

      <Text style={styles.title}>Personal Information</Text>

      <View style={styles.avatarSection}>
        <View style={styles.avatarWrap}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initial}</Text>
            </View>
          )}
          <Pressable style={styles.cameraBadge} onPress={handleChangePhoto}>
            <Camera size={12} color="#fff" />
          </Pressable>
        </View>
        <Pressable onPress={handleChangePhoto}>
          <Text style={styles.changePhoto}>Change photo</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={(v) => updateProfile({ fullName: v })}
        placeholder="Full name"
        placeholderTextColor="#9ca3af"
      />

      <Text style={[styles.label, { marginTop: 18 }]}>Phone number</Text>
      <TextInput
        style={[styles.input, styles.inputDisabled]}
        value={phone}
        editable={false}
      />
      <Text style={styles.helperText}>
        Verified - contact support to change
      </Text>

      <Text style={[styles.label, { marginTop: 18 }]}>State of Residence</Text>
      <TextInput
        style={styles.input}
        value={stateOfResidence}
        onChangeText={(v) => updateProfile({ stateOfResidence: v })}
        placeholder="State"
        placeholderTextColor="#9ca3af"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3EA",
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 24,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarWrap: {
    position: "relative",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#22A67A",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  avatarText: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "700",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#16294D",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FAF3EA",
  },
  changePhoto: {
    color: "#22A67A",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 10,
  },
  label: {
    fontSize: 13,
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#FFFFFF",
  },
  inputDisabled: {
    color: "#6b7280",
  },
  helperText: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 6,
  },
});