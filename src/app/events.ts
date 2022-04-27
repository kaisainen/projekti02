export interface Events {
  meta: Meta;
  data: Datum[];
  tags: { [key: string]: string };
}

export interface Datum {
  id:          string;
  name:        NameClass;
  source_type: EType;
  info_url:    null | string;
  modified_at: Date;
  location:    Location;
  description: Description;
  tags:        Tag[];
  event_dates: EventDates;
  distance: number;
}

export interface Description {
  intro:  null | string;
  body:   string;
  images: Image[];
}

export interface Image {
  url:              string;
  copyright_holder: string;
  license_type:     EType;
  media_id:         null;
}

export interface EType {
  id:   number;
  name: NameEnum;
}

export enum NameEnum {
  AllRightsReserved = "All rights reserved.",
  LinkedEvents = "LinkedEvents",
}

export interface EventDates {
  starting_day:           Date | null;
  ending_day:             Date | null;
  additional_description: null;
}

export interface Location {
  lat:     number;
  lon:     number;
  address: Address;
}

export interface Address {
  street_address: null | string;
  postal_code:    null | string;
  locality:       Locality | null;
  neighbourhood:  null;
}

export enum Locality {
  Espoo = "Espoo",
  Helsinki = "Helsinki",
  Kauniainen = "Kauniainen",
  Vantaa = "Vantaa",
}

export interface NameClass {
  fi: string;
  en: null | string;
  sv: null | string;
  zh: null | string;
}

export interface Tag {
  id:   string;
  name: string;
}

export interface Meta {
  count: string;
}
