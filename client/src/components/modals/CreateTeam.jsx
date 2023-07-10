import React, {useEffect} from 'react';
import {Fragment, useRef, useState} from 'react'
import {Dialog, Transition, Listbox} from '@headlessui/react'
import {useStateContext} from "../../contexts/ContextProvider"
import {Button} from "../index"
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import {createTeam} from "../../http/teamAPI";
import {observer} from "mobx-react-lite";

const CreateTeam = observer(({show, onHide}) => {
	const {currentColor} = useStateContext();
	const cancelButtonRef = useRef(null)

	const [title, setTitle] = useState('')

	const addTeam = async () => {
		let data;
		data = await createTeam(title)
		onHide()
		setTitle('')
	}

	const cleanData = () => {
		onHide()
		setTitle('')
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
												Создать новую команду
											</Dialog.Title>
											<div className="mt-2">
												<form>
													<div className="mb-6">
														<label
															className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
															Название
														</label>
														<input type="text" id="text"
															   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
															   required
															   autoComplete="off"
															   value={title}
															   onChange={e => setTitle(e.target.value)}>
														</input>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
								<div
									className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 flex space-x-4">
									<div onClick={addTeam}>
										<Button
											color="white"
											bgColor={currentColor}
											text="Создать"
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

export default CreateTeam;