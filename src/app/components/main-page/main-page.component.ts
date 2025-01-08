import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
	selector: 'app-main-page',
	imports: [RouterOutlet, SidebarComponent],
	templateUrl: './main-page.component.html',
	styleUrl: './main-page.component.css',
})
export class MainPageComponent {}
