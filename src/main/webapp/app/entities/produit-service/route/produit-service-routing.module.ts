import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ProduitServiceComponent } from '../list/produit-service.component';
import { ProduitServiceDetailComponent } from '../detail/produit-service-detail.component';
import { ProduitServiceUpdateComponent } from '../update/produit-service-update.component';
import { ProduitServiceRoutingResolveService } from './produit-service-routing-resolve.service';

const produitServiceRoute: Routes = [
  {
    path: '',
    component: ProduitServiceComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProduitServiceDetailComponent,
    resolve: {
      produitService: ProduitServiceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProduitServiceUpdateComponent,
    resolve: {
      produitService: ProduitServiceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProduitServiceUpdateComponent,
    resolve: {
      produitService: ProduitServiceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(produitServiceRoute)],
  exports: [RouterModule],
})
export class ProduitServiceRoutingModule {}
