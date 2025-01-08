import { Component } from '@angular/core';
import { Announcement } from '../../../shared/interfaces/announcement';
import { AnnouncementComponent } from '../announcement/announcement.component';

@Component({
	selector: 'app-announcements-frame',
	imports: [AnnouncementComponent],
	templateUrl: './announcements-frame.component.html',
	styleUrl: './announcements-frame.component.css',
})
export class AnnouncementsFrameComponent {
	announcements: Announcement[] = [
		{
			title: 'Title 1',
			date: '25/12/2024',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos recusandae aliquam veritatis exercitationem, itaque quaerat dolorum aut excepturi, molestiae unde molestias nam quasi harum ea quibusdam accusantium porro atque officia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia perferendis ad ipsa impedit blanditiis et velit doloribus sequi vitae quasi, facere incidunt! Exercitationem, ipsa nobis? Sed maxime labore repellendus consequuntur culpa est beatae voluptatum, nulla dolores vel sequi atque eos!',
			source: 'AUEB',
			id: '',
		},
		{
			title: 'Title 2',
			date: '25/12/2024',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos recusandae aliquam veritatis exercitationem, itaque quaerat dolorum aut excepturi, molestiae unde molestias nam quasi harum ea quibusdam accusantium porro atque officia.',
			source: 'AUEB',
			id: '',
		},
		{
			title: 'Title 3',
			date: '25/12/2024',
			content:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos recusandae aliquam veritatis exercitationem, itaque quaerat dolorum aut excepturi, molestiae unde molestias nam quasi harum ea quibusdam accusantium porro atque officia. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia perferendis ad ipsa impedit blanditiis et velit doloribus sequi vitae quasi, facere incidunt! Exercitationem, ipsa nobis? Sed maxime labore repellendus consequuntur culpa est beatae voluptatum, nulla dolores vel sequi atque eos!',
			source: 'AUEB',
			id: '',
		},
	];
}
