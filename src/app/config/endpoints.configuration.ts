export const apiBaseURL: string = localStorage.getItem('apiURL');
export const apiURL: string = `${apiBaseURL}/api`;

export const clientId: number = Number(localStorage.getItem('clientId'));
export const clientSecret: string = localStorage.getItem('clientSecret');

export const inputsURL: string = 'inputs';
export const productsURL: string = 'products';
export const providersURL: string = 'providers';
export const outputsURL: string = 'outputs';
export const usersURL: string = 'users';
