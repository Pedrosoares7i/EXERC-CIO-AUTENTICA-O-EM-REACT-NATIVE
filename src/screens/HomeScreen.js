import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../contexts/AuthContext";
import { colors, radius, spacing, typography } from "../theme";

export default function HomeScreen() {
  const { user, token, logout } = useAuth();

  function handleSair() {
    // Alert com botões não funciona na web; usamos o confirm do navegador.
    if (Platform.OS === "web") {
      const confirmado =
        typeof window !== "undefined" &&
        window.confirm("Deseja realmente sair?");

      if (confirmado) {
        logout();
      }
      return;
    }

    Alert.alert("Sair", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", style: "destructive", onPress: () => logout() },
    ]);
  }

  const dados = [
    { label: "Nome", valor: user?.nome ?? "Não disponível" },
    { label: "E-mail", valor: user?.email ?? "Não disponível" },
    { label: "Curso", valor: user?.curso ?? "Não disponível" },
    { label: "Módulo", valor: user?.modulo ?? "Não disponível" },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cabecalho}>
          <Text style={styles.etiqueta}>ÁREA DO ALUNO</Text>
          <Text style={styles.titulo}>
            Bem-vindo(a), {user?.nome ?? "aluno"}!
          </Text>
          <Text style={styles.subtitulo}>
            Confira abaixo suas informações acadêmicas.
          </Text>
        </View>

        <View style={styles.cartao}>
          <Text style={styles.cartaoTitulo}>Dados acadêmicos</Text>

          {dados.map((item) => (
            <View key={item.label} style={styles.linha}>
              <Text style={styles.rotulo}>{item.label}</Text>
              <Text style={styles.valor}>{item.valor}</Text>
            </View>
          ))}

          <View style={styles.tokenArea}>
            <Text style={styles.rotulo}>Token da sessão</Text>
            <Text style={styles.token} selectable>
              {token ?? "Não disponível"}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={handleSair}
          accessibilityRole="button"
          accessibilityLabel="Sair da conta"
          style={({ pressed }) => [
            styles.botaoSair,
            pressed && styles.botaoSairPressionado,
          ]}
        >
          <Text style={styles.botaoSairTexto}>Sair</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
    padding: spacing.lg,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },
  cabecalho: {
    marginBottom: spacing.lg,
  },
  etiqueta: {
    fontSize: typography.small,
    fontWeight: "700",
    letterSpacing: 1,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.text,
  },
  subtitulo: {
    marginTop: spacing.xs,
    fontSize: typography.body,
    color: colors.textMuted,
  },
  cartao: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cartaoTitulo: {
    fontSize: typography.subtitle,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: spacing.md,
  },
  linha: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rotulo: {
    fontSize: typography.small,
    fontWeight: "600",
    color: colors.textMuted,
    marginBottom: 2,
  },
  valor: {
    fontSize: typography.body,
    color: colors.text,
  },
  tokenArea: {
    marginTop: spacing.md,
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  token: {
    fontSize: typography.body,
    fontWeight: "700",
    color: colors.primaryDark,
  },
  botaoSair: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.danger,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.lg,
  },
  botaoSairPressionado: {
    backgroundColor: "#FDECEA",
  },
  botaoSairTexto: {
    color: colors.danger,
    fontSize: typography.body,
    fontWeight: "700",
  },
});
