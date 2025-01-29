import { Component, inject } from '@angular/core';
import { InstitutionService } from '../../shared/services/institution.service';
import {
	Country,
	Department,
	Institution,
	School,
} from '../../shared/interfaces/institutions';

@Component({
	selector: 'app-institutions',
	imports: [],
	templateUrl: './institutions.component.html',
	styleUrl: './institutions.component.css',
})
export class InstitutionsComponent {
	institutionService = inject(InstitutionService);

	countries: Country[] = [];
	institutions: Institution[] = [];
	schools: School[] = [];
	departments: Department[] = [];

	selectedCountry: number = 0;
	selectedInstitution: number = 0;
	selectedSchool: number = 0;
	selectedDepartment: number = 0;

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

		this.institutionService.getAllCountries().subscribe((data) => {
			this.countries = data;
		});
	}

	findInstitutions(country: number) {
		this.institutionService.getInstitutions(country).subscribe((data) => {
			this.institutions = data;
			this.selectedCountry = country;
			console.log(data);
		});
	}

	findSchools(institutionId: number) {
		this.institutionService.getSchools(institutionId).subscribe((data) => {
			this.schools = data;
			this.selectedInstitution = institutionId;
			console.log(data);
		});
	}

	findDepartments(institutionId: number, schoolId: number) {
		this.selectedInstitution = institutionId;
		this.institutionService
			.getDepartments(institutionId, schoolId)
			.subscribe((data) => {
				this.departments = data;
				console.log(data);
			});
	}

	subscribeNewsletter(departmentId: number) {}
}
