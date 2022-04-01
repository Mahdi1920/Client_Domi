import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProduitService, ProduitService } from '../produit-service.model';
import { ProduitServiceService } from '../service/produit-service.service';

@Injectable({ providedIn: 'root' })
export class ProduitServiceRoutingResolveService implements Resolve<IProduitService> {
  constructor(protected service: ProduitServiceService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProduitService> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((produitService: HttpResponse<ProduitService>) => {
          if (produitService.body) {
            return of(produitService.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProduitService());
  }
}
