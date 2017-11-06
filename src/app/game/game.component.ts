import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
    constructor(private api: ApiService) { }

    gameId : string;
    player : Thing = new Thing();
    game   : Game = new Game();

    lsThings : Array<Thing> = [];

    ngOnInit() {
        this.api.getTest().
            subscribe(data => {
                console.log(data)
            },errResponse => this.handleError(errResponse.json()))
    }

    public createGame() {
        this.api.createGame()
            .subscribe(gameIdData => {
                this.game._id = gameIdData.gameId;
                this.getGame();
            },errResponse => this.handleError(errResponse.json()))
    }

    public getGame() {
        if(this.game._id == null){
            alert("game id is null");
            return;
        }

        this.api.getGame(this.game._id)
            .subscribe(gameData => {
                console.log(gameData);
                this.game.loadGame(gameData.game);
                this.player.loadThing(gameData.player);

                this.lsThings = [];
                for(let i = 0; i < gameData.blocks.length; i++){
                    const nThing = new Thing();
                    nThing.loadThing(gameData.blocks[i]);
                    this.lsThings.push(nThing);
                }
            },errResponse => this.handleError(errResponse.json()));
    }

    public move(direction) {
        this.api.move(this.game._id, direction)
            .subscribe(moveData => {
                console.log(moveData);
                this.player.loadThing(moveData.player);

                if(moveData.win){
                    alert('You won!');
                }
            },errResponse => this.handleError(errResponse.json()));
    }

    public handleError(err){
        if(err.code == 400){
            alert(err.message);
        }
        else {
            alert('Something went wrong');
            console.log(err);
        }
    }
}

class Thing {
    public loadThing(thingData){
        this._id = thingData._id;
        this.type = thingData.type;
        this.xAxis = thingData.xAxis;
        this.yAxis = thingData.yAxis;
    }

    _id     : string;
    type    : thingType;
    xAxis   : number;
    yAxis   : number;
}

class Game {
    public loadGame(gameData){
        this._id = gameData._id;
        this.goalXAxis = gameData.goalXAxis;
        this.goalYAxis = gameData.goalYAxis;
    }

    _id       : String;
    goalXAxis : number;
    goalYAxis : number;
}

enum thingType{
    player,
    block
}
