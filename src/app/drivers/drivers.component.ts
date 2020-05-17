import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.sass']
})
export class DriversComponent implements OnInit {

  constructor(public auth: AngularFireAuth,private router : Router) { }
  ngOnInit(): void {
    var isSignedIn = this.auth.authState.subscribe(x=>{
      console.log(x);
      if(x == null){
        isSignedIn.unsubscribe();
        this.router.navigate(['']);
      }
    });
  }

  logout(){
    this.auth.signOut();
  }
}
