import { Avatar, Box, TextField, Typography, styled, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Header from "../../components/header/Header";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

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

const CreatePlayer = () => {
  const [image, setImage] = useState(null);

  const [idTeam, setIdTeam] = useState(-1);
  const [playerName, setPlayerName] = useState('');

  const [teams, setTeams] = useState([]);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const [errorTeams, setErrorTeams] = useState(false);

  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);
  const [errorCreating, setErrorCreating] = useState(false);
  const [loadingCreating, setLoadingCreating] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (loadingCreating) {
      return;
    }

    if (idTeam === -1 || !playerName || !image) {
      return;
    }

    setLoadingCreating(true);

    const dataForm = new FormData();
    dataForm.append('image', image);
    dataForm.append('teamId', idTeam);
    dataForm.append('name', playerName);

    axios.post(`${import.meta.env.VITE_BASE_PATH}/api/players`, dataForm)
    .then(() => {
      setCreatedSuccessfully(true);
      setIdTeam(-1);
      setPlayerName('');
      setImage(null);
    })
    .catch(() => {
      setErrorCreating(true);
    })
    .finally(() => setLoadingCreating(false));
  };


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_PATH}/api/teams`)
    .then((res) => {
      setTeams(res.data);
    })
    .catch(() => {
      setErrorTeams(true);
    })
    .finally(() => setLoadingTeams(false));
  }, []);

  if (loadingTeams) return <p>Loading...</p>
  if (errorTeams) return <Alert severity="error">Error loading teams</Alert>


  return (
    <>
    {createdSuccessfully && <Alert severity="success">Player created successfully</Alert>}
    {errorCreating && <Alert severity="error">Error creating player</Alert>}
    <Header />
    <Box component={'form'} method="put" onSubmit={handleSubmit} sx={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Box sx={{backgroundColor: '#fff', minWidth: '700px', minHeight: '400px', padding: '1em', borderRadius: '5px'}}>

      <Typography variant="h5" sx={{}} gutterBottom>Create a Player</Typography>

        <FormControl fullWidth sx={{marginTop: '1em'}}>
          <InputLabel id="demo-simple-select-label">Pick a team</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={idTeam}
            label="Pick a team"
            placeholder="Pick a team"
            onChange={(e) => setIdTeam(e.target.value)}
            error={idTeam === -1}
          >
            <MenuItem disabled>Pick a team</MenuItem>
            {teams.map((team) =>  <MenuItem key={`team_${team.id}`} value={team.id}>{team.name}</MenuItem>)}

          </Select>
        </FormControl>

        <TextField
          placeholder="Player Name"
          fullWidth
          onChange={(e) => setPlayerName(e.target.value)}
          error={!playerName}
          helperText={!playerName ? "Write player's name" : ''}
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
          <Button  type="submit" variant="contained" sx={{backgroundColor: '#C70039', '&:hover': {opacity: '0.8', backgroundColor: '#C70039'}}}>Create Player</Button>
        </Box>
        
      </Box>
     

    </Box>
    </>
  )
}

export default CreatePlayer;