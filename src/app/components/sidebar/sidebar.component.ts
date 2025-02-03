import { Component, inject, Input } from '@angular/core';
import { MenuItem } from '../../shared/interfaces/menu-item';
import { RouterLink } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { InstitutionService } from '../../shared/services/institution.service';
import { SubscriptionDetails } from '../../shared/interfaces/institutions';

@Component({
	selector: 'app-sidebar',
	imports: [RouterLink],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
	userService = inject(UserService);
	institutionService = inject(InstitutionService);

	@Input() title: string | undefined;
	@Input() items: MenuItem[] | undefined;

	deleteSubscription(departmentId: string) {
		const departmentIdNum: number = +departmentId;
		const subscription: SubscriptionDetails = {
			userId: this.userService.user()?.id as unknown as number,
			departmentId: departmentIdNum,
		};
		this.institutionService.unsubscribeFromDepartment(subscription).subscribe({
			next: (data) => {
				console.log(data);
			},
			error: (err) => {
				console.log(err);
			},
		});
	}
}
