import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduitService } from '../produit-service.model';

@Component({
  selector: 'jhi-produit-service-detail',
  templateUrl: './produit-service-detail.component.html',
})
export class ProduitServiceDetailComponent implements OnInit {
  produitService: IProduitService | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produitService }) => {
      this.produitService = produitService;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
