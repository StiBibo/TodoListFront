import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RestClientService {

  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  
  execute(endPoint: any, data: any): Observable<any> {
    // console.log(`data : ${JSON.stringify(data)}`)
    return this.http.post(this.baseUrl + endPoint, data)
  }

  executeGet(endPoint: any, data?: any): Observable<any> {
    return this.http.get(this.baseUrl + '/' + endPoint, data)
  }

  executeUpdate(endPoint: any, data: any): Observable<any> {
    return this.http.put(this.baseUrl + '/' + endPoint , data)
  }

  executeDelete(endPoint: any, data?: any): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + endPoint, data)
  }

}
