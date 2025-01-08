import { Component, Input } from '@angular/core';
import { Announcement } from '../../../shared/interfaces/announcement';

@Component({
	selector: 'app-announcement',
	imports: [],
	templateUrl: './announcement.component.html',
	styleUrl: './announcement.component.css',
})
export class AnnouncementComponent {
	@Input() announcement: Announcement | undefined;
}
