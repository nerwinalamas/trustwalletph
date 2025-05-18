import BackHeader from "@/components/back-header";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Receive() {
  return (
    <View style={styles.container}>
      <BackHeader title="Receive" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Receive</Text>
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
  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 20,
  },
});
