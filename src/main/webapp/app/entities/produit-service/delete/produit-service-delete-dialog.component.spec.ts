jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProduitServiceService } from '../service/produit-service.service';

import { ProduitServiceDeleteDialogComponent } from './produit-service-delete-dialog.component';

describe('Component Tests', () => {
  describe('ProduitService Management Delete Component', () => {
    let comp: ProduitServiceDeleteDialogComponent;
    let fixture: ComponentFixture<ProduitServiceDeleteDialogComponent>;
    let service: ProduitServiceService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ProduitServiceDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(ProduitServiceDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProduitServiceDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ProduitServiceService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({})));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        jest.spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.close).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});
