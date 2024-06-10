import { Box, Typography } from "@mui/material"
import TeamCard from "../../components/Team/TeamCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Header from "../../components/header/Header";
const TeamList = () => {

  const [teams, setTeams] = useState([]);
  const [getError, setGetError] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_PATH}/api/teams`)
    .then((resp) => {
      setTeams(resp.data);
    })
    .catch(() => {
      setGetError(true);
    })
  }, []);



  return (
    <>
    <Header />
      <Alert severity="error" sx={{display: getError ? 'block' : 'none'}}>Unexpected error occurred!</Alert>
      <Typography sx={{color: '#fff', textAlign: 'center'}} variant="h4">Teams</Typography>
      <Box sx={{margin: '1.25em', display: 'flex', gap: '14px', flexDirection: 'row', flexWrap: 'wrap'}}>

        {
          teams.map((team) => {
            return <TeamCard key={`team_${team.id}`} id={team.id} name={team.name} image={team.image} />
          })
        }

      </Box>
    </>
  )
}

export default TeamList;