import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  
  title = 'new-wizard-framework';
  isnavrequired = false;
  navnotrequired = true;
  name: any;
  email: any;
  isdropdown = false;
  isbigsidebar = false;
  issmallsidebar = true;

  constructor(private router: Router, private commonService: CommonService) { }

  ngDoCheck(): void {
    let currenturl = this.router.url;
    if(currenturl=='/login' || currenturl == '/signup' || currenturl == '/forgotpassword') {
      this.isnavrequired = false;
      this.navnotrequired = true;
    } else {
      this.isnavrequired = true;
      this.navnotrequired = false;
    }
  }

  ngOnInit(): void {
    this.commonService.name.subscribe(res=>{
      this.name = res;
    })
    this.commonService.email.subscribe(res =>{
      this.email = res;
    })
  }

  dropdown() {
    if(this.isdropdown === false) {
      this.isdropdown = true;
    } else {
      this.isdropdown = false;
    }
  }

  bigsidebar() {
    if(this.isbigsidebar === false) {
      this.isbigsidebar = true;
      this.issmallsidebar = false;
    } else {
      this.isbigsidebar = false;
      this.issmallsidebar = true;
    }
  }
}
