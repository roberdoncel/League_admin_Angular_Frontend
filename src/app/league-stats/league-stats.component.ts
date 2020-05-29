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
  leagueStanding: any[]=[];
  leagueActive: String;

  constructor(private _gVarsServ: GlobalvarsService, private leagueServ: LeagueService) {
    this.leagueActive = _gVarsServ.league_active;

    //get results
    if(this._gVarsServ.league_results != null){
      this.results = this._gVarsServ.league_results;
      this.stats = new Stats(this.results);
      this.leagueStanding =this.stats.generateLeagueStanding();
    }else{
      this.loadResults();
    }
   }

  ngOnInit(): void {
  }

  loadResults(){
    this.leagueServ.get_results(this._gVarsServ.league_id, this._gVarsServ.league_active).subscribe(
      result=>{
        this.results = result;
        this.stats = new Stats(this.results);
        this.leagueStanding = this.stats.generateLeagueStanding();
      },
      error=>{
        console.log(error);
      }
    );
  }

}
