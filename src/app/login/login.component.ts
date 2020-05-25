import { Component, OnInit } from '@angular/core';
import{FormBuilder, Validators} from "@angular/forms";
import {LeagueService} from "../services/league.service";
import {GlobalvarsService} from "../services/globalvars.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm;

  constructor(private formBuilder: FormBuilder, private leagueServ: LeagueService, private _gVarsServ: GlobalvarsService ) {
    this.loginForm =  this.formBuilder.group({
      username:["", Validators.required],
      password:["", Validators.required]
    });  
  }

  ngOnInit(): void {
  }

  onSubmitLogin(formData){
    this.leagueServ.login(formData).subscribe(
      result=>{
        console.log(result);
      },
      error=>{
        console.log(error);
      }
    );
  }
}
