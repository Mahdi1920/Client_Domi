import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProduitServiceDetailComponent } from './produit-service-detail.component';

describe('Component Tests', () => {
  describe('ProduitService Management Detail Component', () => {
    let comp: ProduitServiceDetailComponent;
    let fixture: ComponentFixture<ProduitServiceDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ProduitServiceDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ produitService: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ProduitServiceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProduitServiceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load produitService on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.produitService).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
