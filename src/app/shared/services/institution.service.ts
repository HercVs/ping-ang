import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {
	Country,
	Department,
	Institution,
	School,
	SubscriptionDetails,
} from '../interfaces/institutions';
import { UserService } from './user.service';
import { MenuItem } from '../interfaces/menu-item';

const API_URL = `${environment.apiURL}/api`;

@Injectable({
	providedIn: 'root',
})
export class InstitutionService {
	http: HttpClient = inject(HttpClient);
	userService: UserService = inject(UserService);

	subscriptions = signal<MenuItem[]>([]);

	refreshSubscriptions() {
		this.getUserDepartments().subscribe({
			next: (res) => {
				this.subscriptions.set(this.mapDepartmentsToMenu(res));
			},
			error: (err) => {},
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

	getAllCountries() {
		return this.http.get<Country[]>(API_URL + '/countries', {
			headers: {
				Accept: 'application/json',
			},
		});
	}

	getInstitutions(country: number) {
		return this.http.get<Institution[]>(API_URL + '/countries/' + country, {
			headers: {
				Accept: 'application/json',
			},
		});
	}

	getSchools(institutionId: number) {
		return this.http.get<School[]>(
			API_URL + '/institutions/' + institutionId + '/schools',
			{
				headers: {
					Accept: 'application/json',
				},
			},
		);
	}

	getDepartments(institutionId: number, schoolId: number) {
		return this.http.get<Department[]>(
			API_URL +
				'/institutions/' +
				institutionId +
				'/schools/' +
				schoolId +
				'/departments',
			{
				headers: {
					Accept: 'application/json',
				},
			},
		);
	}

	getUserDepartments() {
		return this.http.get<Department[]>(
			API_URL + '/users/' + this.userService.user()?.id + '/departments',
			{
				headers: {
					Accept: 'application/json',
				},
			},
		);
	}

	subscribeToDepartment(subscription: SubscriptionDetails) {
		return this.http.post(
			API_URL + '/users/' + this.userService.user()?.id + '/departments',
			subscription,
			{
				headers: {
					Accept: 'application/json',
				},
			},
		);
	}

	unsubscribeFromDepartment(subscription: SubscriptionDetails) {
		return this.http.delete(
			API_URL +
				'/users/' +
				this.userService.user()?.id +
				'/departments/' +
				subscription.departmentId,
			{
				headers: {
					Accept: 'application/json',
				},
			},
		);
	}
}
