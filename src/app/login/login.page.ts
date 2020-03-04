import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { UserService } from '../services/user.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login = true;
  register = false;

  constructor(private ds: DataService, private us: UserService, private nav: NavController, private router: Router) { }

  ngOnInit() {
    const userDetails = JSON.parse(localStorage.getItem('woodworks_userdetails'));
    if (userDetails != null) {
      alert('you are alread logged in');
      this.nav.navigateForward('/home');
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

  signup() {
    this.router.navigate(['/register'])
  }

}

