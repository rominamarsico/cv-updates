import {
  Details,
  Education,
  Project,
  Skills,
  Work,
} from "./pdf-model-units.ts";

interface NameAndGenericDetails<T> {
  name: string;
  details: T;
}

export type PdfModel = {
  fileName: string;
  pageFooter: string;
  name: string;
  position: string[];
  certificate: Details[];
  details: Details[];
  availability: Details;
  skills: NameAndGenericDetails<Skills[]>;
  furtherSkills: NameAndGenericDetails<Skills[]>;
  work: NameAndGenericDetails<Work[]>;
  education: NameAndGenericDetails<Education[]>;
  projects: NameAndGenericDetails<Project[]>;
};
