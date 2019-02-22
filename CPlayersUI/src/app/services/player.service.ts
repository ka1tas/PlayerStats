import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  Url= "http://localhost:8085/api/v1/playerservice/player/";

  constructor(private http: HttpClient) { }

  searchPlayer(name): Observable<any> {
    let searchNews = "http://cricapi.com/api/playerFinder?name=" + name + "&apikey=8g45R7uTYsQDr1GeuiWYYYPUB402";
    return this.http.get<any>(searchNews);
  }

  showStatus(playerId): Observable<any> {
    let searchNews = "http://cricapi.com/api/playerStats?pid=" + playerId + "&apikey=8g45R7uTYsQDr1GeuiWYYYPUB402";
    return this.http.get<any>(searchNews);
  }

  addFav(json): Observable<any> {
    return this.http.post<any>(this.Url, json, httpOptions);
  }

  deleteFav(id): Observable<any> {
    return this.http.delete<any>(this.Url+id);
  }

  showFav(): Observable<any> {
    return this.http.get<any>(this.Url);
  }

}
