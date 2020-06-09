import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import {MatDialog} from '@angular/material/dialog';
import { DriverMessageComponent } from '../driver-message/driver-message.component';
import { UploadMessageComponent } from '../upload-message/upload-message.component';
import { ViewDriverComponent } from '../view-driver/view-driver.component';
@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  drivers = [];
  public form: {
    id_no: string;
    email: string;
    fullname: string;
    mobile: string;
    number_plate: string;
    vehicle: string;
    file: File | null;

  };
  constructor(public auth: AngularFireAuth,private router : Router,public dialog: MatDialog,private storagedb:AngularFireStorage,private firedb:AngularFireDatabase) { 
    this.form = {
      id_no: "",
      email: "",
      fullname: "",
      mobile: "",
      number_plate: "",
      vehicle: "",
      file:null,
    };
  }

  ngOnInit(): void {
    this.firedb.list("Users").query.orderByChild('driver').equalTo(true).once("value").then(x=>{
      // console.log(x.val());
      var resulting_array = Object.entries(x.val());
      // console.log(Object.entries(x.val()));
      for(var driver = 0; driver < resulting_array.length; driver++){
        this.drivers.push(resulting_array[driver][1]);
      }
      console.log(this.drivers)
    })
  }


  addNew(){
    if(this.form.fullname == "" || this.form.email == "" || this.form.file == null || this.form.id_no == "" || this.form.mobile == "" || this.form.number_plate == "" || this.form.vehicle == ""){
      const dialogRef = this.dialog.open(DriverMessageComponent);
    }else{
      const dialogRef = this.dialog.open(UploadMessageComponent);
      console.group( "Form View-Model" );
      console.log( "Name:", this.form.id_no );
      console.log( "Email:", this.form.email );
      console.log( "name:", this.form.fullname );
      console.log( "mobile:", this.form.mobile );
      console.log( "vehicle:", this.form.vehicle );
      console.log( "file:", this.form.file );
      console.log( "plate:", this.form.number_plate );
      console.groupEnd();

      var fileupload = <HTMLInputElement> document.getElementById("fileInput");
      var file_id = '/'+Math.random()+fileupload.files.item(0).name;
      //create user account
      this.auth.createUserWithEmailAndPassword(this.form.email,this.form.mobile.toString()).then(re=>{
        console.log(re);
        var new_upload = this.storagedb.upload(file_id,fileupload.files.item(0));
        new_upload.percentageChanges().subscribe(p=>{
          console.log(p);
          if(p == 100){
            //get file url
            var uploaded_file = this.storagedb.ref(file_id).getDownloadURL().subscribe(url=>{
              this.drivers = [];
              this.firedb.object("Users/"+0+ JSON.stringify(this.form.mobile)).set({"mobile":0 + JSON.stringify(this.form.mobile),"email":this.form.email,"fullname":this.form.fullname,"driver":true,"location":"","type":this.form.vehicle,"plate":this.form.number_plate,"driver_id":this.form.id_no,"image":url,"picking_up":'none'}).then(()=>{
                this.ngOnInit();
                this.dialog.closeAll();
                this.emptyForm();
              });
            });
          }
        },err=>{
          alert(err);
        })
      }).catch(err=>{
        alert(err);
        this.dialog.closeAll();
      })
    }
  }

  emptyForm(){
    this.form = {
      id_no: "",
      email: "",
      fullname: "",
      mobile: "",
      number_plate: "",
      vehicle: "",
      file:null,
    };
  }

  getDriver(mobile){
    var viewDriver = this.dialog.open(ViewDriverComponent,{data:{mobile:mobile},width:'800px'});
    viewDriver.afterClosed().subscribe(re=>{
      console.log(re);
      if(re.data == "updated"){
        this.drivers = [];
        this.ngOnInit();
      }
    })
  }

}