import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {

  public name: any;
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.name.subscribe(res=>{
      this.name = res;
    })
  }
}
