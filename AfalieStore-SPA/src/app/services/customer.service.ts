import { Injectable } from '@angular/core';

import { CustomerInformation } from './../models/CustomerInformation';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  setCustomerInformation(customerInformation: CustomerInformation) {
    sessionStorage.setItem('customer-info', JSON.stringify(customerInformation));
  }

  getCustomerInformation() {
    var customerInfo: CustomerInformation = JSON.parse(sessionStorage.getItem('customer-info'));

    return customerInfo;
  }
}
