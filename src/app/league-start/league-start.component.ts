import { Component, OnInit } from '@angular/core';
import {LeagueService} from "../services/league.service";
import {GlobalvarsService} from "../services/globalvars.service";
import{FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-league-start',
  templateUrl: './league-start.component.html',
  styleUrls: ['./league-start.component.css']
})
export class LeagueStartComponent implements OnInit {

  startLeagueForm;

  constructor(private leagueServ: LeagueService, private _gVarsServ: GlobalvarsService, private formBuilder: FormBuilder) {

    //create Form
    this.startLeagueForm = this.formBuilder.group({
      id:["", [Validators.required, Validators.pattern("^[0-9]*$")]],
      name:["", [Validators.required]]
    });

    //load values into form
    this.startLeagueForm.get("id").setValue(this._gVarsServ.league_id);
    this.startLeagueForm.get("name").setValue(this._gVarsServ.league_active);
   }

  ngOnInit(): void {
  }

  onSubmitStartLeague(formData){
    console.log(formData.value);
    this.leagueServ.start_league(formData).subscribe(
      result=>{
        console.log(result);
      },
      error=>{
        console.log(error);
      }
    );
  }

}
