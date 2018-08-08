import * as EmployeeActionTypes from './EmployeeActionTypes';
import Axios from 'axios';


export const list = employees => {
    return {
      type: EmployeeActionTypes.LIST,
      employees: employees,
    };
  };
  
  export const get = employee => {
    return {
      type: EmployeeActionTypes.GET,
      employee: employee,
    };
  };

  const apiUrl = '/api/users';

  const url = employeeId => {
      let url = apiUrl;
      if (employeeId) {
          url += '/' + employeeId;
      }
      return url;
  }

  export const listEmployees = () => {
      return dispatch => {
          return Axios.get(url())
            .then(response => {
                dispatch(list(response.data));
                console.log('Employees retrieved.');
            })
            .catch(error => {
                console.log('Error attempting to retrieve employees', error);
            });
      };
  };

  export const getEmployee = id => {
      return dispatch => {
          return Axios.get(url(id))
            .then(res => {
                dispatch(get(res.data));
                return true;
            })
            .catch(err => {
                console.log('There was an error getting the employee', err);
            })
      }
  }

  export const updateEmployee = employee => {
      return dispatch => {
          return Axios.put(url(employee._id), employee)
            .then(res => {
                dispatch(get(res.data));
                console.log('Employee: ' + employee.name + ', updated');
                return true;
            })
            .catch(error => {
                console.log('There was an error updating employee, bozo!');
            });
      };
  };

  export const removeEmployee = employee => {
      return dispatch => {
          employee.deleted = true;

          return Axios.put(url(employee._id), employee)
            .then(res => {
                dispatch(get(res.data));
                console.log('Employee: ' + res.data.name + ', was deleted');
            })
            .catch(error => {
                console.error('Error attempting to delete employee.', error);
            });
      };
  };

  export const restoreEmployee = employee => {
      return dispatch => {
          employee.deleted = false;

          return Axios.put(url(employee._id), employee)
            .then(res => {
                dispatch(get(res.data));
                console.log('Employee: ' + res.data.name + ', was restored.');
                return true;
            })
            .catch(error => {
                console.log('Error attempting to restore employee', error);
            });
      };

  };

  export const createEmployee = employee => {
      return dispatch => {
          return Axios.put(url(), employee)
            .then(res => {
                dispatch(get(res.data));
                console.log('Employee: ' + res.data.name + ', created');
            })
            .catch(error => {
                console.log('There was an error creating employee.');
            });
      };
  };
