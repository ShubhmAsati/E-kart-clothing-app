import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public profileForm:FormGroup;
  
  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName:[''],
      lastName:[''],
      dob:[''],
      mobile:[''],
      gender:[''],
      email:['']
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
