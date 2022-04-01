export interface IProduitService {
  id?: number;
}

export class ProduitService implements IProduitService {
  constructor(public id?: number) {}
}

export function getProduitServiceIdentifier(produitService: IProduitService): number | undefined {
  return produitService.id;
}
