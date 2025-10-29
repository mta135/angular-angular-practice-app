import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-menu-bar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, MatMenuModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent {

}
