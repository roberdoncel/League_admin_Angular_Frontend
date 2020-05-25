import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LeagueSelectionComponent } from './league-selection/league-selection.component';
import { TeamRegistrationComponent } from './team-registration/team-registration.component';
import { LeagueStartComponent } from './league-start/league-start.component';
import { LeagueResultsComponent } from './league-results/league-results.component';
import { LeagueStatsComponent } from './league-stats/league-stats.component';
import { LeagueFinishComponent } from './league-finish/league-finish.component';

import {Routes, RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

import {HttpClientModule} from "@angular/common/http";

import {LeagueService} from "./services/league.service";
import {GlobalvarsService} from "./services/globalvars.service";
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: "select_league", component: LeagueSelectionComponent},
  {path: "team_registration", component: TeamRegistrationComponent},
  {path: "start_league", component: LeagueStartComponent},
  {path: "league_results", component: LeagueResultsComponent},
  {path: "league_stats", component: LeagueStatsComponent},
  {path: "finish_league", component: LeagueFinishComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LeagueSelectionComponent,
    TeamRegistrationComponent,
    LeagueStartComponent,
    LeagueResultsComponent,
    LeagueStatsComponent,
    LeagueFinishComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[RouterModule],
  providers: [LeagueService, GlobalvarsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
