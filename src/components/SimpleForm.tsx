import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

interface SimpleFormProps {
    formHandler : Function,
    inputHandler: Function,
    inputValue: string,
    buttonValue: string,
    label: string,
    formAdditionalStyle? :object,
}

const useStyles = makeStyles({
    form : {
        display: 'flex',
        justifyContent: 'space-between',
        border : '1px solid black',
        padding: '15px 10px',
        width: '500px',
        borderRadius: '15px',
       },
})

const SimpleForm = ( {formHandler, inputValue, buttonValue, inputHandler, label, formAdditionalStyle}:SimpleFormProps ) =>  {
    const classes = useStyles();

  return (
    <form style={formAdditionalStyle} className={classes.form} onSubmit={(e) => formHandler(e)} action="#">
     <TextField value={inputValue} onChange={(e) => inputHandler(e.target.value)} label={`${label}`} variant="standard"/>
     <Button type='submit' variant="outlined">{buttonValue}</Button>  
    </form>
  )
}

export default SimpleForm;