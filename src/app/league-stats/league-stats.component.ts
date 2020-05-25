import { Component, OnInit } from '@angular/core';
import {GlobalvarsService} from "../services/globalvars.service";
import {LeagueService} from "../services/league.service";
import {Stats} from "../classes/stats";

@Component({
  selector: 'app-league-stats',
  templateUrl: './league-stats.component.html',
  styleUrls: ['./league-stats.component.css']
})
export class LeagueStatsComponent implements OnInit {
  results: any[];
  stats: Stats;

  constructor(private _gVarsServ: GlobalvarsService, private leagueServ: LeagueService) {
    this.stats = new Stats();
    
    //get results
    if(this._gVarsServ.league_results != null){
      this.results = this._gVarsServ.league_results;
    }else{
      this.loadResults();
    }
   }

  ngOnInit(): void {
  }

  loadResults(){
    this.leagueServ.get_results(this._gVarsServ.league_id, this._gVarsServ.league_active).subscribe(
      result=>{
        //console.log(result);
        this.results = result;
      },
      error=>{
        console.log(error);
      }
    );
  }

}
