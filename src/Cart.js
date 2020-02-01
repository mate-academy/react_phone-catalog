import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Cart({phonesInCart}) {

  const classes = useStyles();
console.log(phonesInCart)
  return (
    <div className={classes.root}>
      {!phonesInCart.length ?
        <h1>Cart is empty</h1>
        : phonesInCart.map(phone => (
        <ExpansionPanel key={phone.age}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{phone.name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {phone.snippet}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    phonesInCart: state.phonesInCart
  }
}

export default connect(mapStateToProps)(Cart);
