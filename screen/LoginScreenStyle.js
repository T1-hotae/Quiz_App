import { StyleSheet } from "react-native";

export const createStyles = (isDark) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: isDark ? "#020617" : "#f9fafb",
    },
    scrollContent: {
      flexGrow: 1,
      padding: 20,
      justifyContent: "center",
    },
    logoWrapper: {
      alignItems: "center",
    },
    logo: {
      width: 160,
      height: 160,
      borderRadius: 15,
      marginBottom: 100,
      marginTop: -50,
    },
    title: {
      color: isDark ? "#f9fafb" : "#111827",
      fontSize: 26,
      fontWeight: "800",
      marginBottom: 16,
    },
    label: {
      marginBottom: 6,
      color: isDark ? "#e5e7eb" : "#111827",
    },
    input: {
      height: 48,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: isDark ? "#4b5563" : "#d1d5db",
      paddingHorizontal: 12,
      marginBottom: 4,
      backgroundColor: isDark ? "#020617" : "#ffffff",
      color: isDark ? "#f9fafb" : "#111827",
    },
    inputError: {
      borderColor: "#f59e0b",
    },
    errorText: {
      color: "#b45309",
      marginBottom: 8,
    },
    passwordRow: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 10,
      height: 48,
      paddingHorizontal: 12,
      marginBottom: 10,
      borderColor: isDark ? "#4b5563" : "#d1d5db",
      backgroundColor: isDark ? "#020617" : "#ffffff",
    },
    passwordInput: {
      flex: 1,
      color: isDark ? "#f9fafb" : "#111827",
    },
    toggleText: {
      color: "#2563eb",
      fontWeight: "700",
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
    linkText: {
      color: "#2563eb",
      fontWeight: "600",
    },
    linkWrapper: {
      marginTop: 16,
      alignSelf: "center",
    },
    globalError: {
      color: "#dc2626",
      marginTop: 6,
      marginBottom: 8,
    },
  });
