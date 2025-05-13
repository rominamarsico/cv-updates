import { Image, Document, Page, Text, View } from "@react-pdf/renderer";
import { styles } from "./pdf-styles";
import { PdfModel } from "../model/pdf-model.ts";

type PdfDocumentProps = {
  data?: PdfModel;
  profileImg?: File;
  position?: string;
  availabilityDate?: string;
  availabilityHours?: string;
};

// Create Document Component
export function PdfPreview({
  data,
  profileImg,
  position,
  availabilityDate,
  availabilityHours,
}: PdfDocumentProps) {
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
        {/** page number **/}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber }) =>
            data?.pageFooter?.replace("{pageNumber}", `${pageNumber}`)
          }
          fixed
        />

        {/** profile **/}
        <View style={styles.row}>
          {profileImg ? (
            <View style={styles.columnLeft}>
              <Image src={profileImg} />
            </View>
          ) : null}

          <View style={styles.columnRight}>
            <Text style={styles.pageTitle}>{data?.name}</Text>

            <Text style={styles.position}>{position ?? data?.position[0]}</Text>

            <View style={styles.certificateWrapper}>
              {data?.certificate?.map((entry, index) => (
                <View key={index}>
                  <Text style={styles.certificateTitle}>{entry.name}</Text>
                  <Text style={styles.certificateDetail}>{entry.detail}</Text>
                </View>
              ))}
            </View>

            {data?.details?.map((entry, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.columnLeft}>{entry.name}</Text>
                {typeof entry.detail === "string" ? (
                  <Text style={styles.columnRight}>{entry.detail}</Text>
                ) : (
                  <Text style={styles.columnRight}>
                    {entry.detail.map((detailRow, index) => (
                      <Text key={index}>{detailRow}</Text>
                    ))}
                  </Text>
                )}
              </View>
            ))}

            <View style={styles.row}>
              <Text style={styles.columnLeft}>{data?.availability?.name}</Text>
              <Text style={styles.columnRight}>
                <Text>
                  {data?.availability?.date?.replace(
                    "{date}",
                    `${availabilityDate}`,
                  )}
                  {data?.availability?.hours?.replace(
                    "{hours}",
                    `${availabilityHours}`,
                  )}
                </Text>
              </Text>
            </View>
          </View>
        </View>

        {/** skills **/}
        <Text style={styles.skillSectionTitle}>{data?.skills?.name}</Text>
        {data?.skills?.details.map((skill, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.columnLeft}>
              <Text style={styles.skillTitle}>{skill.name}</Text>
            </View>
            <Text style={styles.columnRight}>{skill.description}</Text>
          </View>
        ))}

        {/** further skills **/}
        <Text style={styles.skillSectionTitle}>
          {data?.furtherSkills?.name}
        </Text>
        {data?.furtherSkills?.details.map((skill, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.columnLeft}>
              <Text style={styles.skillTitle}>{skill.name}</Text>
            </View>
            <Text style={styles.columnRight}>{skill.description}</Text>
          </View>
        ))}

        {/** work **/}
        <Text style={styles.sectionTitle}>{data?.work?.name}</Text>
        {data?.work?.details.map((entry, index) => (
          <View wrap={false} key={index} style={styles.row}>
            <View style={styles.columnLeft}>
              <Text style={styles.dateTitle}>{entry.date}</Text>
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.entryTitle}>{entry.employer}</Text>
              <Text>{entry.position}</Text>
            </View>
          </View>
        ))}

        {/** education **/}
        <Text style={styles.sectionTitle}>{data?.education?.name}</Text>
        {data?.education?.details.map((entry, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.columnLeft}>
              <Text style={styles.dateTitle}>{entry.date}</Text>
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.entryTitle}>{entry.university}</Text>
              <Text>{entry.department}</Text>
              <Text>{entry.topics}</Text>
            </View>
          </View>
        ))}

        {/** projects **/}
        <Text style={styles.sectionTitle}>{data?.projects?.name}</Text>
        {data?.projects?.details.map((project, index) => (
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
            {project.industry && getProjectRow(project.industry)}
          </View>
        ))}
      </Page>
    </Document>
  );
}
