import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth } from "../contexts/AuthContext";
import { colors, radius, spacing, typography } from "../theme";

export default function LoginScreen() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  function limparErro() {
    if (erro) {
      setErro("");
    }
  }

  async function handleEntrar() {
    if (carregando) {
      return;
    }

    const emailLimpo = email.trim();

    // Validação local antes de chamar o serviço.
    if (!emailLimpo) {
      setErro("Informe o e-mail.");
      return;
    }

    if (!senha.trim()) {
      setErro("Informe a senha.");
      return;
    }

    setErro("");
    setCarregando(true);

    try {
      await login(emailLimpo, senha);
    } catch (error) {
      setErro(error?.message ?? "Não foi possível entrar. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cartao}>
            <View style={styles.cabecalho}>
              <View style={styles.logo}>
                <Text style={styles.logoTexto}>MC</Text>
              </View>
              <Text style={styles.titulo}>Meu Curso</Text>
              <Text style={styles.subtitulo}>
                Acesse sua área acadêmica
              </Text>
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(texto) => {
                  setEmail(texto);
                  limparErro();
                }}
                placeholder="aluno@etec.sp.gov.br"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                textContentType="emailAddress"
                editable={!carregando}
                returnKeyType="next"
                accessibilityLabel="Campo de e-mail"
              />
            </View>

            <View style={styles.campo}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                value={senha}
                onChangeText={(texto) => {
                  setSenha(texto);
                  limparErro();
                }}
                placeholder="Digite sua senha"
                placeholderTextColor={colors.textMuted}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!carregando}
                returnKeyType="done"
                onSubmitEditing={handleEntrar}
                accessibilityLabel="Campo de senha"
              />
            </View>

            {erro ? (
              <View style={styles.erroContainer}>
                <Text style={styles.erroTexto} accessibilityLiveRegion="polite">
                  {erro}
                </Text>
              </View>
            ) : null}

            <Pressable
              onPress={handleEntrar}
              disabled={carregando}
              accessibilityRole="button"
              accessibilityLabel="Entrar"
              accessibilityState={{ disabled: carregando, busy: carregando }}
              style={({ pressed }) => [
                styles.botao,
                pressed && !carregando && styles.botaoPressionado,
                carregando && styles.botaoDesabilitado,
              ]}
            >
              {carregando ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.botaoTexto}>Entrar</Text>
              )}
            </Pressable>

            <View style={styles.dica}>
              <Text style={styles.dicaTitulo}>Credenciais de teste</Text>
              <Text style={styles.dicaTexto}>aluno@etec.sp.gov.br</Text>
              <Text style={styles.dicaTexto}>Senha: pam2026</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: spacing.lg,
  },
  cartao: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  cabecalho: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  logoTexto: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "700",
  },
  titulo: {
    fontSize: typography.title,
    fontWeight: "700",
    color: colors.text,
  },
  subtitulo: {
    marginTop: spacing.xs,
    fontSize: typography.body,
    color: colors.textMuted,
    textAlign: "center",
  },
  campo: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.small,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.body,
    color: colors.text,
    backgroundColor: colors.white,
  },
  erroContainer: {
    backgroundColor: "#FDECEA",
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  erroTexto: {
    color: colors.danger,
    fontSize: typography.small,
    fontWeight: "600",
  },
  botao: {
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xs,
  },
  botaoPressionado: {
    backgroundColor: colors.primaryDark,
  },
  botaoDesabilitado: {
    opacity: 0.7,
  },
  botaoTexto: {
    color: colors.white,
    fontSize: typography.body,
    fontWeight: "700",
  },
  dica: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: "center",
  },
  dicaTitulo: {
    fontSize: typography.small,
    fontWeight: "700",
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  dicaTexto: {
    fontSize: typography.small,
    color: colors.textMuted,
  },
});
