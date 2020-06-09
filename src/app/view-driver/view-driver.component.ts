import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-view-driver',
  templateUrl: './view-driver.component.html',
  styleUrls: ['./view-driver.component.scss']
})
export class ViewDriverComponent implements OnInit {
  image = "";
  public form: {
    driver_id: string;
    email: string;
    fullname: string;
    mobile: string;
    plate: string;
    type: string;
    image: string;
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private firedb:AngularFireDatabase,public dialogRef: MatDialogRef<ViewDriverComponent>) { 

    this.form = {
      driver_id: "",
      email: "",
      fullname: "",
      mobile: "",
      plate: "",
      type: "",
      image:"",
    }
  }

  ngOnInit(): void {
    this.firedb.object("Users/"+this.data.mobile).query.once("value", re=>{
      console.log(re.val());
      this.image = re.val().image;
      var data =  re.val();
      this.form = {
        driver_id: data.driver_id,
        email: data.email,
        fullname: data.fullname,
        mobile: data.mobile,
        plate: data.plate,
        type: data.type,
        image: data.image,
      };
      console.log(this.form);
    });
  }


  Update(){
    this.firedb.object("Users/"+this.data.mobile).update(this.form).then(re=>{
      this.dialogRef.close({data:"updated"});
    });
  }

}
