import { OrganizationBasic } from '../vo.entity';

export class Employee {
	type: string = 'profile';
	subtype: string = 'employee';
	email: string;
	password: string;
	org: OrganizationBasic;
}

export interface EmployeeBasic {
	id: string;
}
