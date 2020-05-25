import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalvarsService {
   league_active: String;
   league_id: Number;
   token: String = "";
   league_results: any[];
  constructor() { }


}
