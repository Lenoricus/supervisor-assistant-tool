import React, {useEffect} from 'react';

import {Header} from '../components';
import {useStateContext} from "../contexts/ContextProvider";
import {fetchUsers} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {EMPLOYEES_ROUTE, TASKS_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

const Employees = observer(() => {
    const {user} = useStateContext()
    const navigate = useNavigate()

    useEffect(() => {
        fetchUsers().then(data => user.setEmployees(data))
    }, []);

  return (
      <div
          className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl border-solid drop-shadow-xl">
          <Header category="Страница" title="Сотрудники"/>
          <div className="rounded-lg overflow-hidden w-full h-full flex justify-center items-center overflow-x-auto">
              <table className="h-full w-full text-center text-sm">
                  <thead
                      className="h-[3rem] w-full md:w-3/4 bg-slate-300 dark:bg-gray-600 p-4 text-center text-dark-gray dark:text-gray-200">
                  <tr>
                      <th>ID</th>
                      <th>Фамилия</th>
                      <th>Имя</th>
                      <th>Отчество</th>
                      <th>Права доступа</th>
                      <th>Почта</th>
                  </tr>
                  </thead>
                  <tbody className="w-full md:w-1/4 bg-light-gray dark:bg-gray-500 p-4 text-center text-gray-700 dark:text-gray-300 divide-y divide-slate-300 dark:divide-gray-600">
                  {user.employees.map(employee => (
                      <tr key={employee.id}  onClick={() => navigate(EMPLOYEES_ROUTE + '/' + employee.id)}
                          className="hover:text-gray-400 dark:hover:text-gray-100 cursor-pointer">
                          <td>
                              <div
                                  className="my-1">
                                  {employee.id}
                              </div>
                          </td>
                          <td>
                              <div
                                  className="my-1 overflow-hidden whitespace-nowrap text-ellipsis">
                                  {employee.secondName}
                              </div>
                          </td>
                          <td>
                              <div
                                  className="my-1">
                                  {employee.firstName}
                              </div>
                          </td>
                          <td className="">
                              <div
                                  className="my-1 overflow-hidden whitespace-nowrap text-ellipsis">
                                  {employee.patronymic}
                              </div>
                          </td>
                          <td>
                              <div
                                  className="my-1">
                                  {employee.access_rights}
                              </div>
                          </td>
                          <td>
                              <div
                                  className="my-1">
                                  {employee.email}
                              </div>
                          </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          </div>
      </div>
  );
});
export default Employees;
