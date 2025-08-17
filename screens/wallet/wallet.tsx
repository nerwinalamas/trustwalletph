import BalanceCard from "@/components/balance-card";
import Header from "@/components/header";
import { COLORS } from "@/constants/colors";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function WalletScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Wallet</Text>

        <BalanceCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.main,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text.primary,
    marginBottom: 20,
  },
});
