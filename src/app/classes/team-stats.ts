export class TeamStats {
    name: String ="";
    playedMatches: Number= 0;
    wonMatches: Number= 0;
    lostMatches: Number= 0;
    drawMatches: Number= 0;
    goalsFor: Number= 0;
    goalsAgainst: Number= 0;
    public points: Number= 0;

    constructor(name:String){
        this.name= name;
    }

}
