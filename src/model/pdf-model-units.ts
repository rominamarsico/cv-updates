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

interface NameAndGenericDetails<T> {
  name: string;
  detail: T;
}

export type Project = {
  date: string;
  title: string;
  description: NameAndGenericDetails<string>;
  contribution: NameAndGenericDetails<string[]>;
  techStack: NameAndGenericDetails<string>;
  industry: NameAndGenericDetails<string>;
};
