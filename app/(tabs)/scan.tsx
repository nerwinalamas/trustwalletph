import Header from "@/components/header";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Scan() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View>
          <Text>Scan</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
