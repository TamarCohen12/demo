
export interface TaktzivItem {
  code: number;
  teur: string;
  taktzivKavua: boolean;
}

export interface UserInfoResponse {
  taktzivimLemosad: TaktzivItem[];
  maanimWithKriteryonim: number[];
}
