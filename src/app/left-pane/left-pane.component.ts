import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-left-pane',
  templateUrl: './left-pane.component.html',
  styleUrls: ['./left-pane.component.scss']
})
export class LeftPaneComponent implements OnInit {

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
