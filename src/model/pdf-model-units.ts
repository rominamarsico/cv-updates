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
  topics: string;
};

export interface NameAndGenericDetail<T> {
  name: string;
  detail: T;
}

export type Project = {
  date: string;
  title: string;
  description: NameAndGenericDetail<string>;
  contribution: NameAndGenericDetail<string[]>;
  techStack: NameAndGenericDetail<string>;
  industry: NameAndGenericDetail<string>;
};
