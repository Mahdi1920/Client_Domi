import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProduitService, getProduitServiceIdentifier } from '../produit-service.model';

export type EntityResponseType = HttpResponse<IProduitService>;
export type EntityArrayResponseType = HttpResponse<IProduitService[]>;

@Injectable({ providedIn: 'root' })
export class ProduitServiceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/produit-services');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(produitService: IProduitService): Observable<EntityResponseType> {
    return this.http.post<IProduitService>(this.resourceUrl, produitService, { observe: 'response' });
  }

  update(produitService: IProduitService): Observable<EntityResponseType> {
    return this.http.put<IProduitService>(`${this.resourceUrl}/${getProduitServiceIdentifier(produitService) as number}`, produitService, {
      observe: 'response',
    });
  }

  partialUpdate(produitService: IProduitService): Observable<EntityResponseType> {
    return this.http.patch<IProduitService>(
      `${this.resourceUrl}/${getProduitServiceIdentifier(produitService) as number}`,
      produitService,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProduitService>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduitService[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProduitServiceToCollectionIfMissing(
    produitServiceCollection: IProduitService[],
    ...produitServicesToCheck: (IProduitService | null | undefined)[]
  ): IProduitService[] {
    const produitServices: IProduitService[] = produitServicesToCheck.filter(isPresent);
    if (produitServices.length > 0) {
      const produitServiceCollectionIdentifiers = produitServiceCollection.map(
        produitServiceItem => getProduitServiceIdentifier(produitServiceItem)!
      );
      const produitServicesToAdd = produitServices.filter(produitServiceItem => {
        const produitServiceIdentifier = getProduitServiceIdentifier(produitServiceItem);
        if (produitServiceIdentifier == null || produitServiceCollectionIdentifiers.includes(produitServiceIdentifier)) {
          return false;
        }
        produitServiceCollectionIdentifiers.push(produitServiceIdentifier);
        return true;
      });
      return [...produitServicesToAdd, ...produitServiceCollection];
    }
    return produitServiceCollection;
  }
}
