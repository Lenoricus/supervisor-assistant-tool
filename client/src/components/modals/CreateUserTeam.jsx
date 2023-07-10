import React, {useEffect} from 'react';
import {Fragment, useRef, useState} from 'react'
import {Dialog, Transition, Listbox} from '@headlessui/react'
import {useStateContext} from "../../contexts/ContextProvider"
import {Button} from "../index"
import {fetchTeams, fetchUsers, fetchQualifications, fetchRoles, createUserTeam} from "../../http/userTeamAPI";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router-dom";

const CreateUserTeam = observer(({show, onHide}) => {
	const {userTeam, currentColor} = useStateContext();
	const cancelButtonRef = useRef(null)
	const {id} = useParams()
	let teamId = parseInt(id)

	useEffect(() => {
		fetchTeams().then(data => userTeam.setTeams(data))
		fetchRoles().then(data => userTeam.setRoles(data))
		fetchUsers().then(data => userTeam.setUsers(data))
		fetchQualifications().then(data => userTeam.setQualifications(data))
	}, [])

	const addUserTeam = async () => {
		let data;
		data = await createUserTeam(userTeam.selectedUser.id, teamId, userTeam.selectedRole.id, userTeam.selectedQualification.id)
		onHide()
		userTeam.setSelectedUser([])
		userTeam.setSelectedRole([])
		userTeam.setSelectedQualification([])
	}

	const cleanData = () => {
		onHide()
		userTeam.setSelectedUser([])
		userTeam.setSelectedRole([])
		userTeam.setSelectedQualification([])
	}

	return (
		<Transition.Root show={show} as={Fragment}>
			<Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={onHide}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel
								className="relative transform overflow-hidden bg-white dark:bg-black rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<div className="pr-4">
										<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
											<Dialog.Title as="h3"
														  className="text-base font-semibold leading-6 text-gray-900">
												Добавить участника в команду
											</Dialog.Title>
											<div className="mt-2">
												<form>
													<div className="mb-6">
														<label htmlFor="text"
															   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															ФИО
														</label>
														<Listbox value={userTeam.selectedUser.secondName}
																 onChange={userTeam.setSelectedUser.secondName}>
															<div className="relative mt-1">
																<Listbox.Button
																	className="text-left bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
																		<span
																			className="block truncate">{`${userTeam.selectedUser.secondName || ''} ${userTeam.selectedUser.firstName || ''} ${userTeam.selectedUser.patronymic || ''}`.trim() || "Выберите сотрудника"}</span>
																	<span
																		className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
																			<ChevronUpDownIcon
																				className="h-5 w-5 text-gray-400"
																				aria-hidden="true"
																			/>
            															</span>
																</Listbox.Button>
																<Listbox.Options
																	className="z-10 absolute mt-1 max-h-[10rem] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
																	{userTeam.users.map(user => (
																		<Listbox.Option
																			onClick={() => userTeam.setSelectedUser(user)}
																			key={user.id}
																			className={({selected}) =>
																				`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
																					selected ? 'bg-gray-100 text-gray-900' : 'text-gray-900 hover:bg-gray-100'
																				}`
																			}
																			value={user}
																		>
																			{({selected}) => (
																				<>
																							<span
																								className={`block truncate ${
																									selected ? 'font-medium' : 'font-normal'
																								}`}
																							>
																								{`${user.secondName} ${user.firstName} ${user.patronymic}`}
																							</span>
																					{selected ? (
																						<span
																							className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900">
																									<CheckIcon
																										className="h-4 w-4"
																										aria-hidden="true"/>
																								</span>
																					) : null}
																				</>
																			)}
																		</Listbox.Option>
																	))}
																</Listbox.Options>
															</div>
														</Listbox>
													</div>
													<div className="mb-6">
														<label htmlFor="text"
															   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Квалификация
														</label>
														<Listbox value={userTeam.selectedQualification.title}
																 onChange={userTeam.setSelectedQualification.title}>
															<div className="relative mt-1">
																<Listbox.Button
																	className="text-left bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
																		<span
																			className="block truncate">{userTeam.selectedQualification.title || "Выберите квалификацию"}</span>
																	<span
																		className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
																			<ChevronUpDownIcon
																				className="h-5 w-5 text-gray-400"
																				aria-hidden="true"
																			/>
            															</span>
																</Listbox.Button>
																<Listbox.Options
																	className="z-10 absolute mt-1 max-h-[10rem] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
																	{userTeam.qualifications.map(qualification => (
																		<Listbox.Option
																			onClick={() => userTeam.setSelectedQualification(qualification)}
																			key={qualification.id}
																			className={({selected}) =>
																				`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
																					selected ? 'bg-gray-100 text-gray-900' : 'text-gray-900 hover:bg-gray-100'
																				}`
																			}
																			value={qualification}
																		>
																			{({selected}) => (
																				<>
																							<span
																								className={`block truncate ${
																									selected ? 'font-medium' : 'font-normal'
																								}`}
																							>
																								{qualification.title}
																							</span>
																					{selected ? (
																						<span
																							className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900">
																									<CheckIcon
																										className="h-4 w-4"
																										aria-hidden="true"/>
																								</span>
																					) : null}
																				</>
																			)}
																		</Listbox.Option>
																	))}
																</Listbox.Options>
															</div>
														</Listbox>
													</div>
													<div className="mb-6">
														<label htmlFor="text"
															   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Роль
														</label>
														<Listbox value={userTeam.selectedRole.title}
																 onChange={userTeam.setSelectedRole.title}>
															<div className="relative mt-1">
																<Listbox.Button
																	className="text-left bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
																		<span
																			className="block truncate">{userTeam.selectedRole.title || "Выберите роль"}</span>
																	<span
																		className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
																			<ChevronUpDownIcon
																				className="h-5 w-5 text-gray-400"
																				aria-hidden="true"
																			/>
            															</span>
																</Listbox.Button>
																<Listbox.Options
																	className="h-[6rem] z-10 absolute mt-1 max-h-[10rem] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
																	{userTeam.roles.map(role => (
																		<Listbox.Option
																			onClick={() => userTeam.setSelectedRole(role)}
																			key={role.id}
																			className={({selected}) =>
																				`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
																					selected ? 'bg-gray-100 text-gray-900' : 'text-gray-900 hover:bg-gray-100'
																				}`
																			}
																			value={role}
																		>
																			{({selected}) => (
																				<>
																							<span
																								className={`block truncate ${
																									selected ? 'font-medium' : 'font-normal'
																								}`}
																							>
																								{role.title}
																							</span>
																					{selected ? (
																						<span
																							className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900">
																									<CheckIcon
																										className="h-4 w-4"
																										aria-hidden="true"/>
																								</span>
																					) : null}
																				</>
																			)}
																		</Listbox.Option>
																	))}
																</Listbox.Options>
															</div>
														</Listbox>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
								<div
									className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 flex space-x-4">
									<div onClick={addUserTeam}>
										<Button
											color="white"
											bgColor={currentColor}
											text="Добавить"
											borderRadius="10px"
											width="100px"
										/>
									</div>
									<div onClick={cleanData} className="pr-3">
										<Button
											color="black"
											bgColor="transparent"
											text="Отмена"
											borderRadius="10px"
											width="100px"
										/>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
});

export default CreateUserTeam;