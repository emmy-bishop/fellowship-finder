import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import profilepic from '../assets/profilepic.jpg';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`api/user/${id}`);
        setUser(data);
      } catch (err) {
        console.error('Error fetching user data: ', err);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <Container>
      <Avatar
        sx={{
          width: 150,
          height: 150,
          position: 'relative',
          top: '-50px',
          left: '-20%',
          margin: '0 auto',
        }}
        alt="Marvy Warvy"
        src={user ? user.image : profilepic}
      />
      <Grid container>
        <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
          <Typography variant="h2">{user ? user.username : ''}</Typography>
          <Chip label={`Email: ${user ? user.email : ''}`} variant="outlined" />
          <Chip label={`Companions: ${user ? (user.friends ? user.friends : 'Nary a one') : ''}`} variant="outlined" />
          <Chip label={`Combat Heaviness: ${user ? user.combatHeaviness : ''}`} variant="outlined" />
          <Chip label={`Strategy Heaviness: ${user ? user.strategyHeaviness : ''}`} variant="outlined" />
          <Chip label={`Roleplay Focus: ${user ? user.roleplayFocus : ''}`} variant="outlined" />
          <Chip label={`Story Focus: ${user ? user.storyFocus : ''}`} variant="outlined" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
