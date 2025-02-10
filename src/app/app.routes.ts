import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { notAuthGuard } from './shared/guards/not-auth.guard';
import { authGuard } from './shared/guards/auth.guard';
import { NewsDepartmentComponent } from './components/news-department/news-department.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AnnouncementsFrameComponent } from './components/announcements/announcements-frame/announcements-frame.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { InstitutionsComponent } from './components/institutions/institutions.component';

export const routes: Routes = [
	{
		path: '',
		component: LandingPageComponent,
		canActivate: [notAuthGuard],
	},
	{
		path: 'login',
		component: UserLoginComponent,
		canActivate: [notAuthGuard],
	},
	{
		path: 'register',
		component: UserRegisterComponent,
		canActivate: [notAuthGuard],
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
				path: 'news/:departmentId',
				component: NewsDepartmentComponent,
			},
			{
				path: 'institutions',
				component: InstitutionsComponent,
			},
		],
	},
	{
		path: 'account',
		component: AccountPageComponent,
		canActivate: [authGuard],
		children: [
			{
				path: 'personal-info',
				component: PersonalInfoComponent,
			},
			{
				path: 'settings',
				component: AccountSettingsComponent,
			},
		],
	},
];
