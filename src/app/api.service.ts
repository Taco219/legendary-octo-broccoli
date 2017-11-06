import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    constructor(private http: Http) { }

    apiBase: String = "http://localhost:3000/api";

    getTest(){
        return this.http.get(this.apiBase + "/game/test")
            .map(res => res.json())
    }

    getGame(gameId){
        return this.http.get(this.apiBase + '/game/' + gameId)
            .map(res => res.json())
    }

    createGame(){
        return this.http.get(this.apiBase + '/game/create')
            .map(res => res.json())
    }

    move(gameId, direction){
        return this.http.get(this.apiBase + '/game/'+gameId+'/'+direction)
            .map(res => res.json(), err=>err.json())
    }
}
