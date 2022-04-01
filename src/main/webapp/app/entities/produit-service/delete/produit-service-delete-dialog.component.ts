import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProduitService } from '../produit-service.model';
import { ProduitServiceService } from '../service/produit-service.service';

@Component({
  templateUrl: './produit-service-delete-dialog.component.html',
})
export class ProduitServiceDeleteDialogComponent {
  produitService?: IProduitService;

  constructor(protected produitServiceService: ProduitServiceService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.produitServiceService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
