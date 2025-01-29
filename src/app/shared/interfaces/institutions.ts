export interface Country {
	id: number;
	name: string;
}

export interface Institution {
	id: number;
	name: string;
	country: string;
}

export interface School {
	id: number;
	school: string;
	institution: string;
}

export interface Department {
	id: number;
	department: string;
	city: string;
	school: string;
	institution: string;
}
