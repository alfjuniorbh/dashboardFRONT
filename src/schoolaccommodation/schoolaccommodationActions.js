import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import { browserHistory } from 'react-router';
import { showTabs, selectTab } from '../common/tab/tabActions';
import { token } from '../auth/authActions';
import consts from '../main/consts';
const BASE_URL = consts.API_URL;
const INITIAL_VALUES = {};

//list all register
export function getList(){
	const request = axios.get(`${BASE_URL}/school-accommodations`, {"headers": {"authorization": "Bearer "+token()}});
	return {
		type: 'LIST_SCHOOLACCOMMODATION_FETCHED',
		payload: request
	};
}
//get by id
export function getSchoolAccommodationByID(id){
	const request = axios.get(`${BASE_URL}/school-accommodations/${id}`, {"headers": {"authorization": "Bearer "+token()}});
	return {
		type: 'FILTER_SCHOOLACCOMMODATION_FETCHED',
		payload: request
	};
}

//create new register
export function create(values){
	return submit(values, 'post');
}
//update
export function update(values){
	return submit(values, 'put');
}
//remove
export function remove(values){
	return submit(values, 'delete');
}
function submit(values, method){
	return dispatch => {
		const id = values.id ? values.id : '';
		const url = method === 'post' ? `${BASE_URL}/school-accommodations` : `${BASE_URL}/school-accommodations/${id}`; 
		const request = axios[method](url, values, {"headers": {"authorization": "Bearer "+token()}})
			.then(resp => {
				toastr.success('Success', 'Operation performed successfully!');
				dispatch(init());
			})
			.catch(e => {
				for (let error of Object.values(e.response.data.errors)) {
					toastr.error('Error', error[0]);
				}
			});
	};
}
export function showCreate(){
	return [
		initialize('schoolAccommodationForm', {}),
	];
}
//show update
export function showUpdate(school){	
	return [
		showTabs('tabUpdate', 'tabUpdate'),
		selectTab('tabUpdate'),
		initialize('schoolAccommodationForm', school)
	];
}

//show delete
export function showDelete(school){
	return [
		showTabs('tabDelete'),
		selectTab('tabDelete'),
		initialize('schoolAccommodationForm', school)		
	];
}

//initial
export function init(){
	return [
		initialize('schoolAccommodationForm', INITIAL_VALUES),
		browserHistory.goBack
	];
}