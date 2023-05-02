import React, { useState, useEffect } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
import { Chip, Container, Divider, InputLabel, List, ListItem, ListItemText, TextField } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import axios from "axios";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";


const token = localStorage.getItem("token")

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#FFFFFF",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,

}));

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



function PerRequestForm() {

    const [currentUser, setCurrentUser] = useState(null);
    // data
    const [reqTitle, setReqTitle] = useState("");
    const [reqSpecs, setReqSpecs] = useState("");
    const [softCategory, setSoftCategory] = useState([]);
    const [subSoftCategory, setSubSoftCategory] = useState([]);
    const [selectedAffectedModules, setSelectedAffectedModules] = useState([]);
    const [frontPicFile, setFrontPicFile] = useState([]);
    const [selectedChangePrioritye, SetSelectedChangePrioritye] = useState("")
    const [previewFront, setPreviewFront] = useState([]);
    const [selectedChangeType, SetSelectedChangeType] = useState("")
    const [selectedChangeSignificance, SetSelectedChangeSignificance] = useState("")
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectSubCategoty, SetSelectSubCategoty] = useState([]);

    const [changetype, setChangetype] = useState();
    const [changePriority, setChangePriority] = useState();
    const [changeSignificance, setChangeSignificance] = useState();
    const [uatAttachment, setUatAttachment] = useState();





    const newDate = new Date()
    const dateRaw = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();


    const getSoftwareCategory = async () => {
        const token = localStorage.getItem("token")
        await axios.get("https://first.quantaforms.com/api/get-software-categories", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setSoftCategory(response.data);
            console.log('Response', response.data);
        })
            .catch((error) => console.log("An error occured", error))
    };

    const getCurrentUser = () => {
        const user = JSON.parse(localStorage.getItem("userData"))
        console.log("user data", user);
        setCurrentUser(user)
    };



    useEffect(() => {
        getCurrentUser()
        getSoftwareCategory()

    }, [])

    useEffect(() => {
        console.log("preview Front", previewFront)
    }, [previewFront])

    useEffect(() => {
        if (frontPicFile?.length === 0) {
            return
        }
        console.log("frontPicFile", frontPicFile);
        let previews = []
        for (var i = 0; i < frontPicFile.length; i++) {
            console.log(" frontPicFile ka index", frontPicFile[i]);
            const objectUrl = URL.createObjectURL(frontPicFile[i])
            console.log("preview Front list", previewFront);
            previews.push(objectUrl)
        }
        setPreviewFront([...previewFront, ...previews])
    }, [frontPicFile]);

    const handleSelect = async (event, newValue) => {
        setSelectedCategory(newValue)
        const token = localStorage.getItem("token")
        const data = {
            id: newValue.id
        }
        console.log(data);
        // Call your API here with the selected option's value
        const response = await axios.post('https://first.quantaforms.com/api/get-software-subcategories', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setSubSoftCategory(response.data);
            console.log('Response', response.data);
        })
            .catch((error) => console.log("An error occured", error))
    };

    const onSelectFrontVariantFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setFrontPicFile([])
            return
        }
        console.clear()
        console.log("e.target.files", e.target.files)
        let files = []
        for (var i = 0; i < e.target.files.length; i++) {
            files.push(e.target.files[i])
        }
        setFrontPicFile(files)
    }

    const handleSelectSubCategoty = (e) => {
        SetSelectSubCategoty(selectSubCategoty.find(subCategory => subCategory.id === e.target.value.id)
            ?
            selectSubCategoty.filter(subCategory => subCategory.id !== e.target.value.id)
            :
            [...selectSubCategoty, e.target.value]
        )

    };

    const handleAffectedModules = (e) => {
        setSelectedAffectedModules(selectedAffectedModules.find(modules => modules.id === e.target.value.id)
            ?
            selectedAffectedModules.filter(modules => modules.id !== e.target.value.id)
            :
            [...selectedAffectedModules, e.target.value]
        )

    };

    const handleChangeType = (e) => {

        SetSelectedChangeType(e.target.value);
    }

    const handleChangePriority = (e) => {
        SetSelectedChangePrioritye(e.target.value);
    }
    const handleChangeSignificance = (e) => {
        SetSelectedChangeSignificance(e.target.value);
    }

    const submitForm = () => {
        const data = {
            request_title: reqTitle,
            request_specs: reqSpecs,
            change_type: selectedChangeType,
            change_priority: selectedChangePrioritye,
            software_category_id: selectedCategory.id,
            software_subcategory_id: selectSubCategoty.map(val => val.id),
            business_expert_id: selectedAffectedModules.map(val => val.id),
            attachments: frontPicFile,
            process_efficiency: "abc",
            control_improvement: "abc",
            man_hours: 12,
            other_benefits: "abc",
            date: "2022-03-15"
        }
        axios.post("https://first.quantaforms.com/api/scrf", data, {
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


    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <MDTypography variant="h6" color="white">
                                    Software Request Form
                                </MDTypography>
                            </MDBox>
                            <MDBox style={{ display: 'flex', marginRight: '20px' }} pt={3}>
                                <Container style={{}} className="content">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} sx={{ m: 1 }} >
                                                {/* <p>Software Category:</p> */}
                                                <FormControl style={{}} sx={{ mr: 1, display: 'flex', flex: 1 }}>
                                                    <Autocomplete
                                                        disablePortal
                                                        id="combo-box-demo"
                                                        options={softCategory.software_categories || []}
                                                        getOptionLabel={(option) => option.name}
                                                        fullWidth
                                                        value={selectedCategory}
                                                        renderInput={(params) => <TextField {...params} label="Software Category" />}
                                                        onChange={handleSelect}

                                                        sx={{ alignItems: 'center', alignContent: 'center' }}
                                                    />
                                                </FormControl>
                                            </Box>

                                            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} sx={{ mr: 1 }} >
                                                {/* <p>Software SubCategory:</p> */}
                                                <FormControl style={{}} sx={{ m: 1, display: 'flex', flex: 1 }}>
                                                    <InputLabel style={{ backgroundColor: 'white' }} id="demo-simple-select-label">Software Sub Category</InputLabel>
                                                    <Select
                                                        label="Age"
                                                        sx={{ p: 2 }}
                                                        value={selectSubCategoty}
                                                        onChange={handleSelectSubCategoty}
                                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                                        renderValue={(selected) => (
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                {selected?.map((value) => (
                                                                    <Chip key={value.id} label={value.name} />
                                                                ))}
                                                            </Box>
                                                        )}
                                                        MenuProps={MenuProps}
                                                    >
                                                        {subSoftCategory?.software_subcategories?.map((dept) => (
                                                            <MenuItem
                                                                id={dept.id}
                                                                key={dept.id}
                                                                value={dept}
                                                            >
                                                                {dept.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>

                                                {/* <p>Other Affected Modules:</p> */}
                                                <FormControl style={{}} sx={{ m: 1, display: 'flex', flex: 1 }}>
                                                    <InputLabel style={{ backgroundColor: 'white' }} id="demo-simple-select-label">Other Affected Modules</InputLabel>
                                                    <Select
                                                        // label="SubCategory"
                                                        sx={{ p: 2 }}
                                                        value={selectedAffectedModules}
                                                        onChange={handleAffectedModules}
                                                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                                        renderValue={(selected) => (
                                                            // console.log("selected", selected)
                                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                                {selected?.map((value) => (
                                                                    <Chip key={value.id} label={value.name} />
                                                                ))}
                                                            </Box>
                                                        )}
                                                        MenuProps={MenuProps}
                                                    >
                                                        {subSoftCategory?.software_subcategories?.map((dept) => (
                                                            <MenuItem
                                                                id={dept.id}
                                                                key={dept.id}
                                                                value={dept}
                                                            >
                                                                {dept.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>

                                            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                                <TextField
                                                    sx={{ m: 1, display: 'flex', flex: 1, marginRight: 2 }}
                                                    required
                                                    id="outlined-required"
                                                    label="Request Title"
                                                    fullWidth
                                                    defaultValue={reqTitle}
                                                    onChange={(value) => setReqTitle(value.target.value)}
                                                />
                                            </Box>
                                            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                                                <TextField
                                                    sx={{ m: 1, display: 'flex', flex: 1, marginRight: 2 }}
                                                    id="outlined-multiline-static"
                                                    label="Request Specs & Business Justification:"
                                                    multiline
                                                    rows={4}
                                                    defaultValue={reqSpecs}
                                                    fullWidth
                                                    onChange={(value) => setReqSpecs(value.target.value)}
                                                />
                                            </Box>

                                            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }} sx={{ m: 1, marginRight: 2 }} >
                                                <div style={{ display: 'flex', flex: 1, borderRadius: "10px", cursor: 'pointer', flexDirection: 'column', border: "1px dashed #4c83d9" }}>
                                                    <Input
                                                        accept="image/*"
                                                        sx={{ m: 1, display: 'none', flex: 1 }}
                                                        id="input_file"
                                                        inputProps={{
                                                            multiple: true
                                                        }}
                                                        type="file"
                                                        fullWidth
                                                        onChange={onSelectFrontVariantFile}
                                                    />
                                                    <div style={{ display: 'flex', flex: 1, justifyContent: 'center ', }} >
                                                        <Button style={{ display: 'flex', flex: 1, justifyContent: 'center ', fontSize: "20px" }} onClick={() => { document.getElementById("input_file").click() }} >
                                                            Add file
                                                        </Button>
                                                    </div>
                                                    {
                                                        previewFront?.map((file, i) => {
                                                            return (
                                                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", margin: '5px' }}>
                                                                    <div>
                                                                        <Avatar imgProps={{ style: { objectFit: 'fill' } }} src={file && file || "X"} sx={{ width: 50, height: 50, m: 1 }} variant="circular" />
                                                                    </div>
                                                                    <Icon fontSize="large" sx={{ color: '#800000' }}
                                                                        onClick={() => {
                                                                            frontPicFile.splice(i, 1)
                                                                            setPreviewFront(previewFront.filter(_file => file != _file))
                                                                        }}
                                                                    >
                                                                        delete</Icon>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </Box>

                                            <Box sx={{ flexGrow: 1, m: 1 }} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                                <p style={{ width: "700px", fontSize: '15px' }}>Change Type:</p>
                                                <Grid style={{}} item xs={50}>
                                                    <FormControl style={{}} >
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                            name="row-radio-buttons-group"
                                                            onChange={handleChangeType}
                                                            value={selectedChangeType}
                                                        >
                                                            <FormControlLabel value="Modification" control={<Radio />} label="Modification" />
                                                            <FormControlLabel value="Correction" control={<Radio />} label="Correction" />
                                                            <FormControlLabel value="NewEnhancement/Addition" control={<Radio />} label="New Enhancement / Addition" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                            </Box>

                                            <Box sx={{ flexGrow: 1, m: 1 }} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                                <p style={{ width: "700px", fontSize: '15px' }} >Change Priority:</p>
                                                <Grid style={{}} item xs={50}>
                                                    <FormControl>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                            name="row-radio-buttons-group"
                                                            onChange={handleChangePriority}
                                                            value={selectedChangePrioritye}
                                                        >
                                                            <FormControlLabel value="Severe" control={<Radio />} label="Severe" />
                                                            <FormControlLabel value="Normal" control={<Radio />} label="Normal" />
                                                            <FormControlLabel value="Urgent" control={<Radio />} label="Urgent" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                            </Box>

                                            <Box sx={{ m: 1, marginRight: 2 }} >
                                                <fieldset style={{ borderColor: '#f7f8ff', borderRadius: '5px', padding: "10px" }} >
                                                    <legend>Reason for Development</legend>
                                                    <Box
                                                        component="form"
                                                        sx={{
                                                            '& .MuiTextField-root': { m: 1 },
                                                        }}
                                                        noValidate
                                                        autoComplete="off"
                                                    >
                                                        <div style={{ display: "flex" }} >
                                                            <TextField
                                                                sx={{}}
                                                                required
                                                                id="outlined-required"
                                                                label="Man Hours Saving"
                                                                fullWidth
                                                                defaultValue={reqTitle}
                                                                onChange={(value) => setReqTitle(value.target.value)}
                                                            />
                                                            <TextField
                                                                sx={{}}
                                                                required
                                                                id="outlined-required"
                                                                label="Audit / Legal Requirement"
                                                                fullWidth
                                                                defaultValue={reqTitle}
                                                                onChange={(value) => setReqTitle(value.target.value)}
                                                            />

                                                        </div>

                                                        <div style={{ display: "flex" }}>
                                                            <TextField
                                                                sx={{}}
                                                                required
                                                                id="outlined-required"
                                                                label="Control Improvements"
                                                                fullWidth
                                                                defaultValue={reqTitle}
                                                                onChange={(value) => setReqTitle(value.target.value)}
                                                            />
                                                            <TextField
                                                                sx={{}}
                                                                required
                                                                label="Business Process Change"
                                                                fullWidth
                                                                defaultValue={reqTitle}
                                                                onChange={(value) => setReqTitle(value.target.value)}
                                                            />

                                                        </div>

                                                        <div style={{ display: "flex" }}>
                                                            <TextField
                                                                sx={{}}
                                                                required
                                                                id="outlined-required"
                                                                label="Request Title"
                                                                fullWidth
                                                                defaultValue={reqTitle}
                                                                onChange={(value) => setReqTitle(value.target.value)}
                                                            />
                                                            <TextField
                                                                sx={{}}
                                                                required
                                                                id="outlined-required"
                                                                label="Request Title"
                                                                fullWidth
                                                                defaultValue={reqTitle}
                                                                onChange={(value) => setReqTitle(value.target.value)}
                                                            />

                                                        </div>
                                                    </Box>

                                                </fieldset>

                                            </Box>

                                            <Box sx={{ flexGrow: 1, m: 1 }} style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                                <p style={{ width: "1000px" }}>Change Significance:</p>
                                                <Grid style={{}} item xs={50}>
                                                    <FormControl>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                                            name="row-radio-buttons-group"
                                                            onChange={handleChangeSignificance}
                                                            value={selectedChangeSignificance}
                                                        >
                                                            <FormControlLabel value="Minor" control={<Radio />} label="Minor" />
                                                            <FormControlLabel value="Major" control={<Radio />} label="Major" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid>
                                            </Box>

                                            <Box sx={{ m: 1 }} >
                                                <MDButton fullWidth onClick={() => submitForm()} variant="gradient" color="dark">
                                                    &nbsp;Submit Form
                                                </MDButton>
                                            </Box>
                                        </div>
                                    </div>
                                </Container>
                                <Container style={{ borderLeft: '1px solid #eaebed' }} >
                                    <div style={{ padding: '10px' }} >
                                        <h5 style={{ color: 'red' }} >Attachments</h5>
                                        <div style={{ border: '1px solid', width: '230px', padding: '5px' }} >
                                            <h5>Requirement Doc</h5>
                                            <h5>Report Format</h5>
                                            <h5>Screen Design</h5>
                                            <h5>Required Controls List</h5>
                                            <h5>Scenarios List</h5>
                                        </div>
                                    </div>
                                    <div style={{ padding: '10px' }} >

                                        <h5 style={{ color: 'red' }} >Approval Hierarchy</h5>
                                        <div style={{ border: '1px solid', width: '230px', padding: '5px' }} >
                                            <h4>Initiator:</h4>
                                            <h5> Business Expert:</h5>
                                            <h6> Approver: </h6>
                                            <h6> Approver: </h6>

                                            <h5> Additional Approvers</h5>
                                            <h6>  Approver: </h6>
                                            <h6>  Approver: </h6>

                                            <h5> Additional Approvers</h5>
                                            <h6>  Approver: </h6>
                                            <h6>  Approver: </h6>

                                            <h5> Business Expert: </h5>

                                            <h5> Additional Approvers</h5>
                                            <h6>  Approver: </h6>
                                            <h6>  Approver: </h6>
                                        </div>
                                    </div>
                                </Container>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default PerRequestForm;

