export interface Stat {
  value: string;
  label: string;
}

export interface Feature {
  iconKey: string;
  title: string;
  desc: string;
}

export interface Step {
  no: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  initials: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface NavLink {
  label: string;
  href: string;
}