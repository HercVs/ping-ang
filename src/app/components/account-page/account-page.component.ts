import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
	selector: 'app-account-page',
	imports: [RouterOutlet, SidebarComponent],
	templateUrl: './account-page.component.html',
	styleUrl: './account-page.component.css',
})
export class AccountPageComponent {
	accountItems = [
		{
			name: 'Personal Info',
			endpoint: 'personal-info',
		},
		{
			name: 'Settings',
			endpoint: 'settings',
		},
	];
}
