import { Component, Input } from '@angular/core';
import { MenuItem } from '../../shared/interfaces/menu-item';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-sidebar',
	imports: [RouterLink],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
	@Input() title: string | undefined;
	@Input() items: MenuItem[] | undefined;
}
