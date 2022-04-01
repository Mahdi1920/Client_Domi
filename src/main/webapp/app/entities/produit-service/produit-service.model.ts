export interface IProduitService {
  CODE_PRODUIT_SERVICE?: number;
  LIBELLE_PRODUIT_SERVICE?:  string ,
  PRODUIT_SERVICE?: string ;
  TYPE_DOSSIER?: string ;
  USER_SCHEMA?: string ;
  PASSWORD_SCHEMA?: string ;
  REPORT_SERVER?: string ;
  GROUP_PRODUIT?: string ;
  LIB_GROUP?: string;
}

export class ProduitService implements IProduitService {
  constructor(public CODE_PRODUIT_SERVICE?: number,
              public LIBELLE_PRODUIT_SERVICE?:  string ,
              public PRODUIT_SERVICE?: string ,
              public TYPE_DOSSIER?: string ,
              public USER_SCHEMA?: string ,
              public PASSWORD_SCHEMA?: string ,
              public REPORT_SERVER?: string ,
              public GROUP_PRODUIT?: string ,
              public LIB_GROUP?: string) {}
}

export function getProduitServiceIdentifier(produitService: IProduitService): number | undefined {
  return produitService.CODE_PRODUIT_SERVICE;
}
