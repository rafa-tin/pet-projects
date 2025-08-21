import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import "./DateInput.css"



export default function DateInput({option, dueDate, onChange}){
    const [selectedDate, setSelectedDate] = useState()

    function dateNow(){
        if (option == true){
            setSelectedDate(new Date())
            return selectedDate
        }else (option == false);{
            return null
        }
    }

    return(
        <DatePicker 
        selected={option ? selectedDate : dueDate }
        onChange={onChange}
        dateFormat="MMMM d, yyyy"
        placeholderText="Select a date"
        className="inputDate"
        />
    )
}