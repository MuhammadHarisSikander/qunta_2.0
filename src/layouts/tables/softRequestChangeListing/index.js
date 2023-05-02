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
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import axios from "axios";
import team3 from "assets/images/team-3.jpg";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import { Box, Modal, TextField, } from "@mui/material";
// import AddUser from './addUser'
import Backdrop from '@mui/material/Backdrop';
import Chart from "react-google-charts";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';


const token = localStorage.getItem("token")

function SoftRequestChangeListing() {
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [allUsers, setAllUsers] = useState([]);
    const [allDesignations, setAllDesignations] = useState([]);
    const [allLocation, setAllLocation] = useState([]);
    const [allRoles, setAllRoles] = useState([]);
    const [allDept, setAllDept] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [dateRange, setDateRange] = useState([null, null])
    const modalHandleOpen = () => setModalOpen(true);
    const modalHandleClose = () => setModalOpen(false);

    const getAllUsers = () => {
        axios.get(`https://first.quantaforms.com/api/scrf?page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                // console.clear();
                console.log("all users data", response.data);
                setAllUsers(response.data.data)
                setLastPage(response.data.meta.last_page);
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })
    }

    const getAllDesignation = () => {
        axios.get("https://first.quantaforms.com/api/designation", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
            .then((response) => {
                setAllDesignations(response.data.data)
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })
    }

    const getAllLocation = () => {
        axios.get("https://first.quantaforms.com/api/location", {
            headers: {
                Authorization: `Bearer ${token} `
            }
        }
        )
            .then((response) => {
                setAllLocation(response.data.data)
            })
            .catch(err => {
                alert(err)
            })
    }


    const getAllRoles = () => {
        axios.get("https://first.quantaforms.com/api/roles", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
            .then((response) => {
                setAllRoles(response.data.data)
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })
    }

    const getAllDepts = () => {
        axios.get("https://first.quantaforms.com/api/department", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
            .then((response) => {
                setAllDept(response.data.data)
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })
    }

    useEffect(() => {
        console.log("PAGE UPDATED", page)
        getAllUsers();
        getAllDesignation()
        getAllLocation()
        getAllRoles()
        getAllDepts()
    }, [page]);

    const Author = ({ image, name, email }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDAvatar src={image} name={name} size="sm" />
            <MDBox ml={2} lineHeight={1}>
                <MDTypography display="block" variant="button" fontWeight="medium">
                    {name}
                </MDTypography>
                <MDTypography variant="caption">{email}</MDTypography>
            </MDBox>
        </MDBox>
    );

    const Job = ({ title, description }) => (
        <MDBox lineHeight={1} textAlign="left">
            <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
                {title}
            </MDTypography>
            <MDTypography variant="caption">{description}</MDTypography>
        </MDBox>
    );

    const columns = [
        { Header: "Request#", accessor: "request", align: "left" },
        { Header: "Date", accessor: "date", align: "left" },
        { Header: "Header Text", accessor: "header", align: "left" },
        { Header: "Approval Status", accessor: "approvalStatus", align: "left" },
        { Header: "Completion Status", accessor: "completionStatus", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },
    ];
    const dataa = [
        ["Task", "Hours per Day"],
        ["In Approval", 11],
        ["Open", 2],
        ["In development", 2],
        ["Completed", 2],

    ];

    const rows = allUsers.map((user, i) => {
        return {
            request: <Job title={user.request_title} description={user.sequence_no} />,
            date: <Job title={user.date} />,
            header: <Job description={user.request_specs} />,
            approvalStatus: <Job description={user.controls_improved} />,
            action: (
                <>
                    <div style={{ width: '100px', display: 'flex', justifyContent: 'space-between' }} >
                        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                            Open
                        </MDTypography>
                        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                            Edit
                        </MDTypography>
                    </div>
                </>
            ),
        }
    })

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
                                    Form Listing
                                </MDTypography>
                            </MDBox>
                            <MDBox style={{ display: 'flex', justifyContent: "space-evenly", alignItems: 'center', margin: '10px' }} pt={3}>
                                <Box style={{ flex: 1 }} >
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateRangePicker']}>
                                            <DateRangePicker
                                                sx={{ display: 'flex', flexDirection: 'column', width: '500px' }}
                                                onChange={(e) => console.log(e)}
                                                localeText={{ start: 'Start Date', end: 'End Date' }}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Box>
                                <Box style={{ flex: 1 }}>
                                    <Chart
                                        chartType="PieChart"
                                        data={dataa}
                                        // options={options}
                                        width={"100%"}
                                        height={"400px"}
                                    />
                                </Box>
                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    table={{ columns, rows }}
                                    isSorted={false}
                                    entriesPerPage={{
                                        defaultValue: 10,
                                        entries: [5, 10, 20],
                                    }}
                                    // showTotalEntries={true}
                                    noEndBorder
                                    setPage={setPage}
                                    pageNumber={page}
                                    lastPage={lastPage}
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default SoftRequestChangeListing;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px'
};