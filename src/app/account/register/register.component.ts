import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password:  new FormControl('', [Validators.required]),
    ConfirmPassword:  new FormControl('', [Validators.required])
  }, this.passwordsShouldMatch
  );

  constructor(private service: RegisterService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.service.register(this.registerForm);
  }


  private passwordsShouldMatch(fGroup: FormGroup) {
    return fGroup.get('Password').value === fGroup.get('ConfirmPassword').value
      ? null : {mismatch: true};
  }
}
