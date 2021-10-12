import { TestBed } from '@angular/core/testing';
import { PhotoBoardService } from './photo-board.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

const mockeData = {
  api:'http://localhost:3000/photos',
  data: [
    {
      id: 1,
      description:'example 1',
      src:''
    },
    {
      id: 2,
      description:'example 2',
      src:''
    }
  ]
}

describe(PhotoBoardService.name,  () => {

  let service: PhotoBoardService;
  let httpCotnroller: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[PhotoBoardService]
    })

    service = TestBed.inject(PhotoBoardService);
    httpCotnroller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpCotnroller.verify();
  })


  it(`#${PhotoBoardService.prototype.getPhotos.name} should return photos with description in uppercase`, done => {
    service.getPhotos().subscribe(photos => {
      expect(photos[0].description).toBe('EXAMPLE 1');

      expect(photos[1].description).toBe('EXAMPLE 2');

      done();
    });

    httpCotnroller
      .expectOne(mockeData.api)
      .flush(mockeData.data);
  });

})
