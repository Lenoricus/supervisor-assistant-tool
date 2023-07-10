import React, {useEffect} from 'react';
import {Fragment, useRef, useState} from 'react'
import {Dialog, Transition, Listbox} from '@headlessui/react'
import {useStateContext} from "../../contexts/ContextProvider"
import {Button} from "../index"
import {CheckIcon, ChevronUpDownIcon, ExclamationTriangleIcon} from "@heroicons/react/20/solid";
import {createTeam} from "../../http/teamAPI";
import {observer} from "mobx-react-lite";
import {deleteProject} from "../../http/projectAPI";
import {PROJECT_ROUTE} from "../../utils/consts";
import {useNavigate, useParams} from "react-router-dom";

const DeleteProject = observer(({show, onHide}) => {
	const {currentColor} = useStateContext();
	const cancelButtonRef = useRef(null)

	const {id} = useParams()

	const navigate = useNavigate()
	const delProject = async () => {
		let data;
		data = await deleteProject(id)
		navigate(PROJECT_ROUTE)
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
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
									<div className="sm:flex sm:items-start">
										<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
											<ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
										</div>
										<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
											<Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
												Предупреждение
											</Dialog.Title>
											<div className="mt-2">
												<p className="text-sm text-gray-500">
													Вы уверены, что хотите удалить этот проект?
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
									<div onClick={delProject}>
										<Button
											color="white"
											bgColor={currentColor}
											text="Удалить"
											borderRadius="10px"
											width="100px"
										/>
									</div>
									<div onClick={onHide} className="pr-3">
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

export default DeleteProject;