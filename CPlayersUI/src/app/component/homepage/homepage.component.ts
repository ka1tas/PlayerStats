import { Component, OnInit, ɵConsole } from '@angular/core';
import { PlayerService } from '../../services//player.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  players: any;
  playerDetails: any;
  namePattern = "^[a-zA-Z ]+$";
  saveName: any;
  showmodal = false;
  error = false;
  addingerror = false;
  userId: any;
  viewAddButton = false;
  favPlayers: any;

  constructor(private playerService: PlayerService, public router: Router, private authService: AuthService) { }

  searchform = new FormGroup({
    playername: new FormControl(
      '',
      [Validators.required,
      Validators.pattern(this.namePattern)
      ]),
   
  });


  ngOnInit() {
    this.viewAddButton = this.authService.getloggedIn();
    if (this.authService.getloggedIn()) {
      this.playerService.showFav().subscribe(data => {

        this.favPlayers = data;
        console.log(this.favPlayers);
      },
        error => { this.error = true; })
    }





  }
  checkFav(results) {
    for (let result of results) {
      for (let favPlayer of this.favPlayers) {
        if (result.pid == favPlayer.pid) {
          result.fav = true;
          result.id = favPlayer.id;
        }
      }
    }
    this.players = results
  }



  searchPlayers(name) {
    console.log(name);
    this.saveName = name;
    this.playerService.searchPlayer(name).subscribe(data => {
      console.log(data);

      if (this.authService.getloggedIn()) {
        this.checkFav(data.data);
      } else {
        this.players = data.data;
      }
    },
      error => {
        this.error = true;
      });
  }

  showStats(playerId) {
    this.showmodal = true;
    console.log(playerId);
    this.playerService.showStatus(playerId).subscribe(data => {
      this.playerDetails = data;
      console.log(this.playerDetails);
      this.error = false;

    },
      error => {
        this.error = true;
      });
  }


  addToFav(pid) {


    this.userId = this.authService.getUserId();

    this.playerService.showStatus(pid).subscribe(data => {
      this.playerDetails = data;
      this.playerDetails.fav = true;
      console.log(this.playerDetails)
      this.error = false;
      this.playerService.addFav(this.playerDetails).subscribe(data => {
        console.log(data)
        this.error = false;    
        this.ngOnInit();
        this.searchPlayers(this.saveName);

      }, error => {
        this.addingerror = true;
      })

    },
      error => {
        this.error = true;
      });
  }


  deleteFav(player) {
    console.log(player.id)
    this.playerService.deleteFav(player.id).subscribe(data => {
      console.log(data)
      if (data.message == "Player deleted successfully") {
        this.ngOnInit();
        this.error = false;
        this.searchPlayers(this.saveName);
      } else {
        this.error = true;
      }

    }, error => {
      this.error = true;
    })

  }




}
