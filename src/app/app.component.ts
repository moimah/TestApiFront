import {Component, OnInit} from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {HttpClientService} from '../service/http-client-service';
import {Tb01UserDto} from '../dto/Tb01UserDto';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TestApiFront';
  users: Tb01UserDto[] = [];
  cities: string[] = [];
  tb01UserDto: Tb01UserDto = new Tb01UserDto();
  searchName = '';
  searchCity = '';
  searchActive = true;
  searchInactive = true;
  searchSortByCreation = '';
  httpRequest = '';
  page = 1;
  pageSize = 10;
  loadingUsers = false;
  loadingCities = false;


  constructor(public httpClientService: HttpClientService) {
  }

  /**
   * Initializing dtos list
   */
  ngOnInit(): void {
    this.findAll();
  }

  /**
   *  httpClientService to retrieve all dtos
   */
  findAll(): void{
    this.loadingUsers = true;
    this.httpClientService.findAll().subscribe(
      (data) => {
        this.users = data;
        this.loadingUsers = false;
      }, error => {
        alert('Database busy status: ' + error.status);
        this.loadingUsers = false;
      }
    );
  }

  /**
   * HttpClientService request to retrieve all dtos
   * using precreated params
   */
  findAllByParams(): void{
    this.loadingUsers = true;
    this.users = [];
    this.httpClientService.findAllByParams(this.createParams()).subscribe(
      (data) => {
        this.users = data;
        this.loadingUsers = false;
      }, error => {
          alert('Database busy status: ' + error.status);
          this.loadingUsers = false;
        }
    );
  }

  /**
   * HttpClientService request to create new  dto
   */
  create(): void {
    this.loadingUsers = true;
    this.tb01UserDto.tb01CreatedOn = new Date();
    this.httpClientService.create(this.tb01UserDto).subscribe((data) => {
        alert('User created successfully.');
        this.tb01UserDto = new Tb01UserDto();
        this.loadingUsers = false;
        this.findAll();
      },  error => {
          alert('Database busy status: ' + error.status);
          this.loadingUsers = false;
        }
    );
  }

  /**
   * HttpClient service request to update existing dto
   */
  update(): void {
    this.loadingUsers = true;
    this.httpClientService.update(this.tb01UserDto).subscribe((data) => {
      alert('User updated successfully.');
      this.loadingUsers = false;
      this.findAll();
    },  error => {
        alert('Database busy status: ' + error.status);
        this.loadingUsers = false;
      }
    );
  }

  /**
   * HttpClientService request to delete existing dto
   */
  delete(): void {
    this.loadingUsers = true;
    this.httpClientService.delete(this.tb01UserDto).subscribe((data) => {
      alert('User deleted successfully.');
      this.loadingUsers = false;
      this.findAll();
    },  error => {
        alert('Database busy status: ' + error.status);
        this.loadingUsers = false;
      }
    );
  }

  /**
   * HttpClientService request to get all cities
   */
  findCities(): void{
    this.loadingCities = true;
    this.cities = [];
    this.httpClientService.findCities().subscribe(
      (data) => {
        this.cities = data;
        this.loadingCities = false;
      },  error => {
          alert('Database busy status: ' + error.status);
          this.loadingCities = false;
        }
    );
  }


  /**
   * Create new user and set httpRequest key to post
   */
  createNewUserForm(): void{
    this.httpRequest = 'POST';
    this.tb01UserDto = new Tb01UserDto();
  }

  /**
   * Bind existing user and set httpRequest key to put
   */
  createUpdateUserForm(dto: Tb01UserDto): void{
    this.httpRequest = 'PUT';
    this.tb01UserDto = dto;
  }

  /**
   * Bind existing user and set httpRequest key to delete,
   * before ask user to confirm delete
   * @param dto
   */
  createDelete(dto: Tb01UserDto): void{
    this.httpRequest = 'DELETE';
    this.tb01UserDto = dto;

    const conf = confirm('Are you sure you want to Remove?');
    if (conf === true) {
      this.generateHttpRequest();
    }

  }


  /**
   * Call to httpFunctionds depending status
   * httpRequest variable
   */
  generateHttpRequest(): void{
    const request = this.httpRequest;
    switch (request){
      case'POST': {
        this.create();
        break;
      }
      case'PUT': {
        this.update();
        break;
      }
      case'DELETE': {
        this.delete();
        break;
      }

    }
  }


  /**
   * Create customs params to filtering
   */
  createParams(): HttpParams{
     const params = new HttpParams()
      .append('tb01City', this.searchCity + '')
      .append('tb01Name', this.searchName + '')
      .append('tb01Active', this.searchActive + '')
      .append('tb01InActive', this.searchInactive + '')
      .append('sort', this.searchSortByCreation + '');
     return params;

  }



}
