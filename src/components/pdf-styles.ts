import { StyleSheet } from "@react-pdf/renderer";

// Create styles
export const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    fontSize: "12px",
    padding: "40px 50px",
  },
  pageNumber: {
    position: "absolute",
    bottom: "30px",
    left: "0",
    width: "100%",
    textAlign: "center",
    color: "grey",
  },
  position: {
    color: "grey",
    fontSize: "16px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  pageTitle: {
    fontSize: "20px",
  },
  certificateWrapper: {
    marginTop: "16px",
  },
  certificateTitle: {
    color: "grey",
    fontSize: "16px",
  },
  certificateDetail: {
    color: "grey",
    marginBottom: "16px",
  },
  sectionTitle: {
    marginTop: "16px",
    fontSize: "16px",
  },
  skillSectionTitle: {
    margin: "16px 0",
    fontSize: "16px",
  },
  entryTitle: {
    fontSize: "16px",
    marginTop: "16px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  columnLeft: {
    flexBasis: "35%",
  },
  columnRight: {
    flexBasis: "60%",
  },
  dateTitle: {
    textTransform: "uppercase",
    color: "grey",
    letterSpacing: "1px",
    fontSize: "16px",
    marginTop: "16px",
  },
  skillTitle: {
    textTransform: "uppercase",
    color: "grey",
    letterSpacing: "1px",
  },
  profileImage: {},
});
