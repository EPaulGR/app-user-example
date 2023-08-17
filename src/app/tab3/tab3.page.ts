import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  userData: any;
  edit = true;
  public form: FormGroup;

  constructor(
    private navCtrl: NavController,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) {
      
    this.form = this.formBuilder.group({
      address: ['', Validators.required, ],
      age: ['', Validators.required, ],
      balance: ['', Validators.required, ],
      company: ['', Validators.required, ],
      email: ['', Validators.required, Validators.email],
      eyeColor: ['', Validators.required, ],
      name: this.formBuilder.group({
        first: ['', Validators.required],
        last: ['', Validators.required],
      }),
      password: ['', Validators.required],
      phone: ['', Validators.required, ],
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.apiService.getUser(277).subscribe((res: any) => {
      this.userData = res;
      console.log(this.userData);
      this.form = this.formBuilder.group({
        address: [this.userData?.address, [Validators.required]],
        age: [this.userData.age, [Validators.required, ]],
        balance: [this.userData.balance , [Validators.required, ]],
        company: [this.userData.company, [Validators.required, ]],
        email: [this.userData.email, [Validators.required, Validators.email]],
        eyeColor: [this.userData.eyeColor, [Validators.required, ]],
        name: this.formBuilder.group({
          first: [this.userData.name.first, [Validators.required]],
          last: [this.userData.name.last, [Validators.required]],
        }),
        password: [this.userData.password, [Validators.required]],
        phone: [this.userData.phone, [Validators.required, ]],
      });
    });
  }

  editChange(): void {
    if(this.edit === true) {
      this.edit = false;
    } else {
      this.edit = true;
    }
  }

  logOut(): void {
    this.navCtrl.navigateRoot('login');
  }

  send(): void {
    this.edit = true;
    console.log(this.form.value);
    this.apiService.updateUsers(277, this.form.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getData();
      }
    });
  }
}
