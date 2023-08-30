import PocketBase, { ClientResponseError } from 'pocketbase'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useStoreActions } from '../store/hooks';
const baseURL = 'https://sam-school-app.pockethost.io'

// Define the type for the query parameters

interface QueryParameters {
  page?: number;
  perPage?: number;
  sort?: string;
  filter?: string;
  expand?: string;
  fields?: string;
  skipTotal?: boolean;
}
interface AuthResponse {
  token: string;
  record: {
    id: string;
    // Add other fields based on your response data structure
  };
}

// Function to get the token from localStorage
export function getTokenFromLocalStorage(): any {
  const savedToken = localStorage.getItem('accessTokenSam');
  
  if (!savedToken) {
    return false
    // throw new Error('Access token not found in localStorage.');
  }
  const token = JSON.parse(savedToken)
  return token ;
}

export function logOut(): void {
  localStorage.removeItem('accessTokenSam');
}


// Function to make a request to the API
async function makeRequest<T>(config: AxiosRequestConfig, withToken: boolean = true): Promise<T> {
  try {
    if (withToken) {
      const {token} = getTokenFromLocalStorage();
      if(!token) throw new Error('Access token not found in localStorage.');
      
      config.headers = { Authorization: `Bearer ${token}` };
    }
    const response: AxiosResponse<T> = await axios(config);
    return response.data;
  } catch (error:any) {
    throw new Error(error.message || 'API request failed.');
  }
}

// Function to get records from a collection
export async function getRecords<T>(collectionIdOrName: string, queryParams: QueryParameters = {}): Promise<T> {
  const url = `${baseURL}/api/collections/${collectionIdOrName}/records`;
  const config: AxiosRequestConfig = {
    method: 'GET',
    url,
    params: queryParams,
  };
  return await makeRequest<T>(config);
}

// Function to get a specific record by ID from a collection
export async function getRecordById<T>(collectionIdOrName: string, recordId: string, queryParams: QueryParameters = {}): Promise<T> {
  const url = `${baseURL}/api/collections/${collectionIdOrName}/records/${recordId}`;
  const config: AxiosRequestConfig = {
    method: 'GET',
    url,
    params: queryParams,
  };
  return await makeRequest<T>(config);
}

// Function to delete a single record in a collection
export async function deleteRecordBy<T>(collectionIdOrName: string, recordId: string): Promise<T> {
  const url = `${baseURL}/api/collections/${collectionIdOrName}/records/${recordId}`;
  const config: AxiosRequestConfig = {
    method: 'DELETE',
    url,
  };
  return await makeRequest<T>(config);
}

// Function to create a new record in a collection
export async function createRecord<T>(collectionIdOrName: string, data: any, params: QueryParameters = {}): Promise<T> {
  const url = `${baseURL}/api/collections/${collectionIdOrName}/records`;
  const config: AxiosRequestConfig = {
    method: 'POST',
    url,
    data,
    params
  };
  // console.log(data);
  
  return await makeRequest<T>(config);
}

// Function for authenticating with a password
async function login(collectionIdOrName: string, identity: string, password: string): Promise<any> {
  const url = `${baseURL}/api/collections/${collectionIdOrName}/auth-with-password`;
  const data = {
    identity,
    password,
  };
  const config: AxiosRequestConfig = {
    method: 'POST',
    url,
    data,
  };

  try {
    const response = await makeRequest<AuthResponse>(config, false); // Pass false to skip token header
    const { token, record } = response;
    saveTokenToLocalStorage(token, record);
    return response;
  } catch (error:any) {
    throw new Error(error.response?.data?.error || 'Authentication failed.');
  }
}

export async function createAccount<T>(collectionIdOrName: string, data: any, params: QueryParameters = {}): Promise<T> {
  const url = `${baseURL}/api/collections/${collectionIdOrName}/records`;
  const config: AxiosRequestConfig = {
    method: 'POST',
    url,
    data,
    params
  };
  
  return await makeRequest<T>(config, false);
}


// Function for authenticating with a password or refreshing token if needed
export async function authenticate(collectionIdOrName: string, identity: string, password: string): Promise<any> {
  const existingToken = getTokenFromLocalStorage() || null;
  
  if (existingToken) {
      try {
    const parsedToken = JSON.parse(existingToken)
      let {newToken} = await refreshAccessToken(parsedToken.token);
      return newToken
    } catch (error) {
      // Token refresh failed, log out the user and attempt to authenticate with the password again
      logOut();
    }
  }

  return await login(collectionIdOrName, identity, password);
}

// Function for authenticating with a password or refreshing token if needed
export async function refreshAccessToken(token: string): Promise<any> {
  const url = `${baseURL}/api/collections/users/auth-refresh`;
  const config: AxiosRequestConfig = {
    method: 'POST',
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await makeRequest<AuthResponse>(config);
    const { token: newToken, record } = response;
    saveTokenToLocalStorage(newToken, record);
    return response;
  } catch (error:any) {
    throw new Error(error.message || 'Token refresh failed.');
  }
}


// Function to save the token in localStorage
function saveTokenToLocalStorage(token: string, record:any): void {
  localStorage.setItem('accessTokenSam', JSON.stringify({token, record}));
}