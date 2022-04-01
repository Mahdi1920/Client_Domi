import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IProduitService, ProduitService } from '../produit-service.model';

import { ProduitServiceService } from './produit-service.service';

describe('Service Tests', () => {
  describe('ProduitService Service', () => {
    let service: ProduitServiceService;
    let httpMock: HttpTestingController;
    let elemDefault: IProduitService;
    let expectedResult: IProduitService | IProduitService[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(ProduitServiceService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ProduitService', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ProduitService()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ProduitService', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a ProduitService', () => {
        const patchObject = Object.assign({}, new ProduitService());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ProduitService', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ProduitService', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addProduitServiceToCollectionIfMissing', () => {
        it('should add a ProduitService to an empty array', () => {
          const produitService: IProduitService = { id: 123 };
          expectedResult = service.addProduitServiceToCollectionIfMissing([], produitService);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(produitService);
        });

        it('should not add a ProduitService to an array that contains it', () => {
          const produitService: IProduitService = { id: 123 };
          const produitServiceCollection: IProduitService[] = [
            {
              ...produitService,
            },
            { id: 456 },
          ];
          expectedResult = service.addProduitServiceToCollectionIfMissing(produitServiceCollection, produitService);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a ProduitService to an array that doesn't contain it", () => {
          const produitService: IProduitService = { id: 123 };
          const produitServiceCollection: IProduitService[] = [{ id: 456 }];
          expectedResult = service.addProduitServiceToCollectionIfMissing(produitServiceCollection, produitService);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(produitService);
        });

        it('should add only unique ProduitService to an array', () => {
          const produitServiceArray: IProduitService[] = [{ id: 123 }, { id: 456 }, { id: 96467 }];
          const produitServiceCollection: IProduitService[] = [{ id: 123 }];
          expectedResult = service.addProduitServiceToCollectionIfMissing(produitServiceCollection, ...produitServiceArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const produitService: IProduitService = { id: 123 };
          const produitService2: IProduitService = { id: 456 };
          expectedResult = service.addProduitServiceToCollectionIfMissing([], produitService, produitService2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(produitService);
          expect(expectedResult).toContain(produitService2);
        });

        it('should accept null and undefined values', () => {
          const produitService: IProduitService = { id: 123 };
          expectedResult = service.addProduitServiceToCollectionIfMissing([], null, produitService, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(produitService);
        });

        it('should return initial array if no ProduitService is added', () => {
          const produitServiceCollection: IProduitService[] = [{ id: 123 }];
          expectedResult = service.addProduitServiceToCollectionIfMissing(produitServiceCollection, undefined, null);
          expect(expectedResult).toEqual(produitServiceCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
