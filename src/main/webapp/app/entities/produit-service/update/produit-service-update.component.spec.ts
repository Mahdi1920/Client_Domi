jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ProduitServiceService } from '../service/produit-service.service';
import { IProduitService, ProduitService } from '../produit-service.model';

import { ProduitServiceUpdateComponent } from './produit-service-update.component';

describe('Component Tests', () => {
  describe('ProduitService Management Update Component', () => {
    let comp: ProduitServiceUpdateComponent;
    let fixture: ComponentFixture<ProduitServiceUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let produitServiceService: ProduitServiceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProduitServiceUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ProduitServiceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProduitServiceUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      produitServiceService = TestBed.inject(ProduitServiceService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const produitService: IProduitService = { id: 456 };

        activatedRoute.data = of({ produitService });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(produitService));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ProduitService>>();
        const produitService = { id: 123 };
        jest.spyOn(produitServiceService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ produitService });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: produitService }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(produitServiceService.update).toHaveBeenCalledWith(produitService);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ProduitService>>();
        const produitService = new ProduitService();
        jest.spyOn(produitServiceService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ produitService });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: produitService }));
        saveSubject.complete();

        // THEN
        expect(produitServiceService.create).toHaveBeenCalledWith(produitService);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ProduitService>>();
        const produitService = { id: 123 };
        jest.spyOn(produitServiceService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ produitService });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(produitServiceService.update).toHaveBeenCalledWith(produitService);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
