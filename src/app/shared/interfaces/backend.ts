import { JwtPayload } from 'jwt-decode';

export interface User {
	username: string;
	id: string;
}

export interface Credentials {
	username: string;
	password: string;
}

/**
 * Calling jwtDecode(token) returns an object of the JwtPayload type by default,
 * therefore unable to access non-standard properties like user id & role.
 * Custom & explicit return type required.
 */
export interface CustomJwtPayload extends Partial<JwtPayload> {
	uid?: string;
	role?: string;
}
