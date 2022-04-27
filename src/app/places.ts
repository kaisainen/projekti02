export interface Places {
  meta: Meta;
  data: Datum[];
  tags: { [key: string]: string };
}

export interface Datum {
  id: string;
  name: NameClass;
  source_type: EType;
  info_url: string;
  modified_at: Date;
  location: Location;
  description: Description;
  tags: Tag[];
  extra_searchwords: string[];
  opening_hours_url: string;
  distance: number;
}

export interface Description {
  intro: string;
  body: string;
  images: Image[];
}

export interface Image {
  url: string;
  copyright_holder: string;
  license_type: EType;
  media_id: string;
}

export interface EType {
  id: number;
  name: NameEnum;
}

export enum NameEnum {
  Copyright1 = 'Copyright 1',
  Copyright2 = 'Copyright 2',
  Matko = 'Matko',
}

export interface Location {
  lat: number;
  lon: number;
  address: Address;
}

export interface Address {
  street_address: string;
  postal_code: string;
  locality: Locality;
  neighbourhood: string;
}

export enum Locality {
  Empty = '',
  Espoo = 'Espoo',
  Harviala = 'Harviala,',
  Helsingfors = 'Helsingfors',
  Helsingin = 'Helsingin',
  Helsinki = 'Helsinki',
  Hyvinkää = 'Hyvinkää',
  Hämeenlinna = 'Hämeenlinna',
  Inkoo = 'Inkoo',
  Järvenpää = 'Järvenpää',
  Kirkkonummi = 'Kirkkonummi',
  Lapinjärvi = 'Lapinjärvi',
  LocalityHELSINKI = 'HELSINKI',
  LocalityVantaa = 'vantaa',
  Luoma = 'Luoma,',
  Masala = 'Masala',
  Ojakkala = 'Ojakkala',
  Otalampi = 'Otalampi',
  Palojoki = 'Palojoki',
  Porvoo = 'Porvoo',
  Sipoo = 'Sipoo',
  Söderkulla = 'Söderkulla',
  Talma = 'Talma',
  Tervalampi = 'Tervalampi',
  Tuusula = 'Tuusula',
  Vanda = 'Vanda',
  Vantaa = 'Vantaa',
}

export interface NameClass {
  fi: string;
  en: null | string;
  sv: null | string;
  zh: null;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Meta {
  count: string;
}
