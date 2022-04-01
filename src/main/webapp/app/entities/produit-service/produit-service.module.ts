import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProduitServiceComponent } from './list/produit-service.component';
import { ProduitServiceDetailComponent } from './detail/produit-service-detail.component';
import { ProduitServiceUpdateComponent } from './update/produit-service-update.component';
import { ProduitServiceDeleteDialogComponent } from './delete/produit-service-delete-dialog.component';
import { ProduitServiceRoutingModule } from './route/produit-service-routing.module';

@NgModule({
  imports: [SharedModule, ProduitServiceRoutingModule],
  declarations: [
    ProduitServiceComponent,
    ProduitServiceDetailComponent,
    ProduitServiceUpdateComponent,
    ProduitServiceDeleteDialogComponent,
  ],
  entryComponents: [ProduitServiceDeleteDialogComponent],
})
export class ProduitServiceModule {}
