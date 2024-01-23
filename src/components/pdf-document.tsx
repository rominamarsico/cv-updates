import { Image, Document, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "./pdf-styles";
import { useTranslation } from "react-i18next";
import { Details, Skills, Work, Education, Project } from "../model/pdf-model";
import profileImg from "../assets/profile.png";

type PdfDocumentProps = {
  position: string;
  availabilityDate: string;
  availabilityHours: string;
};

// Create Document Component
export function MyDocument({
  position,
  availabilityDate,
  availabilityHours,
}: PdfDocumentProps) {
  const { t } = useTranslation();

  const certificate: Details[] = t("certificate", { returnObjects: true });
  const details: Details[] = t("details", { returnObjects: true });
  const availabilityDetails: Details = t("availability", {
    returnObjects: true,
  });
  const skills: Skills[] = t("skills.details", { returnObjects: true });
  const furtherSkills: Skills[] = t("furtherSkills.details", {
    returnObjects: true,
  });
  const work: Work[] = t("work.details", { returnObjects: true });
  const education: Education[] = t("education.details", {
    returnObjects: true,
  });
  const projects: Project[] = t("projects.details", { returnObjects: true });

  function getProjectRow(rowData: { name: string; detail: string }) {
    return (
      <View style={styles.row}>
        <View style={styles.columnLeft}>
          <Text>{rowData.name}</Text>
        </View>
        <View style={styles.columnRight}>
          <Text>{rowData.detail}</Text>
        </View>
      </View>
    );
  }

  function getProjectContributionRow(rowData: {
    name: string;
    detail: string[];
  }) {
    return (
      <View style={styles.row}>
        <View style={styles.columnLeft}>
          <Text>{rowData.name}</Text>
        </View>
        <View style={styles.columnRight}>
          {rowData.detail.map((entry: string, index: number) => (
            <Text key={index}>• {entry}</Text>
          ))}
        </View>
      </View>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* page number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber }) => t("pageFooter", { pageNumber })}
          fixed
        />

        {/* profile */}
        <View style={styles.row}>
          <View style={styles.columnLeft}>
            <Image src={profileImg} />
          </View>

          <View style={styles.columnRight}>
            <Text style={styles.pageTitle}>{t("name")}</Text>

            <Text style={styles.position}>{t(position)}</Text>

            <View style={styles.certificateWrapper}>
              {certificate.map((entry, index) => (
                <View key={index}>
                  <Text style={styles.certificateTitle}>{entry.name}</Text>
                  <Text style={styles.certificateDetail}>{entry.detail}</Text>
                </View>
              ))}
            </View>

            {details.map((entry, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.columnLeft}>{entry.name}</Text>
                <Text style={styles.columnRight}>{entry.detail}</Text>
              </View>
            ))}

            <View style={styles.row}>
              <Text style={styles.columnLeft}>{availabilityDetails.name}</Text>
              <Text style={styles.columnRight}>
                {t("availability.detail", {
                  date: availabilityDate,
                  hours: availabilityHours,
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* skills */}
        <Text style={styles.skillSectionTitle}>{t("skills.name")}</Text>
        {skills.map((skill, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.columnLeft}>
              <Text style={styles.skillTitle}>{skill.name}</Text>
            </View>
            <Text style={styles.columnRight}>{skill.description}</Text>
          </View>
        ))}

        {/* furhter skills */}
        <Text style={styles.skillSectionTitle}>{t("furtherSkills.name")}</Text>
        {furtherSkills.map((skill, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.columnLeft}>
              <Text style={styles.skillTitle}>{skill.name}</Text>
            </View>
            <Text style={styles.columnRight}>{skill.description}</Text>
          </View>
        ))}

        {/* work */}
        <Text style={styles.sectionTitle}>{t("work.name")}</Text>
        {work.map((entry, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.columnLeft}>
              <Text style={styles.dateTitle}>{entry.date}</Text>
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.entryTitle}>{entry.employer}</Text>
              <Text>{entry.position}</Text>
            </View>
          </View>
        ))}

        {/* education */}
        <Text style={styles.sectionTitle}>{t("education.name")}</Text>
        {education.map((entry, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.columnLeft}>
              <Text style={styles.dateTitle}>{entry.date}</Text>
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.entryTitle}>{entry.university}</Text>
              <Text>{entry.department}</Text>
            </View>
          </View>
        ))}

        {/* projects */}
        <Text style={styles.sectionTitle}>{t("projects.name")}</Text>
        {projects.map((project, index) => (
          <View key={index}>
            <View style={styles.row}>
              <View style={styles.columnLeft}>
                <Text style={styles.dateTitle}>{project.date}</Text>
              </View>
              <View style={styles.columnRight}>
                <Text style={styles.entryTitle}>{project.title}</Text>
              </View>
            </View>
            {getProjectRow(project.description)}
            {getProjectContributionRow(project.contribution)}
            {getProjectRow(project.techStack)}
            {getProjectRow(project.industry)}
          </View>
        ))}
      </Page>
    </Document>
  );
}
