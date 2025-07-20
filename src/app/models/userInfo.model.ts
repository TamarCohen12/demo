
export interface TaktzivItem {
  SUG_MAKOR_TAKTIV: number;
  TEUR_SUG_MAKOR_TAKTZIV: string;
  taktzivKavua: boolean;
}

export interface UserInfoResponse {
  taktzivimLemosad: TaktzivItem[];
  maanimWithKriteryonim: number[];
}
