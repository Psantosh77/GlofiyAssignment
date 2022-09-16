import { Typography, TextField, Autocomplete, Button, InputLabel, MenuItem, Checkbox, Select, OutlinedInput, ListItemText } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Box } from '@mui/system'
import React,{useEffect} from 'react'
import dayjs from 'dayjs';
import axios from "axios"


const style = {
    Box: {
        border: "1px solid red",
        width: "30%",
        p: 2,
    },
    FormDiv: {
        marginTop: "10%",
    },
    TextField: {
        width: "100%",
        marginTop: "10%"
    },
    Button: {
        margin: "10% auto"

    }


}

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
        label: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        label: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    }

];

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const CreateTaskComponent = (props) => {

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

    const CreateTask = async () => {

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
            .then((res) =>"" ).catch((err) => console.log('get api not working'))


    };

    const getAllUser = async () => {
        const config = {
            headers: {
                "AuthToken": "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a"
            }
        };
        const res = await axios.get("https://devza.com/tests/tasks/listusers", config)
            .then((res) => { setUserData(res.data.users) }).catch((err) => console.log('get api not working'))

    };

    useEffect(() => {
        getAllUser()
    }, [])


    return (
        <Box sx={style.Box}>
            <Typography variant='h5'>Create Task</Typography>
            <div style={style.FormDiv}>
                <TextField

                    sx={style.TextField}
                    size='small'
                    id="outlined-required"
                    label="Task"
                    onChange={handleMessage}
                    name="message"
                    value={message}
                />
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="assignedName"
                    value={assignName || "Assign To"}
                    label="Assign To"
                    sx={style.TextField}
                    onChange={handleChange}
                >

                    {
                        userData?.map((user)=>(
                            <MenuItem value={user.name}>{user.name} <img src={user.picture}/> </MenuItem>
                        ))
                    }
                   
                    
                </Select>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="assignedName"
                    value={assignTo}
                    label="Age"
                    sx={style.TextField}
                    onChange={handleAssignTo}
                >
                    <MenuItem value={1}>High</MenuItem>
                    <MenuItem value={2}>Medium</MenuItem>
                    <MenuItem value={3}>Low</MenuItem>
                </Select>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3} sx={style.TextField}>
                        <DesktopDatePicker

                            label="Date desktop"
                            inputFormat="MM/DD/YYYY"
                            value={dueDate}
                            onChange={(event) => handleDate(event)}
                            renderInput={(params) => <TextField size='small' {...params} label="Due Date" />}
                        />
                    </Stack>
                </LocalizationProvider>

                <Button variant="contained" sx={style.Button} onClick={CreateTask}>createTask</Button>

            </div>


        </Box>
    )
}

export default CreateTaskComponent