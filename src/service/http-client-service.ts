import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Tb01UserDto} from '../dto/Tb01UserDto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  USER_URL = 'https://moimah-test-api.herokuapp.com/user/';
  GET = 'get/';
  PARAMS = 'params/';
  CITIES = 'cities';


  constructor(private httpClient: HttpClient) { }

  /**
   * Api call to retrieve all dtos
   */
  findAll(): Observable<Tb01UserDto[]>{
    return this.httpClient.get<Tb01UserDto[]>(this.USER_URL + this.GET);
  }

  /**
   * Api call to retrieve all dtos by parameters
   */
  findAllByParams(parameters: HttpParams): Observable<Tb01UserDto[]>{
    const options = {
      params: parameters
    };
    return this.httpClient.get<Tb01UserDto[]>(this.USER_URL + this.GET + this.PARAMS, options);
  }

  /**
   * Api call to create a new dto
   */
  create(tb01UserDto: Tb01UserDto): Observable<Tb01UserDto> {
    return this.httpClient.post<Tb01UserDto>(this.USER_URL, tb01UserDto);
  }

  /**
   * Api call to update a existing dto
   */
  update(tb01UserDto: Tb01UserDto): Observable<Tb01UserDto> {
    return this.httpClient.put<Tb01UserDto>(this.USER_URL + tb01UserDto.tb01UserId, tb01UserDto);
  }

  /**
   * Api call to delete a existin dto
   */
  delete(tb01UserDto: Tb01UserDto): Observable<Tb01UserDto> {
    return this.httpClient.delete<Tb01UserDto>(this.USER_URL + tb01UserDto.tb01UserId);
  }

  /**
   * Api call to retrieve all cities
   */
  findCities(): Observable<string[]>{
    return this.httpClient.get<string[]>(this.USER_URL + this.CITIES);
  }
}
