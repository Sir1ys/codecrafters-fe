import { View, StyleSheet, Text, TextInput } from "react-native";
import { colors } from "../constants/colors";

export const Input = (props) => {
  const onChangeText = (text) => {
    props.onInputChanged(props.id, text);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.inputContainer}>
        {props.icon && (
          <props.iconPack
            style={styles.icon}
            name={props.icon}
            size={props.iconSize || 25}
            color="black"
          />
        )}
        <TextInput
          {...props}
          style={styles.input}
          value={props.state}
          onChangeText={onChangeText}
        />
      </View>

      {props.errorText && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: colors.nearlyWhite,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
    color: colors.grey,
    alignItems: "center",
  },
  label: {
    marginVertical: 8,
    letterSpacing: 0.3,
    color: colors.textColor,
  },
  input: {
    color: colors.textColor,
    flex: 1,
    letterSpacing: 0.3,
    paddingTop: 0,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    letterSpacing: 0.3,
    fontFamily: "bold",
  },
});
