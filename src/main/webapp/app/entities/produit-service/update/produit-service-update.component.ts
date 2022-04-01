import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IProduitService, ProduitService } from '../produit-service.model';
import { ProduitServiceService } from '../service/produit-service.service';

@Component({
  selector: 'jhi-produit-service-update',
  templateUrl: './produit-service-update.component.html',
})
export class ProduitServiceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(
    protected produitServiceService: ProduitServiceService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produitService }) => {
      this.updateForm(produitService);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const produitService = this.createFromForm();
    if (produitService.id !== undefined) {
      this.subscribeToSaveResponse(this.produitServiceService.update(produitService));
    } else {
      this.subscribeToSaveResponse(this.produitServiceService.create(produitService));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduitService>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(produitService: IProduitService): void {
    this.editForm.patchValue({
      id: produitService.id,
    });
  }

  protected createFromForm(): IProduitService {
    return {
      ...new ProduitService(),
      id: this.editForm.get(['id'])!.value,
    };
  }
}
