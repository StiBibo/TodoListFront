import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestClientService } from 'src/app/core/services/rest-client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userConnected : any
  connexionForm!: FormGroup

  constructor(
    private restClientService : RestClientService,
    private router: Router
  ) { }


  onLoginUser() {
    if (this.connexionForm.valid) {
      const data = {
        username : this.connexionForm.value.username,
        password : this.connexionForm.value.password
      }
      this.restClientService.execute('login/', data).subscribe(
        (res:any) => {
          localStorage.setItem("userConnected", JSON.stringify(this.userConnected));
          this.router.navigate(['/'])
        },
        (error:any) => {
          Swal.fire({
            title: 'Erreur!',
            text: `Probleme sur la connexion !`,
            icon: 'error',
            confirmButtonText: 'Cool'
          })

        }
      )
    } else {
      Swal.fire({
        title: 'Erreur!',
        text: `Probleme sur la connexion !`,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  }

  isInvalidInput(field: AbstractControl){
    return field.invalid && (field.touched || field.dirty);
  }



  ngOnInit(): void {
    this.connexionForm = new FormGroup({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required])
    })
  }

}
