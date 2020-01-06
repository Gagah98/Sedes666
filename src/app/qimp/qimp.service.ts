import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QimpService {
  url = 'https://comem-qimg.herokuapp.com/api'
  apiKey = "ABu7TiDRKhlI2Pi+6MOR3J0NqQ4fqKfEv7Plo8xsWrE5Ur3DG/XtFh0WAO+EJPsEPX32YtpdwCXU0JuXeZfY1rxQe9KDtV/eCHFeMQymlDqbKA3/3WqdQbwE2nxaD6GE2jYQvN+32/ORWVc7OXSd5l1GQEC3Ks/R4jGux8kD/us="
  constructor(private http: HttpClient) {}

  getImages() {
    return this.http.get(`${this.url}`, {headers: {'Authorization': 'Bearer '+this.apiKey}});
  }

  postImages(data) {
    return this.http.post(`${this.url}`,data, {headers: {'Authorization': 'Bearer '+this.apiKey}});
  }
}
