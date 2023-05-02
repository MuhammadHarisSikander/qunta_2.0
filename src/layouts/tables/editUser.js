import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
// import ReactImagePickerEditor from 'react-image-picker-editor';
// import 'react-image-picker-editor/dist/index.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import MDButton from 'components/MDButton';
import Icon from "@mui/material/Icon";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function EditUser({ allDesignation, allLocation, allRoles, allDept, user }) {
    const theme = useTheme();
    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [employeeNo, setEmployeeNo] = useState(user.employee_no || '');
    const [employeeType, setEmployeeType] = useState(user.employee_type || '');
    const [extension, setExtension] = useState(user.extension || '');
    const [phone, setPhone] = useState(user.phone_number || '');
    const [imageSrc, setImageSrc] = useState()
    const [selectedDesignation, setSelectedDesignation] = useState(user.designation ? [user.designation] : []);
    const [selectedLocation, setSelectedLocation] = useState(user.location ? [user.location] : []);
    const [selectedRole, setSelectedRole] = useState(user.roles || []);
    const [selectedDepts, setselectedDepts] = useState([]);

    const handleChangeDepartment = (e) => {
        setselectedDepts(selectedDepts.find(dept => dept.id === e.target.value.id)
            ?
            selectedDepts.filter(dept => dept.id !== e.target.value.id)
            :
            [...selectedDepts, e.target.value])

    };

    const handleChangeDesignation = (e) => {

        setSelectedDesignation([e.target.value])

    };

    const handleChangeLocation = (e) => {
        setSelectedLocation([e.target.value])
    };

    const handleChangeRole = (e) => {
        setSelectedRole([e.target.value])
    }

    const config2 = {
        borderRadius: '50%',
        language: 'en',
        compressInitial: null,
        hideEditBtn: true,
        hideDownloadBtn: true,
        height: "100px",
        width: '100px',
        quality: false,
        aspectRatio: null

    };
    const initialImage = ""
    const token = localStorage.getItem("token")
    const submitUser = () => {
        const data = {
            email,
            name,
            password,
            password_confirmation: confirmPassword,
            departments: selectedDepts.map(dept => dept.id),
            designation_id: selectedDesignation[0].id,
            location_id: selectedLocation[0].id,
            employee_no: employeeNo,
            employee_type: employeeType,
            extension,
            phone: "0211223456",
            role_id: selectedRole[0].id
            // profile_photo_path: imageSrc,

        }
        axios.post("https://first.quantaforms.com/api/register", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
            .then((response) => {
                console.log(response);
            })
            .catch(err => {
                console.log(err.response.data.message);
                alert(err.response.data.message)
            })

    }
    React.useEffect(() => {
        console.log("UseEffect Data ", user)
        // console.log("All location useEffect", props.allLocation)
    }, [name])

    return (
        <Box>
            <div style={{ padding: '20px', display: 'flex', margin: '20px', justifyContent: 'space-between' }}>

                <h3 style={style}>
                    Edit User
                </h3>
            </div>
            <hr />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {/* <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}  >

                    < ReactImagePickerEditor
                        config={config2}
                        imageSrcProp={initialImage}
                        imageChanged={(value) => setImageSrc(value)}

                    />
                </div> */}
            </div>
            <div style={{ padding: '20px', display: 'flex', margin: '20px', paddingBottom: "0px", marginBottom: "0px" }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    fullWidth
                    style={style}
                    onChange={(value) => setName(value.target.value)}
                    value={name}
                />
            </div>

            <div style={{ padding: '20px', display: 'flex', margin: '20px', paddingBottom: "0px", marginBottom: "0px", paddingTop: "0px", marginTop: "10px" }}>
                <FormControl style={{ paddingBottom: "0px", marginBottom: "0px", paddingTop: "0px", marginTop: "10px" }} sx={{ m: 0.5, display: 'flex', flex: 1 }}>
                    <InputLabel id="demo-multiple-chip-label">Designation</InputLabel>
                    <Select
                        sx={{ p: 1.5 }}
                        value={selectedDesignation}
                        onChange={handleChangeDesignation}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    < Chip key={value.id} label={value.name} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {allDesignation.map((dept) => (
                            <MenuItem
                                id={dept.id}
                                key={dept.id}
                                value={dept}
                                style={getStyles(dept.name, selectedDesignation, theme)}
                            // style={{ backgroundColor: selectedDesignation.find(_dept => _dept.id === dept.id) ? 'gainsboro' : 'white' }}
                            >
                                {dept.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div style={{ padding: '20px', display: 'flex', margin: '20px', paddingBottom: "0px", marginBottom: "0px", paddingTop: "0px", marginTop: "10px" }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    fullWidth
                    style={style}
                    onChange={(value) => setEmail(value.target.value)}
                    value={email}
                // autoComplete:false
                />
            </div>


            <div style={{ padding: '20px', display: 'flex', margin: '20px', paddingBottom: "0px", marginBottom: "0px", paddingTop: "0px", marginTop: "10px" }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Employee no"
                    value={employeeNo}
                    fullWidth
                    style={style}
                    onChange={(value) => setEmployeeNo(value.target.value)}
                // disabled
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Employee Type"
                    value={employeeType}
                    fullWidth
                    style={style}
                    onChange={(value) => setEmployeeType(value.target.value)}
                    disabled
                />
            </div>

            <div style={{ padding: '20px', display: 'flex', margin: '20px', paddingBottom: "0px", marginBottom: "0px", paddingTop: "0px", marginTop: "10px" }}>
                <TextField
                    required
                    id="outlined-required"
                    label="Extension"
                    value={extension}
                    fullWidth
                    style={style}
                    onChange={(value) => setExtension(value.target.value)}
                    disabled
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Phone"
                    value={phone}
                    fullWidth
                    style={style}
                    onChange={(value) => setPhone(value.target.value)}
                    disabled
                />
            </div>

            <div style={{ padding: '20px', display: 'flex', margin: '20px', paddingBottom: "0px", marginBottom: "0px", paddingTop: "0px", marginTop: "10px" }}>
                <FormControl style={{ paddingBottom: "0px", marginBottom: "0px", paddingTop: "0px", marginTop: "10px" }} sx={{ m: 0.5, display: 'flex', flex: 1 }}>
                    <InputLabel id="demo-multiple-chip-label">Location</InputLabel>
                    <Select
                        sx={{ p: 1.5 }}
                        value={selectedLocation}
                        onChange={handleChangeLocation}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value.id} label={value.name} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {allLocation.map((dept) => (
                            <MenuItem
                                id={dept.id}
                                key={dept.id}
                                value={dept}
                            // style={getStyles(name.name, selectedLocation, theme)}
                            >
                                {dept.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div style={{ padding: '20px', display: 'flex', margin: '20px', paddingBottom: "0px", marginBottom: "0px", paddingTop: "0px", marginTop: "10px" }}>
                <FormControl style={{ paddingBottom: "0px", marginBottom: "0px", paddingTop: "0px", marginTop: "10px" }} sx={{ m: 0.5, display: 'flex', flex: 1 }}>
                    <InputLabel id="demo-multiple-chip-label">Roles</InputLabel>
                    <Select
                        value={selectedRole}
                        onChange={handleChangeRole}
                        sx={{ p: 1.5 }}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value.id} label={value.name} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {allRoles.map((name) => (
                            <MenuItem
                                id={name.id}
                                key={name.id}
                                value={name}
                            // style={getStyles(name.name, roleName, theme)}
                            >
                                {name.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div style={{ padding: '20px', display: 'flex', margin: '20px', paddingBottom: "0px", marginBottom: "0px", paddingTop: "0px", marginTop: "10px" }}>
                <FormControl style={{ paddingBottom: "0px", marginBottom: "0px", paddingTop: "0px", marginTop: "10px" }} sx={{ m: 0.5, display: 'flex', flex: 1 }}>
                    <InputLabel id="demo-multiple-chip-label">Departments</InputLabel>
                    <Select
                        value={selectedDepts}
                        onChange={handleChangeDepartment}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                        sx={{ p: 1.5 }}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value.id} label={value.name} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {allDept.map((dept) => (
                            <MenuItem
                                id={dept.id}
                                key={dept.id}
                                value={dept}
                                style={{ backgroundColor: selectedDepts.find(_dept => _dept.id === dept.id) ? 'gainsboro' : 'white' }}
                            >
                                {dept.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div style={{ padding: '20px', display: 'flex', margin: '20px' }}>
                <Stack spacing={2} direction="row" style={style}>
                    <MDButton onClick={() => submitUser()} variant="gradient" color="dark">
                        {/* <Icon sx={{ fontWeight: "bold" }}>add</Icon> */}
                        &nbsp;add new user
                    </MDButton>
                </Stack>
            </div>
        </Box >
    )
}

const style = {
    margin: '5px',
    marginBottom: '0px',
    marginTop: '0px',
}