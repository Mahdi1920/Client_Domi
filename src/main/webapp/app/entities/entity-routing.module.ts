import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'produit-service',
        data: { pageTitle: 'ibansysApp.produitService.home.title' },
        loadChildren: () => import('./produit-service/produit-service.module').then(m => m.ProduitServiceModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
