import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/Services/user_service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories = ["Juegos", "Golf"];
  constructor(private user: UserInfoService) { }

  ngOnInit() {
    this.user.getCurrentSession();
  }

  ngOnDestroy() {

  }

}
