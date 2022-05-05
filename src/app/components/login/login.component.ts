import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidLogin: boolean = false;
  form: FormGroup;

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private authService: AuthService, 
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
    this.form = this.formBuilder.group(
      {
        username: [null, [Validators.required, Validators.minLength(3)]],
        password: ['', Validators.required]
      }
    )
   }

  ngOnInit(): void {
  }

  signIn(event: Event){
      event.preventDefault;
      this.authService.login(this.form.value).subscribe(data => {
        if (data) {
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
          location.reload();
        }

        else {
          this.invalidLogin = true;
          this.snackBar.open('Usuario y/o contraseña inexistentes', '', {
            duration: 3000
          });
        
        }
      })
  }

  get Username() {
    return this.form.get('username');
  }

  get Password() {
    return this.form.get('password');
  }



}
