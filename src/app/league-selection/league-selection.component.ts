import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

import {LeagueService} from "../services/league.service";
import {GlobalvarsService} from "../services/globalvars.service";

@Component({
  selector: 'app-league-selection',
  templateUrl: './league-selection.component.html',
  styleUrls: ['./league-selection.component.css']
})
export class LeagueSelectionComponent implements OnInit {

  selectLeagueForm;
  createLeagueForm;

  leagues: any;
  

  constructor(private formBuilder: FormBuilder, private selectLeagueServ: LeagueService, private _gVarServ: GlobalvarsService) {

    //get leagues
    this.get_leagues();

    //generate forms
    this.selectLeagueForm = this.formBuilder.group({
      //id:["", [Validators.required, Validators.pattern("^[0-9]*$")]], //is requerid and must be number
      name:["",[Validators.required]]
    })

    this.createLeagueForm =  this.formBuilder.group({
      name:"", //name of form field
    });
  }
   
  ngOnInit(): void {
  }

  get_leagues(f_callback = null): any{
    console.log("Se ha lanzado la función get_leagues");
    this.selectLeagueServ.get_leagues().subscribe(
      result=>{
        this.leagues = result;
        if(f_callback != null){
          f_callback();
        }
      },
      error=>{console.log(error)}
    );
  }

  onSubmitCreateLeague(formData){
    this.selectLeagueServ.create_league(formData).subscribe(
      result=>{
        console.log(result);
        if(result.hasOwnProperty("name") && result.hasOwnProperty("id")){     
          this.get_leagues(this.loadLeague(result.name, result.id)); //would be better not to request leagues to server again.
        }
      },
      error=>{
        console.log(error);
      }
    );
  }

  onSubmitSelLeague(formData){
    if(formData !=""){
      let id = this.getIdOfLeague(formData.name);
      this.loadLeague(formData.name, id);
    }
  }

  getIdOfLeague(leaguename): Number{
    let id = 0;
    console.log(this.leagues)
    for(let i=0; i<this.leagues.length; i++){
      //console.log(this.leagues[i].id);
      if(this.leagues[i].name == leaguename){
        id=this.leagues[i].id;
        break;
      }
    }
    console.log(id);
    return id;
  }

  loadLeague(leaguename: String, leagueid: Number){
    console.log("Se ha lanzado la función loadLeague y parametro: " + leaguename)
    this._gVarServ.league_active=leaguename;
    this._gVarServ.league_id = leagueid;
  }
}
