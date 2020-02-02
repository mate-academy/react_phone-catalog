import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import {setPhones, setPhoneToCart} from "./store/actions/actions";
import {getData} from "./Api/getData";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";


const Catalog = ({dispatch, phones, match, foundPhones}) => {

  const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 350,
      margin: "20px"
    },
    media: {
      height: 280,
    },
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  const addToCard = (phone) => {
    dispatch(setPhoneToCart(phone))
  }
  const classes = useStyles();

  useEffect(() => {
    getData().then(data => dispatch(setPhones(data)))
  }, [])



  return (
    <Grid item xs={12}>
      <Grid container justify="center">
        {!phones.length
          ? <div className={classes.root}><LinearProgress/></div>
          : phones.map(phone => (
              <Card className={classes.card} key={phone.age}>
                <CardActionArea>
                  <NavLink to={`${match.path}/${phone.id}`}>
                    <CardMedia
                      className={classes.media}
                      image={phone.imageUrl}
                      alt={`${phone.imageUrl}`}
                      style={{backgroundSize: "contain"}}
                    />
                  </NavLink>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {phone.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {phone.snippet}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button onClick={() => addToCard(phone)} size="small" color="primary">
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            )
          )}
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => {
  return {
    phones: state.phones,
    phonesInCart: state.phonesInCart,
    foundPhones: state.foundPhones
  }
}

export default connect(mapStateToProps)(Catalog);
