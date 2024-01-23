export type Details = {
  name: string;
  detail: string;
};

export type Skills = {
  name: string;
  description: string;
};

export type Work = {
  date: string;
  employer: string;
  position: string;
};

export type Education = {
  date: string;
  university: string;
  department: string;
};

type ProjectDetail = {
  name: string;
  detail: string;
};

export type Project = {
  date: string;
  title: string;
  description: ProjectDetail;
  contribution: ProjectDetail;
  techStack: ProjectDetail;
  industry: ProjectDetail;
};
