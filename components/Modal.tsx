import axios from 'axios';
import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as data from "../env.json";

type taskType = {
    _id: string,
    task: string,
    completed: boolean,
}

type Props = {
    editTask: taskType,
    setEditTask: React.Dispatch<React.SetStateAction<taskType>>,
    setTasks: React.Dispatch<React.SetStateAction<any>>,
    editModal: boolean,
    setEditModal: React.Dispatch<React.SetStateAction<boolean>>,
}

function Modal({ editTask, setEditTask, setTasks, setEditModal, editModal }: Props) {

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
                completed: false,
            }
        })
            .then(function (res) {
                getTasks();
                setEditModal(false);
                notify("success", "Task updated");
            })
            .catch(function (error) {
                console.log(error);
                notify("error", "Some error occurred");
            });
    }

    return (
        <>
            <div className={`${editModal ? "" : "hidden"} w-screen h-screen absolute bg-black flex justify-center items-center opacity-50`}>
                <div className="hidden">hidden data</div>
            </div>

            <div className={`${editModal ? "" : "hidden"} rounded-xl w-80 p-4 absolute`}>
                <div className="flex justify-between">
                    <h2 className="font-semibold">Edit Task</h2>
                    <MdOutlineCancel className="cursor-pointer" onClick={() => { setEditModal(false) }} />
                </div>
                <hr className="my-2" />
                <div>
                    <textarea value={editTask.task} onChange={(e) => {
                        setEditTask({ ...editTask, task: e.target.value })
                    }} id="rounded-email" className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Edit details" />
                    <button onClick={() => updateTask(editTask._id, editTask.task, editTask.completed)} className="py-2 my-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                        Update
                    </button>
                </div>
            </div>

        </>
    )
}

export default Modal;