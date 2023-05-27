import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.scss']
})
export class NewCollectionComponent implements OnInit {

  form: UntypedFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    symbol: ['', Validators.required],
  });

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialogRef<NewCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  newCollection(): void {

  }

  closeModal(): void {
    this.dialog.close();
  }

}
