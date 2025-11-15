import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  imageContainer: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  profileImg: {
    width: 150,
    height: 150,
    borderRadius: 60,
    borderWidth: 1,
  },
  schoolLogo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  nameText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 24,
  },
  subText: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
  },
  card: {
    backgroundColor: "white",
    marginTop: 30,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "90%",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111827",
  },
  cardContent: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#02ac10ff",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 28,
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  detailButton: {
    backgroundColor: "#02ac10ff",
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 28,
    marginTop: 40,
  },
  // 블로그영역
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 55,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#02ac10ff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },

  footer: {
    marginTop: 40,
    fontSize: 14,
    color: "#6b7280",
    fontStyle: "italic",
  },
  //blog
  blogContainer: {
    padding: 24,
    backgroundColor: "#f9fafb",
    gap: 16,
  },
  blogTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 10,
  },
  blogCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  postTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
  },
  tag: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 6,
  },
});
