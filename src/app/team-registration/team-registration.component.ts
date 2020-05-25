import { Component, OnInit } from '@angular/core';
import {GlobalvarsService} from "../services/globalvars.service";
import{FormBuilder, Validators} from "@angular/forms";
import { LeagueService } from '../services/league.service';


@Component({
  selector: 'app-team-registration',
  templateUrl: './team-registration.component.html',
  styleUrls: ['./team-registration.component.css']
})
export class TeamRegistrationComponent implements OnInit {
  leagueActiveName;
  leagueActiveId;
  roles: any;
  registerTeamForm;
  registeredTeams: any[];

  constructor(private _gVarsServ: GlobalvarsService, private formBuilder: FormBuilder, private leagueServ: LeagueService ) {
    this.leagueActiveName = this._gVarsServ.league_active;
    this.leagueActiveId = this._gVarsServ.league_id;

    this.registerTeamForm = this.formBuilder.group({
      id:["",[Validators.required, Validators.pattern("^[0-9]*$")]],
      leaguename:["", [Validators.required]],
      username:["",[Validators.required]],
      team:["", [Validators.required]],
      password:[""], 
      role:["", [Validators.required]]
    });

    //load values into form
    this.registerTeamForm.get("id").setValue(this._gVarsServ.league_id);
    this.registerTeamForm.get("leaguename").setValue(this._gVarsServ.league_active);

    this.leagueServ.get_roles().subscribe(
      result=>{
        if(result != null){
          this.roles = result;
        }
      },
      error=>{console.log(error)}
    );
   }

  ngOnInit(): void {
    if(this.leagueActiveId != null && this.leagueActiveName != null){    
      this.loadRegisteredTeams();
    }
  }

  loadRegisteredTeams(){
    this.leagueServ.get_registered_teams(this.leagueActiveName, this.leagueActiveId).subscribe(
      result=>{
       this.registeredTeams = result;
       //console.log(this.registeredTeams);
      },
      error=>{
        console.log(error);
      }
    );
  }
  onSubmitRegisterTeam(formData){
    console.log(formData);
    this.leagueServ.register_team(formData).subscribe(
      result=>{
        //add to table
        this.registeredTeams.push(result);
      },
      error=>{
        console.log(error)
      }
    );
  }

}
