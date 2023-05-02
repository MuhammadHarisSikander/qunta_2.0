import * as React from 'react';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import { Stack } from '@mui/material';
import MDButton from 'components/MDButton';



export default function AddDept() {
    return (
        <Box component="form" noValidate autoComplete="off">
            <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput placeholder="Please enter text" />
                <div style={{ padding: '20px', display: 'flex', margin: '20px', justifyContent: 'center' }}>
                    <Stack spacing={2} direction="row" style={style}>
                        <MDButton variant="gradient" color="dark">
                            {/* <Icon sx={{ fontWeight: "bold" }}>add</Icon> */}
                            &nbsp;add department
                        </MDButton>
                    </Stack>
                </div>
            </FormControl>
        </Box>
    );
}

const style = {
    margin: '5px',
    // marginBottom: '0px',
    // marginTop: '0px',

}