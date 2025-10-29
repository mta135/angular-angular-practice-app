import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';


@Component({
    selector: 'app-menu-bar',
    imports: [Menubar],
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
                label: 'Home',
                icon: 'pi pi-home',
                routerLink: ['/home']
            },
            {
                label: 'Products',
                icon: 'pi pi-briefcase',
                items: [
                    { label: 'New', icon: 'pi pi-plus' },
                    { label: 'List', icon: 'pi pi-list' }
                ]
            },
            {
                label: 'Reports',
                icon: 'pi pi-chart-line',
                items: [
                    { label: 'Sales', icon: 'pi pi-dollar' },
                    { label: 'Inventory', icon: 'pi pi-box' }
                ]
            },
            {
                label: 'Settings',
                icon: 'pi pi-cog',
                items: [
                    { label: 'Profile', icon: 'pi pi-user' },
                    { label: 'Preferences', icon: 'pi pi-sliders-h' }
                ]
            }
        ];
    }
}



