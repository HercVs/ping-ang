import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { authGuard } from './shared/guards/auth.guard';
import { NewsDepartmentComponent } from './components/news-department/news-department.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AnnouncementsFrameComponent } from './components/announcements/announcements-frame/announcements-frame.component';

export const routes: Routes = [
	{
		path: '',
		component: LandingPageComponent,
	},
	{
		path: 'login',
		component: UserLoginComponent,
	},
	{
		path: 'register',
		component: UserRegisterComponent,
	},
	{
		path: 'home',
		component: MainPageComponent,
		canActivate: [authGuard],
		children: [
			{
				path: '',
				component: AnnouncementsFrameComponent,
			},
			{
				path: ':departmentId', // TODO name instead ?
				component: NewsDepartmentComponent,
			},
		],
	},
];
