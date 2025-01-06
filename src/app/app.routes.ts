import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { authGuard } from './shared/guards/auth.guard';
import { NewsGeneralComponent } from './components/news-general/news-general.component';
import { NewsDepartmentComponent } from './components/news-department/news-department.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

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
				component: NewsGeneralComponent,
			},
			{
				path: ':departmentId', // TODO name instead ?
				component: NewsDepartmentComponent,
			},
		],
	},
];
