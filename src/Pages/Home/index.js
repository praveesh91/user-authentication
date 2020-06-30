import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from "axios";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: 20,
    minHeight: 425,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Rockets() {
  const classes = useStyles();
  const [rockets, setRockets] = React.useState([]);

  React.useEffect(() => {
    axios
    .get(`https://api.spacexdata.com/v3/rockets`)
    .then(res => {
        setRockets(res.data)
    })
    .catch(error => console.error(error))
  }, [])
console.log(rockets)
  return (
        rockets.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={classes.root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    F
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title={item.rocket_name}
                subheader={item.country}
            />
            <CardMedia
                className={classes.media}
                image={item.flickr_images[0]}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {item.description}
                </Typography>
            </CardContent>
        </Card>
        </Grid>
        ))
        
      );
}
