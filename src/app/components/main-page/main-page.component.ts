import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Department } from '../../shared/interfaces/institutions';
import { InstitutionService } from '../../shared/services/institution.service';
import { MenuItem } from '../../shared/interfaces/menu-item';

@Component({
	selector: 'app-main-page',
	imports: [RouterOutlet, SidebarComponent],
	templateUrl: './main-page.component.html',
	styleUrl: './main-page.component.css',
})
export class MainPageComponent {
	institutionService = inject(InstitutionService);
	title: string = 'Subscriptions';

	ngOnInit() {
		this.institutionService.refreshSubscriptions();
	}
}
