import { Avatar, Box, TextField, Typography, styled } from "@mui/material";
import { useState } from "react";
import spainTeam from '../../assets/team.webp';
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Header from "../../components/header/Header";
import Alert from "@mui/material/Alert";
import axios from "axios";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [image, setImage] = useState(null);
  const [apiQuery, setApiQuery] = useState({loading: false, error: false, uploaded: false});

  const handleSubmit = (e) => {
    e.preventDefault();

    if(apiQuery.loading) 
      return;

    if (!teamName || !image) {
      return;
    }

    setApiQuery({...apiQuery, loading: true});

    const dataForm = new FormData();
    dataForm.append('name', teamName);
    dataForm.append('image', image);

    axios.post(`${import.meta.env.VITE_BASE_PATH}/api/teams`, dataForm)
    .then(() => {
      setApiQuery(currentState => ({...currentState, error: false, uploaded: true, loading: false}));
    })
    .catch(() => {
      setApiQuery(currentState => ({...currentState, uploaded: false, error: true, loading: false}));
    })
  }

  return (
    <>
      {apiQuery.error ? <Alert severity="error">Unexpected error occurred!</Alert> : null}
      {apiQuery.uploaded ? <Alert severity="success">Team created successfully!</Alert> : null}
    
    
    <Header />
    <Box component={'form'} method="post" onSubmit={handleSubmit} sx={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Box sx={{backgroundColor: '#fff', minWidth: '700px', minHeight: '400px', padding: '1em', borderRadius: '5px'}}>

        <Typography variant="h5" sx={{}} gutterBottom>Create a Team</Typography>

        <Avatar sx={{width: '250px', height: '150px', margin: '0 auto', backgroundColor: '#C70039'}} src={spainTeam} />

        <TextField
          placeholder="Team Name"
          fullWidth
          onChange={(e) => setTeamName(e.target.value)}
          error={!teamName}
          helperText={!teamName ? 'Please enter a team name' : ''}
          sx={{marginTop: '1em'}}
        />

        <Box sx={{marginTop: '1em', display: "flex", alignItems: "center", justifyContent: "center"}}>
          <Button sx={{height:"50px", width:"200px"}} component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
              Upload photo
              <VisuallyHiddenInput type="file" multiple accept="image/jpeg"  onChange={(e) => {
                  if(e.target.files && e.target.files.length < 1){
                      
                      return;
                  }

                  if (e.target.files && e.target.files?.length > 1) {
                      return;
                  }

                  if(e.target.files && e.target.files[0]) {
                      const image = e.target.files[0];
                        // 1/2 MB
                      if (image?.size < 5 * 1000 * 1024 && image?.type === "image/jpeg" && image?.name.match(/\.(jpg)$/)) {
                          setImage(image)
                      }
                  }



                  }}/>
          </Button>
        </Box>

        {image ? (
          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '1em', gap: '5px'}}>
            <img
                alt="not found"
                width={"150px"}
                src={URL.createObjectURL(image)}
              />

              <Button color="error" onClick={() => setImage(null)}>Remove</Button>
          </Box>
        ) : null}

        <Box sx={{marginTop: '1em', height: '100%', display: 'flex', alignItems: 'end', justifyContent: 'end'}}>
          <Button disabled={apiQuery.loading} type="submit" variant="contained" sx={{backgroundColor: '#C70039', '&:hover': {opacity: '0.8', backgroundColor: '#C70039'}}}>Create Team</Button>
        </Box>
        
      </Box>
     

    </Box>
    </>
  )
}

export default CreateTeam;