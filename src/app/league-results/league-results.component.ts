import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

import {LeagueService} from "../services/league.service";
import {GlobalvarsService} from "../services/globalvars.service";


@Component({
  selector: 'app-league-results',
  templateUrl: './league-results.component.html',
  styleUrls: ['./league-results.component.css']
})
export class LeagueResultsComponent implements OnInit {

  registerResultForm;
  partsOfSeason: any[];
  teams: any[];
  results: any[];

  leagueActive: String;

  constructor(private formBuilder: FormBuilder, private leagueServ: LeagueService, private _globalServ: GlobalvarsService) {
    this.leagueActive= this._globalServ.league_active;

    this.registerResultForm = this.formBuilder.group({
      leagueId:["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      leagueName:["", Validators.required],
      team1:["", Validators.required],
      team2:["", Validators.required],
      team1Goals:[0, [Validators.required, Validators.pattern("^[0-9]*$")]],
      team2Goals:[0, [Validators.required, Validators.pattern("^[0-9]*$")]],
      partOfSeason:["", Validators.required]
    });  

    //load league data into form
    this.registerResultForm.get("leagueId").setValue(this._globalServ.league_id);
    this.registerResultForm.get("leagueName").setValue(this._globalServ.league_active);
    
    this.leagueServ.get_registered_teams(this._globalServ.league_active,this._globalServ.league_id).subscribe(
      result=>{
        this.teams = result;
      },
      error=>{
        console.log(error);
      }
    );

    this.leagueServ.get_parts_of_season().subscribe(
      result=>{
        this.partsOfSeason = result;
      },
      error=>{
        console.log(error);
      }
    );

    this.leagueServ.get_results(this._globalServ.league_id, this._globalServ.league_active).subscribe(
      result=>{
        this.results = result;
        this._globalServ.league_results = result;
        //console.log(this.results);
      },
      error=>{
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }

  onSubmitRegisterResult(formData){
    //check if local team is same as visitor
    if(formData.team1 == formData.team2){
      console.log("No puede ser el mismo equipo");
      return;
    }
    this.leagueServ.register_result(formData).subscribe(
      result=>{
        console.log(result);
        this.results.push(result);
        this._globalServ.league_results.push(result);
      },
      error=>{
        console.log(error);
      }
    );
  }

}
