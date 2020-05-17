import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'TowTruck-Dashboard';
  constructor(public auth: AngularFireAuth,private router : Router) { }
  faCoffee = faCoffee;
  ngOnInit(){
    this.auth.onAuthStateChanged(user=>{
      if(user){
        console.log("user is signed in");
        // this.router.navigate(['drivers']);
      }else{
        console.log("user is not signed in");
        this.router.navigate(['']);
      }
    }); 
  }
}
