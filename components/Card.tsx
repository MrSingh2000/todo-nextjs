import React, { useState, useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import * as data from "../env.json";
import axios from "axios";
import { toast } from 'react-toastify';

type taskType = {
    _id: string,
    task: string,
    completed: boolean,
  }

type Props = {
    editTask: taskType,
    setEditTask: React.Dispatch<React.SetStateAction<taskType>>
    tasks: {
        _id: string,
        task: string, 
        completed: boolean
    }[],
    setTasks: React.Dispatch<React.SetStateAction<any>>,
    setEditModal: React.Dispatch<React.SetStateAction<boolean>>,
    editModal: boolean
}

export default function Card({ setEditTask, tasks, setTasks, setEditModal }: Props) {

    const [newTask, setNewTask] = useState("");

    const notify = (type: string, message: string): void => {
        if (type === "error")
            toast.error(message);
        else if (type === "success")
            toast.success(message);
    }

    const getTasks = (): void => {
        axios({
            method: 'GET',
            url: `${data.BACKEND_URL}/api/task/new`,
        })
            .then(function (response) {
                setTasks(response.data.tasks);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const updateTask = (id: string, task: string, completed: boolean) => {
        axios({
            method: 'PUT',
            url: `${data.BACKEND_URL}/api/task/post/${id}`,
            data: {
                task,
                completed: !completed,
            }
        })
            .then(function (res) {
                getTasks();
                notify("success", "Task updated");
            })
            .catch(function (error) {
                console.log(error);
                notify("error", "Some error occurred");
            });
    }

    const deleteTask = (id: string): void => {
        axios({
            method: 'DELETE',
            url: `${data.BACKEND_URL}/api/task/post/${id}`,
        })
            .then(function (res) {
                getTasks();
                notify("success", "Task Deleted");
            })
            .catch(function (error) {
                console.log(error);
                notify("error", "Some Error occurred");
            });
    }

    const validateData = (): boolean => {
        if (newTask !== "") {
            return true;
        }
        notify("error", "Invalid Task");
        return false;
    }

    const addTask = (task: string) => {
        if (validateData())
            axios({
                method: 'POST',
                url: `${data.BACKEND_URL}/api/task/new`,
                data: {
                    task,
                    completed: false,
                }
            })
                .then(function (res) {
                    getTasks();
                    setNewTask("");
                    notify("success", "New task added");
                })
                .catch(function (error) {
                    console.log(error);
                    notify("error", "Some Error occurred");
                });
    }

    useEffect(() => {
        getTasks();
    }, [])


    return (
        <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <div className="p-2">
                <p className="text-center font-semibold">Create a New Task</p>

                <div className="relative my-2">
                    <textarea onChange={(e) => { setNewTask(e.target.value) }} value={newTask} id="rounded-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="task details here" />
                </div>


                {/* <div className=" relative ">
                    <input type="text" id="rounded-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Your email" />
                </div> */}


                <button onClick={() => addTask(newTask)} className="py-2 my-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Add
                </button>


            </div>

            <div className="flex items-center px-6 py-3 bg-gray-900">
                <svg aria-label="headphones icon" className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17 21C15.8954 21 15 20.1046 15 19V15C15 13.8954 15.8954 13 17 13H19V12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12V13H7C8.10457 13 9 13.8954 9 15V19C9 20.1046 8.10457 21 7 21H3V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V21H17ZM19 15H17V19H19V15ZM7 15H5V19H7V15Z" />
                </svg>

                <h1 className="mx-3 text-lg font-semibold text-white">TODO</h1>
            </div>

            <div className="px-6 py-4 h-80 overflow-scroll hidescroll">
                <div className="container flex flex-col mx-auto w-full items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
                    <ul className="flex flex-col divide divide-y">
                        {tasks.map((item: { _id: string, task: string, completed: boolean }) => {
                            return (

                                <li key={item._id} className="flex flex-row">
                                    <div className="select-none cursor-pointer flex flex-1 items-center p-4">
                                        <div className={`flex flex-col w-48 ${item.completed ? "bg-green-300 border-2 rounded-lg" : ""} max-h-30 overflow-hidden justify-center mr-4`}>
                                            {/* <div className="font-bold text-left bg-red-500">
                                                task.task
                                            </div> */}
                                            <div className="text-left w-full">
                                                {item.task}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="w-24 flex justify-evenly">
                                                <button className="w-fit text-right flex justify-end">
                                                    <AiOutlineEdit size={20} onClick={() => {setEditModal(true); setEditTask(item)}}/>
                                                </button>
                                                <button className="w-fit text-right flex justify-end">
                                                    <AiOutlineDelete onClick={() => {deleteTask(item._id)}} size={20} />
                                                </button>
                                                <input type="checkbox" checked={item.completed} onChange={() => updateTask(item._id, item.task, item.completed)} />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>

            </div>
        </div>
    )
}