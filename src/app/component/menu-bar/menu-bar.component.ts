import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';



@Component({
    selector: 'app-menu-bar',
    imports: [Toolbar, ButtonModule],
    templateUrl: './menu-bar.component.html',
    styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit(): void {

        this.createMenuItems();
    }

    private createMenuItems(): void {
        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Delete',
                icon: 'pi pi-times'
            }
        ];
    }
}



