import { StyleSheet } from "react-native";

export const createStyles = (isDark) =>
  StyleSheet.create({
    awardsContainer: {
      padding: 24,
      backgroundColor: isDark ? "#020617" : "#ffffff",
      gap: 12,
      flexGrow: 1,
    },
    awardsTitle: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      color: isDark ? "#e5e7eb" : "#111827",
    },
    awardsCard: {
      padding: 12,
      borderRadius: 12,
      backgroundColor: isDark ? "#0b1120" : "#F9FAFB",
      marginBottom: 8,
      borderWidth: 1,
      borderColor: isDark ? "#1f2937" : "#e5e7eb",
    },
    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4,
    },
    postTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#e5e7eb" : "#111827",
    },
    tag: {
      fontSize: 12,
      color: isDark ? "#9ca3af" : "#6B7280",
    },
    badge: {
      fontSize: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 999,
    },
    badgeUnlocked: {
      backgroundColor: "#DCFCE7",
      color: "#166534",
    },
    badgeLocked: {
      backgroundColor: isDark ? "#374151" : "#E5E7EB",
      color: isDark ? "#e5e7eb" : "#4B5563",
    },
    description: {
      fontSize: 12,
      color: isDark ? "#9ca3af" : "#4B5563",
      marginBottom: 4,
    },
    progressText: {
      fontSize: 11,
      color: isDark ? "#9ca3af" : "#6B7280",
    },
  });
