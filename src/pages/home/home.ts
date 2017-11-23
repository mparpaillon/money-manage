import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

const LS_KEY = 'datas';
const defaultDatas = {
  currency: '$',
  form: {
    acceptedLoss: 1,
    capital: 10000,
    unitPrice: 6000,
    stopLoss: 5000
  }
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private form : FormGroup;
  private currency : string;
  private result : string;

  constructor(
    private formBuilder: FormBuilder
  ) {
    const savedDatas = this.getSavedDatas();

    this.currency = savedDatas.currency;

    this.form = this.formBuilder.group({
      acceptedLoss: [ savedDatas.form.acceptedLoss, Validators.required ],
      capital: [ savedDatas.form.capital, Validators.required ],
      unitPrice: [ savedDatas.form.unitPrice, Validators.required ],
      stopLoss: [ savedDatas.form.stopLoss, Validators.required ]
    });
  }

  submit() {
    this.saveDatas(this.form.value, this.currency);

    const acceptedLossValue = this.form.value.capital / 100 * this.form.value.acceptedLoss;
    const actualLossForOneUnit = this.form.value.unitPrice - this.form.value.stopLoss;
    const quantity = acceptedLossValue / actualLossForOneUnit;
    const total = quantity * this.form.value.unitPrice;
    const stopLoss = quantity * this.form.value.stopLoss;
    const potentialLoss = total - stopLoss;

    this.result = `
      You can buy ${quantity} units for ${this.currency}${total} with a stop loss of ${this.currency}${stopLoss}
      for a potential loss of ${this.currency}${potentialLoss} (${this.form.value.acceptedLoss}% of my capital)
    `;
  }

  getSavedDatas() {
    const savedDatas = localStorage.getItem(LS_KEY);

    if (savedDatas !== null) return JSON.parse(savedDatas);

    return defaultDatas;
  }

  saveDatas(form, currency) {
    localStorage.setItem(LS_KEY, JSON.stringify({ currency, form }));
  }
}
