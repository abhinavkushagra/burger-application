import React from 'react';
import styles from './Input.module.css'

const input = props => {
    let inputElement = null;
    const inputEleArray = [styles.InputElement]

    if(props.invalid && props.needValidation){
        inputEleArray.push(styles.Invalid)
    }
 
    switch (props.elementType) {
        case 'input':
            inputElement = <input className = {inputEleArray.join(' ')} {...props.elementConfig} value = {props.value} onChange={props.changed}/>
            break;
        case 'select':
            inputElement = (
                <select className = {inputEleArray.join(' ')} value={props.value} onChange={props.changed}> 
                    {props.elementConfig.options.map( each =>
                        <option key={each.value} name={each.value} value={each.value}> {each.displayValue} </option>
                    )}
                </select>
            )
            break;
        default:
            inputElement = <input className = {inputEleArray.join(' ')}{...props.elementConfig} value = {props.value}  onChange={props.changed}/>
    }

    return (
        <div className = {styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>

    )
}

export default input;