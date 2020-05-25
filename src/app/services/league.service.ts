import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private httpClient: HttpClient) {
   
  }

  create_league(formData): Observable<any>{
    let response = this.httpClient.post("http://localhost:8080/create_league/", formData);
    return response;
  }

  get_leagues(): Observable<any>{
    let response = this.httpClient.get("http://localhost:8080/get_leagues/");
    return response;
  }


  get_roles(): Observable<any>{
    let response = this.httpClient.get("http://localhost:8080/get_roles/");
    return response;
  }

  get_registered_teams(leaguename, leagueid): Observable<any>{
    let response =  this.httpClient.get("http://localhost:8080/get_registered_teams/"+ leagueid + "/"+ leaguename);
    return response;
  }

  register_team(formData): Observable<any>{
    let response = this.httpClient.post("http://localhost:8080/register_team/", formData.value);
    return response;
  }

  start_league(formData): Observable<any>{
    let response = this.httpClient.post("http://localhost:8080/startLeague/", formData.value);
    return response;
  }

  login(formData): Observable<any>{
    let response = this.httpClient.post("http://localhost:8080/login/", formData.value);
    return response;
  }

  get_parts_of_season(): Observable<any>{
    let response = this.httpClient.get("http://localhost:8080/get_parts_of_season/");
    return response;
  }

  register_result(formData): Observable<any>{
    let response = this.httpClient.post("http://localhost:8080/register_result/", formData);
    return response;
  }

  get_results(leagueid, leaguename): Observable<any>{
    let response =  this.httpClient.get("http://localhost:8080/get_league_results/"+ leagueid + "/"+ leaguename);
    return response;
  }


}
