import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MailService } from './mail.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  year: any = '';
  form!: FormGroup;
  public site_key = environment.SITE_KEY;
  display = false;
  message!: any;
  constructor(
    private renderer: Renderer2,
    public messageService: MailService
  ) {}
  ngOnInit(): void {
    this.year = new Date().getFullYear();

    this.form = new FormGroup({
      nameklm: new FormControl(null, [Validators.required]),
      emailkq: new FormControl(null, [Validators.required, Validators.email]),
      messageqtr: new FormControl(null, [Validators.required]),
      name: new FormControl(),
      email: new FormControl(),
      recaptcha: new FormControl(['', Validators.required]),
    });
  }

  top() {
    window.scrollTo(0, 0);
  }
  openmenu() {
    let sidemenu = document.getElementById('sidemenu');
    this.renderer.setStyle(sidemenu, 'right', 0);
  }
  closemenu() {
    let sidemenu = document.getElementById('sidemenu');
    this.renderer.setStyle(sidemenu, 'right', '-200px');
  }
  hide() {
    let sidemenu = document.getElementById('sidemenu');
    this.renderer.setStyle(sidemenu, 'right', '-200px');
  }

  onSubmit() {
    if (this.form.value.name || this.form.value.email) {
      return;
    } else {
      console.log('sent');

      this.messageService
        .getMessage(
          this.form.value.nameklm,
          this.form.value.emailkq,
          this.form.value.messageqtr
        )
        .subscribe((result) => {
          console.log(result);
          this.display = true;
          this.message = result.message;
          setTimeout(() => {
            this.message = '';
          }, 3000);
        });
      this.form.reset();
    }
  }
}
