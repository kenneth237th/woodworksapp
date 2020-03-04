import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  login = false;
  register: true;

  constructor(private ds: DataService, private us: UserService, private nav: NavController) { }

  ngOnInit() {
    const userDetails = JSON.parse(localStorage.getItem('woodworks_userdetails'));
    if (userDetails != null) {
      alert('you are alread logged in');
      this.nav.navigateForward('/login');
    }
  }

  Register(e) {
    e.preventDefault();

    const body = new URLSearchParams();
    body.set('username', e.target.elements[0].value);
    body.set('email', e.target.elements[1].value);
    body.set('password', e.target.elements[2].value);

    this.ds.auth('/auth/local/register', body.toString()).subscribe(
      successDetails => {
        localStorage.setItem('woodworks_userdetails', JSON.stringify(successDetails));
        this.us.setUserDetails(successDetails);
        alert('register success');
      },
      errorDetails => {
        alert('Error code: ' + errorDetails.error.statusCode);
      }
    );
  }

  Login(e) {
    e.preventDefault();

    const body = new URLSearchParams();
    body.set('identifier', e.target.elements[0].value);
    body.set('password', e.target.elements[1].value);

    this.ds.auth('/auth/local', body.toString()).subscribe(
      successDetails => {
        localStorage.setItem('woodworks_userdetails', JSON.stringify(successDetails));
        this.us.setUserDetails(successDetails);
        alert('login success');
      },
      errorDetails => {
        alert('Error code: ' + errorDetails.error.statusCode);
      }
    );
  }

}

