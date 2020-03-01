import { CustomerInformation } from './../models/CustomerInformation';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { CustomerService } from './../services/customer.service';

@Component({
  selector: 'app-customer-information',
  templateUrl: './customer-information.component.html',
  styleUrls: ['./customer-information.component.scss']
})
export class CustomerInformationComponent implements OnInit {
  customerForm: FormGroup;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null),
      city: new FormControl(null, Validators.required),
      postCode: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const customerInformation: CustomerInformation = {
        firstName: this.customerForm.value.firstName,
        lastName: this.customerForm.value.lastName,
        email: this.customerForm.value.email,
        phoneNumber: this.customerForm.value.phone,
        address1: this.customerForm.value.address1,
        address2: this.customerForm.value.address2,
        city: this.customerForm.value.city,
        postCode: this.customerForm.value.postCode
      };

      this.customerService.setCustomerInformation(customerInformation);
    }
  }

}
