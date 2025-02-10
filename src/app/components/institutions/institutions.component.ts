import { Component, inject } from '@angular/core';
import { InstitutionService } from '../../shared/services/institution.service';
import {
	Country,
	Department,
	Institution,
	School,
	SubscriptionDetails,
} from '../../shared/interfaces/institutions';
import { UserService } from '../../shared/services/user.service';
import { byProperty } from '../../shared/utils/util';

@Component({
	selector: 'app-institutions',
	imports: [],
	templateUrl: './institutions.component.html',
	styleUrl: './institutions.component.css',
})
export class InstitutionsComponent {
	// TODO demo functionality
	userService = inject(UserService);
	institutionService = inject(InstitutionService);

	countries: Country[] = [];
	institutions: Institution[] = [];
	schools: School[] = [];
	departments: Department[] = [];

	selectedCountry: number = 0;
	selectedInstitution: number = 0;
	selectedSchool: number = 0;
	selectedDepartment: number = 0;

	departmentsError: string | null = null;

	ngOnInit() {
		this.resetSelectors();
	}

	resetSelectors() {
		this.countries = [];
		this.institutions = [];
		this.schools = [];
		this.departments = [];

		this.selectedCountry = 0;
		this.selectedInstitution = 0;
		this.selectedSchool = 0;
		this.selectedDepartment = 0;

		this.departmentsError = null;

		this.institutionService.getAllCountries().subscribe({
			next: (data) => {
				this.countries = data;
			},
			error: (err) => {},
		});
	}

	findInstitutions(country: number) {
		this.departmentsError = null;
		this.institutionService.getInstitutions(country).subscribe({
			next: (data) => {
				this.institutions = data.sort(byProperty('name'));
			},
			error: (err) => {},
		});
		this.selectedCountry = country;
		this.selectedInstitution = 0;
		this.selectedSchool = 0;
		this.selectedDepartment = 0;

		this.schools = [];
		this.departments = [];

		this.departmentsError = null;
	}

	findSchools(institutionId: number) {
		this.departmentsError = null;
		this.institutionService.getSchools(institutionId).subscribe({
			next: (data) => {
				this.schools = data.sort(byProperty('school'));
			},
			error: (err) => {},
		});
		this.selectedInstitution = institutionId;
		this.selectedSchool = 0;
		this.selectedDepartment = 0;

		this.departments = [];
	}

	findDepartments(institutionId: number, schoolId: number) {
		this.departmentsError = null;
		this.institutionService.getDepartments(institutionId, schoolId).subscribe({
			next: (data) => {
				this.departments = data.sort(byProperty('department'));
			},
			error: (err) => {
				if (err.error.code === 'DepartmentNotFound') {
					this.departments = [];
					this.departmentsError = 'No departments found for school';
				}
			},
		});
		this.selectedInstitution = institutionId;
		this.selectedSchool = schoolId;
		this.selectedDepartment = 0;
	}

	subscribeToNewsletter(departmentId: number) {
		const subscription: SubscriptionDetails = {
			userId: this.userService.user()?.id as unknown as number,
			departmentId: departmentId,
		};
		this.institutionService.subscribeToDepartment(subscription).subscribe({
			next: (data) => {},
			error: (err) => {},
		});
		this.institutionService.refreshSubscriptions();
	}

	unsubscribeFromNewsletter(departmentId: number) {
		const subscription: SubscriptionDetails = {
			userId: this.userService.user()?.id as unknown as number,
			departmentId: departmentId,
		};
		this.institutionService.unsubscribeFromDepartment(subscription).subscribe({
			next: (data) => {
				// TODO doesn't refresh like subscribing does
			},
			error: (err) => {},
		});
		this.institutionService.refreshSubscriptions();
	}
}
