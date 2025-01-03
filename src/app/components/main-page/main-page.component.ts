import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NewsGeneralComponent } from '../news-general/news-general.component';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-main-page',
	imports: [SidebarComponent, RouterOutlet],
	templateUrl: './main-page.component.html',
	styleUrl: './main-page.component.css',
})
export class MainPageComponent {}
