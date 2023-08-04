import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm !: FormGroup;
  public userexist: any = true;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private http: HttpClient, private router: Router, private commonService: CommonService, private authService: AuthService) { 
    sessionStorage.clear();
  }

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      name: [''],
      password: ['']
    })
    this.adddetails();
  }

  adddetails() {
    this.commonService.sendData(this.loginForm.value.name)
  }
  logIn() {
    this.authService.getAllUsers().subscribe(res=>{
      const user = res.find((a: any) => {
        if (this.loginForm.value.name == '') {
          this.toastr.warning("please enter details");
          this.userexist = false;
          return;
        } else {
          this.userexist = true;
          this.commonService.sendEmail(a.email);
          console.log(a.email)
          return a.name === this.loginForm.value.name && a.password === this.loginForm.value.password
        }
      });
      if (this.userexist) {
        if(user) {
          this.toastr.success("Login Successful");
          sessionStorage.setItem('name',user.id);
          this.router.navigate(['/home']);
        } else {
          this.toastr.error("Invalid Credentials");
        }
    }
    },err=>{
      this.toastr.error("Something went wrong");
    })
    this.commonService.sendData(this.loginForm.value.name);
    
  }

  forgotPassword() {
    this.commonService.sendData(this.loginForm.value.name)
    if(this.loginForm.value.name == '') {
      this.toastr.warning("Please enter your UserName")
    } else {
      this.router.navigate(['/forgotpassword']);
    }
  }
}
