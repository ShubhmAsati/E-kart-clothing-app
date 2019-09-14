import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.css']
})
export class AddNewAddressComponent implements OnInit {

  public addressForm:FormGroup;

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddNewAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.addressForm = this.fb.group({
      name:['',Validators.required],
      mobile:['',Validators.required],
      pincode:['',Validators.required],
      state:['',Validators.required],
      addressLine1:['',Validators.required],
      addressLine2:['',Validators.required],
      city:['',Validators.required],
      addressType:['',Validators.required],
      makeDefault:['',Validators.required]
    });
  }

  closeDialog(){
    this.dialogRef.close();
  }

  cancel(){
    this.addressForm.reset();
    this.dialogRef.close();
  }
}
