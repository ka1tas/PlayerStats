import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {
  favPlayers: any;
  showmodal = false;
  playerDetails:any;
  error=false;
  
  constructor(private playerService: PlayerService, private authService: AuthService) { }

  ngOnInit() {

    let userID = this.authService.getUserId();

    console.log(userID);

    this.playerService.showFav().subscribe(data => {
      console.log(data);
      this.favPlayers = data;

    },
    error=>{ this.error=true;})

  }


  showStats(playerId) {
    this.showmodal = true;
    console.log(playerId);
    this.playerService.showStatus(playerId).subscribe(data => {
      this.playerDetails = data;
      console.log(this.playerDetails);

    })
  }

  deleteFav(player){
    this.playerService.deleteFav(player.id).subscribe(data => {
      console.log(data)
      if(data.message=="Player deleted successfully"){
        this.ngOnInit();
        this.error=false;
      }else{
        this.error=true;
      }
   
    }, error => {
        this.error=true;
    })

  }




}
