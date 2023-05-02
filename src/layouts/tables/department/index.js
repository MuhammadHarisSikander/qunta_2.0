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
import { Box, Modal, } from "@mui/material";
// import AddUser from './addUser'
import Backdrop from '@mui/material/Backdrop';
import AddDept from "./addDept";

const token = localStorage.getItem("token")

function Department() {
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [allUsers, setAllUsers] = useState(null);
    const [allDesignations, setAllDesignations] = useState([]);
    const [allLocation, setAllLocation] = useState([]);
    const [allRoles, setAllRoles] = useState([]);
    const [allDept, setAllDept] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const modalHandleOpen = () => setModalOpen(true);
    const modalHandleClose = () => setModalOpen(false);

    const getAllUsers = () => {
        axios.get(`https://first.quantaforms.com/api/department?page=${page}`, {
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
                console.log("depts", response);
                setAllDept(response.data.data)
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })
    }

    useEffect(() => {
        console.log("PAGE UPDATED", page)
        // getAllUsers();
        // getAllDesignation()
        // getAllLocation()
        // getAllRoles()
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
        { Header: "Department", accessor: "department", width: "45%", align: "left" },
        { Header: " ", accessor: "departments", width: "45%", align: "left" },
        // { Header: "Function", accessor: "function", align: "left" },
        // { Header: "Designation", accessor: "designation", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },
    ];

    const rows = allDept?.map((user, i) => {
        return {
            // department: <Author image={team3} name={user.name} />,
            // function: <Job title={user.designation.name} description={user.employee_type} />,
            department: <Job title={user?.name} description="" />,
            action: (
                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    Edit
                </MDTypography>
            ),
        }
    })

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Modal
                open={modalOpen}
                onClose={modalHandleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Box sx={style}>
                    <AddDept
                    />
                </Box>
            </Modal>
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
                                    Department Table
                                </MDTypography>
                                <MDButton onClick={() => modalHandleOpen()} variant="gradient" color="dark">
                                    <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                                    &nbsp;add new Department
                                </MDButton>
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

export default Department;

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
    borderRadius: '5px',
    // marginTop: 50
};