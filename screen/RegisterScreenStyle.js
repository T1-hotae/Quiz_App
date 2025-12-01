import { StyleSheet } from "react-native";

export const createStyles = (isDark) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: isDark ? "#020617" : "#f9fafb",
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: "center",
    },
    inner: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
    },
    logoWrapper: {
      alignItems: "center",
    },
    logo: {
      width: 120,
      height: 120,
      marginBottom: 24,
      borderRadius: 10,
    },
    title: {
      fontSize: 26,
      fontWeight: "800",
      marginBottom: 20,
      color: isDark ? "#f9fafb" : "#111827",
    },
    label: {
      marginBottom: 6,
      color: isDark ? "#e5e7eb" : "#111827",
    },
    input: {
      height: 48,
      borderWidth: 1,
      borderColor: isDark ? "#4b5563" : "#d1d5db",
      borderRadius: 10,
      paddingHorizontal: 12,
      backgroundColor: isDark ? "#020617" : "#ffffff",
      color: isDark ? "#f9fafb" : "#111827",
    },
    inputError: {
      borderColor: "#f59e0b",
    },
    errorText: {
      color: "#b45309",
      marginTop: 4,
    },
    globalError: {
      color: "#dc2626",
      marginBottom: 8,
    },
    submitButton: (canSubmit) => ({
      height: 48,
      borderRadius: 12,
      backgroundColor: canSubmit ? "#4f46e5" : "#9ca3af",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 8,
    }),
    submitText: {
      color: "#fff",
      fontWeight: "700",
    },
    linkWrapper: {
      marginTop: 16,
      alignSelf: "center",
    },
    linkText: {
      color: "#2563eb",
      fontWeight: "600",
    },
  });
