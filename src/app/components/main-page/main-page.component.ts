import { Component, inject } from '@angular/core';
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
	subscriptions: MenuItem[] = [];

	ngOnInit() {
		this.getUserDepartments();
	}

	getUserDepartments() {
		this.institutionService.getUserDepartments().subscribe({
			next: (res) => {
				this.subscriptions = this.mapDepartmentsToMenu(res);
			},
			error: (err) => {
				console.log(err);
			},
		});
	}

	mapDepartmentsToMenu(departments: Department[]): MenuItem[] {
		const departmentsMenu: MenuItem[] = [];

		departments.forEach((department) => {
			const city =
				department.city.charAt(0).toUpperCase() +
				department.city.slice(1).toLowerCase();
			departmentsMenu.push({
				name: department.department + ', ' + city,
				endpoint: department.id.toString(), // TODO department-specific routes
			});
		});

		return departmentsMenu;
	}
}
