import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  email;
  password;
  isLoggedIn: boolean = true;
  warning = false;
  warningmsg = "";
  userCollection:AngularFirestoreCollection;
  constructor(public auth: AngularFireAuth,private router : Router, private db: AngularFirestore) { 
    this.userCollection = db.collection("dashboardadmins");
  }

  ngOnInit(): void {
    var isSignedIn = this.auth.authState.subscribe(x=>{
      console.log(x);
      if(x ==  null){
        this.isLoggedIn =  false;
        isSignedIn.unsubscribe();
      }else{
        this.isLoggedIn =  true;
        this.userCollection.doc(x.email).ref.get().then(u=>{
          // console.log();
          if(u.data().admin == true){
            isSignedIn.unsubscribe();
            this.router.navigate(['drivers']);
          }else{
            this.warning = true;
            this.warningmsg = "Access denied";
            this.isLoggedIn = false;
            this.auth.signOut();
            isSignedIn.unsubscribe();
          }
        }).catch(err=>{
          this.auth.signOut();
          this.isLoggedIn =  false;
          this.warning = true;
          this.warningmsg = "Access denied";
        })
      }
    });
  }




  signIn(){
    console.log(this.isLoggedIn);
    var isSignedIn = this.auth.authState.subscribe(x=>{
      console.log(x);
      if(x ==  null){
        this.auth.signInWithEmailAndPassword(this.email,this.password).then(loggedIn=>{
          console.log(loggedIn);
          this.isLoggedIn = true;
          this.ngOnInit();
        }).catch(err=>{
          // console.log(err.message);
          this.warning = true;
          this.warningmsg = err.message;
        });
        isSignedIn.unsubscribe();
      }else{
        isSignedIn.unsubscribe();
        this.auth.signOut();
      }
    });
    
  }

}
