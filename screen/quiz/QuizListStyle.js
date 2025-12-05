import { StyleSheet } from "react-native";

export const getStyles = (isDark) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: isDark ? "#020617" : "#f9fafb",
    },
    content: {
      padding: 24,
      paddingBottom: 32,
    },
    header: {
      marginBottom: 18,
    },
    badge: {
      alignSelf: "flex-start",
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
      backgroundColor: isDark ? "#1d4ed8" : "#e0ecff",
      color: isDark ? "#e5e7eb" : "#1d4ed8",
      fontSize: 11,
      fontWeight: "600",
      letterSpacing: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: "800",
      color: isDark ? "#e5e7eb" : "#111827",
      marginTop: 8,
    },
    subtitle: {
      fontSize: 13,
      color: isDark ? "#9ca3af" : "#6b7280",
      marginTop: 4,
    },
    card: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      marginBottom: 12,
      borderRadius: 18,
      backgroundColor: isDark ? "#020617" : "#ffffff",
      borderWidth: 1,
      borderColor: isDark ? "#1f2937" : "#e5e7eb",
      shadowColor: isDark ? "#000" : "#111827",
      shadowOpacity: isDark ? 0.35 : 0.08,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
      elevation: 4,
    },
    iconCircle: {
      width: 46,
      height: 46,
      borderRadius: 23,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "#111827" : "#eff6ff",
      borderWidth: 1,
      borderColor: isDark ? "#1d4ed8" : "#bfdbfe",
      marginRight: 14,
    },
    iconEmoji: {
      fontSize: 24,
    },
    cardBody: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: isDark ? "#e5e7eb" : "#111827",
    },
    cardDescription: {
      fontSize: 13,
      color: isDark ? "#9ca3af" : "#4b5563",
      marginTop: 4,
    },
    cardFooter: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 8,
      justifyContent: "space-between",
    },
    chip: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
      backgroundColor: isDark ? "rgba(37,99,235,0.18)" : "#e0f2fe",
    },
    chipText: {
      fontSize: 11,
      color: isDark ? "#60a5fa" : "#1d4ed8",
      fontWeight: "600",
    },
    metaText: {
      fontSize: 11,
      color: isDark ? "#6b7280" : "#9ca3af",
    },
  });
