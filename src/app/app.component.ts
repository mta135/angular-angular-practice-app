import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';


import { MenuBarComponent } from "./component/menu-bar/menu-bar.component";
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  showMenu: boolean = true;

  constructor(private router: Router) {

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {

      const url = event.urlAfterRedirects;
      const isExcludedPage = url.startsWith('/currency-converter') || url.startsWith('/currency-details');

      this.showMenu = !isExcludedPage;
    });
  }

  title = 'angular-practice';
}
