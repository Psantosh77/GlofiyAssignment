import React, { useEffect, useState } from 'react'
import TaskListComponent from './taskList'
import axios from "axios"
import dayjs from 'dayjs';

const TasklistIndex = () => {
    const [data, setData] = useState();

    const [personName, setPersonName] = React.useState([]);
    const [message, setMessage] = React.useState("");
    const [assignName, setAssignName] = React.useState();
    const [assignTo, setAssignTo] = React.useState();
    const [dueDate, setDueDate] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [userData, setUserData] = React.useState();

    console.log(message)
    console.log(assignName)
    console.log(dueDate)


    const handleMessage = (event) => {
        setMessage(event.target.value)
    }

    const handleChange = (event) => {
        setAssignName(event.target.value);
    };

    const handleAssignTo = (event) => {
        setAssignTo(event.target.value)
    }

    const handleDate = (newValue) => {
        setDueDate(newValue)
    }



    const getAllTask = async () => {
        const config = {
            headers: {
                "AuthToken": "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a"
            }
        };
        const res = await axios.get("https://devza.com/tests/tasks/list", config)
            .then((res) => { setData(res.data.tasks) }).catch((err) => console.log('get api not working'))

    };

    const DeleteTask = async (id) => {
        console.log(id)

        var bodyFormData = new FormData();
        bodyFormData.append("taskid", id.toString());

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "AuthToken": "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a"
            }

        };
        const res = await axios.post("https://devza.com/tests/tasks/delete", bodyFormData, config)
            .then((res) => { getAllTask() }).catch((err) => console.log('get api not working'))

    };


    const UpdateTask = async () => {

        // const req = {
        //     message: message,
        //     due_date: dueDate,
        //     priority: assignTo,
        //     assigned_to: assignName,

        // }

        var bodyFormData = new FormData();
        bodyFormData.append("message", message);
        bodyFormData.append("due_date", dueDate);
        bodyFormData.append("priority", assignTo);
        bodyFormData.append("assigned_to", assignName);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "AuthToken": "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a"
            }
        };
        const res = await axios.post("https://devza.com/tests/tasks/create", bodyFormData, config)
            .then((res) => getAllTask()).catch((err) => console.log('get api not working'))


    };


    useEffect(() => {
        getAllTask()
    }, [])

    return (
        <>
            <TaskListComponent
                data={data}
                DeleteTask={DeleteTask}
                UpdateTask={UpdateTask}
                handleMessage={handleMessage}
                handleChange={handleChange}
                handleAssignTo={handleAssignTo}
                handleDate={handleDate}
                message={message}
                assignName={assignName}
                assignTo={assignTo}
                dueDate={dueDate}
            />
        </>
    )
}

export default TasklistIndex