import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {
	Country,
	Department,
	Institution,
	School,
} from '../interfaces/institutions';

const API_URL = `${environment.apiURL}/api`;

@Injectable({
	providedIn: 'root',
})
export class InstitutionService {
	http: HttpClient = inject(HttpClient);

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

	subscribeNewsletter() {}
}
