import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api'
import {LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService : LoginService, private messageService : MessageService, private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(){
    this.loginService.logout();
    this.messageService.add({severity: 'warn', summary: 'A bientôt', detail: ''});
    this.router.navigate(['/'])
  }
}
