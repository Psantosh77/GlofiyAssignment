import React ,{ useEffect} from 'react';
import { Box } from '@mui/system'
import { Typography, TextField, CardActions, CardContent, Card, Autocomplete, Button, InputLabel, MenuItem, Checkbox, Select, OutlinedInput, ListItemText } from '@mui/material';
import styled from "styled-components";
import Modal from '@mui/material/Modal';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import axios from "axios";
import dayjs from 'dayjs';


const TaskConatiner = styled.div`
    border:1px solid red;
`;
const Label = styled.label`
    
`;



const stylemodel = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "30%",
    bgcolor: '#fff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const style = {
    Box: {
        border: "1px solid red",
        width: "100%",
        p: 2,
    },
    FormDiv: {
        marginTop: "10%",
    },
    TextField: {
        width: "100%",
        marginTop: "5%"
    },
    Button: {
        margin: "10% auto"
    }
}

const Table = styled.table`
    width:100%;
`;
const TableHead = styled.thead`
    border:1px solid #000;
`;
const TableBody = styled.tbody``;
const Th = styled.th`
    font-weight:500;
    text-align:left;
`;
const Tr = styled.tr``;
const Td = styled.td``;



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

const TaskListComponent = (props) => {
    const { data, DeleteTask } = props;
    console.log("dada", data)


    const [id,setId] = React.useState();

    const [open, setOpen] = React.useState(false);
    const handleOpen = (id) => ( setOpen(true) , setId(id));
    const handleClose = () => setOpen(false);


    const [personName, setPersonName] = React.useState([]);

    const handlPersonChange = (event) => {
        const { target: { value }, } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };



    const [message, setMessage] = React.useState("");
    const [assignName, setAssignName] = React.useState();
    const [assignTo, setAssignTo] = React.useState();
    const [dueDate, setDueDate] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [userData, setUserData] = React.useState();



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
        bodyFormData.append("taskid", id)

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "AuthToken": "UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a"
            }
        };
        const res = await axios.post("https://devza.com/tests/tasks/update", bodyFormData, config)
            .then((res) => "").catch((err) => console.log('get api not working'))


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

    return (
        <>
            <Box sx={style.Box}>
                <Typography variant='h5'>Create Task</Typography>

                <Table>
                    <TableHead>

                        <Th>Message</Th>
                        <Th>Assigned Name</Th>
                        <Th>Priority</Th>
                        <Th>Due date</Th>
                        <Th>Delete</Th>
                        <Th>Update</Th>

                    </TableHead>
                    <TableBody>

                        {
                            data?.map((data) => (
                                <Tr>
                                    <Td>
                                        <TextField

                                            sx={style.TextField}
                                            size='small'
                                            id="outlined-required"
                                            defaultValue={data.message}
                                            inputProps={{ readOnly: true }}
                                            onChange={handleMessage}
                                            name="message"
                                            value={message}

                                        />

                                    </Td>
                                    <Td>
                                        <TextField

                                            sx={style.TextField}
                                            size='small'
                                            id="outlined-required"
                                            inputProps={{ readOnly: true }}
                                            defaultValue={data.assigned_name}


                                        />

                                    </Td>
                                    <Td>
                                        <TextField

                                            sx={style.TextField}
                                            size='small'
                                            id="outlined-required"
                                            inputProps={{ readOnly: true }}
                                            defaultValue={data.assigned_to}

                                        />

                                    </Td>
                                    <Td>
                                        <TextField

                                            sx={style.TextField}
                                            size='small'
                                            id="outlined-required"
                                            label="Task"
                                        />
                                    </Td>
                                    <Td><Button onClick={() => DeleteTask(data.id)}>Delete</Button></Td>
                                    <Td><Button onClick={()=>handleOpen(data.id) }>Update</Button></Td>
                                </Tr>
                            ))
                        }
                    </TableBody>
                </Table>
            </Box>


            {
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={stylemodel}>

                        <Typography variant='h5'>Update Task</Typography>
                        <div style={style.FormDiv}>
                            <TextField

                                sx={style.TextField}
                                size='small'
                                id="outlined-required"
                                label="Task"
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
                                    userData?.map((user) => (
                                        <MenuItem value={user.name}>{user.name} <img src={user.picture} /> </MenuItem>
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

                            <Button variant="contained" sx={style.Button} onClick={() =>(UpdateTask() ,handleClose())}>Update Task</Button>
                        </div>
                    </Box>
                </Modal>
            }
        </>
    )
}

export default TaskListComponent