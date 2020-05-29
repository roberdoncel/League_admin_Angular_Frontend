import {TeamStats} from "../classes/team-stats";

export class Stats {
    private results: any[];
    private lStanding: any[] = [];//array with teams and goals ordered by points. Initilized to avoid .length error
    

    constructor(results){
        this.results= results;
    }

    generateLeagueStanding(){        
        
        this.results.forEach(elem => {
            let teamStatLocal = new TeamStats(elem.tul1.team);
            let teamStatVisitor = new TeamStats(elem.tul2.team);

            //check winner
            if(elem.goalsTeam1 > elem.goalsTeam2){
                teamStatLocal.points = 3;
                teamStatLocal.wonMatches = 1;
                teamStatVisitor.lostMatches = 1;
            }else if(elem.goalsTeam1 == elem.goalsTeam2){
                teamStatLocal.points = 1;
                teamStatVisitor.points = 1;
                teamStatLocal.drawMatches = 1;
                teamStatVisitor.drawMatches = 1;
            }else{
                teamStatVisitor.points = 3;
                teamStatVisitor.wonMatches = 1;
                teamStatLocal.lostMatches = 1;
            }

            //update teamStat fields
            teamStatLocal.goalsFor = elem.goalsTeam1;
            teamStatLocal.goalsAgainst = elem.goalsTeam2;
            teamStatVisitor.goalsFor = elem.goalsTeam2;
            teamStatVisitor.goalsAgainst =  elem.goalsTeam1;            
            teamStatLocal.playedMatches = 1;
            teamStatVisitor.playedMatches = 1;

            //update league standing
            this.updateLeagueStanding(teamStatLocal);
            this.updateLeagueStanding(teamStatVisitor);
        }); 
        this.lStanding.sort(this.sortLeagueStanding);
        return this.lStanding;  
    }

    updateLeagueStanding(teamStat: TeamStats){
        //check if team is in lStanding Array
        let index = this.findElemInArray(teamStat.name);

        if(index == -1){
            this.lStanding.push(teamStat);       
        }else{
            this.lStanding[index].drawMatches += teamStat.drawMatches; 
            this.lStanding[index].goalsAgainst += teamStat.goalsAgainst;
            this.lStanding[index].goalsFor += teamStat.goalsFor;
            this.lStanding[index].lostMatches += teamStat.lostMatches;
            this.lStanding[index].playedMatches += teamStat.playedMatches;
            this.lStanding[index].points += teamStat.points;
            this.lStanding[index].wonMatches += teamStat.wonMatches;
        }
    }


    findElemInArray(team: String){
        if(this.lStanding.length == 0){
            return -1;
        }else{
            for(let i=0; i<this.lStanding.length; i++){
                console.log(this.lStanding[i].name);
                if(this.lStanding[i].name == team ){
                    return i;
                }
            }
        }
        return -1;
    }

    sortLeagueStanding(a, b){
        if(a.points < b.points){
            return 1;
        }else if(a.points > b.points){
            return -1;
        }else{
            return 0;
        }
    }
}
