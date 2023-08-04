import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NameWhiteSpace } from 'src/app/nameWhitespace';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent {

  public signupForm !: FormGroup;
  public existinguser : any;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private http: HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.builder.group({
      //id: this.builder.control('',Validators.compose([Validators.required, Validators.minLength(5)])),
      name: this.builder.control('',Validators.required),
      email: this.builder.control('',Validators.compose([Validators.required, Validators.email])),
      password: this.builder.control('',Validators.compose([Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)])),
      confirmPassword: this.builder.control('', Validators.required),
    })
  }

  signUp() {
    this.authService.getAllUsers().subscribe(res=>{
      res.find((a: any) => {
        if (this.signupForm.value.email != a.email) {
          this.existinguser = false;
        } else {
          this.toastr.warning("User already registered");
          this.existinguser = true;
        }})
    })
    if(this.existinguser === false) {
      if(this.signupForm.valid) {
        if(this.signupForm.value.password === this.signupForm.value.confirmPassword) {
          this.authService.addUser(this.signupForm.value).subscribe(res=>{
          this.toastr.success("SignUp Successful");
          this.signupForm.reset();
          this.router.navigate(['login']);
          }, err=>{
            this.toastr.warning("Something went wrong")
          })
        } else {
          this.toastr.warning("Passwords do not match");
        }
      } else {
        this.toastr.warning("Please enter valid details")
      }
    }
  }
}
