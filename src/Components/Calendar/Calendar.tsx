import { ChangeEvent, useRef, useState } from 'react';
import Dropdown from './../Dropdown/Dropdown';
import './Calendar.css';

const dateHtmlFormat = (date: { day: any; month: any; year: any; }) =>{
    return date.year.toString().padStart(4, '0') + "-" + date.month.toString().padStart(2, '0') + "-" + date.day.toString().padStart(2, '0');
}

const Calendar = () => {
    const [date, setDate] = useState({day: 1, month: 12, year: 2022});
    const [show, setShow] = useState(false);

    const onFocusHandler = () => {
        setShow(true);
        console.log("Focus!")
    }

    const onClickNext = () => {
        let month =  date.month + 1 === 13 ? 1 : date.month + 1;
        let year = date.month + 1 === 13 ? date.year+1 : date.year
        if(year<2030){
            setDate({day: date.day, month: month, year: year});
            console.log('next');
        }
    }

    const onClickBack = () => {
        let month = date.month - 1 === 0 ? 12 : date.month - 1;
        let year = date.month - 1 === 0 ? date.year-1 : date.year
        if(year>2019){
            setDate({day: date.day, month: month, year: year});
            console.log('next');
        }
    }

    const pickDay = (day: number) => {
        setDate({day, month: date.month, year: date.year});
        console.log(date)
    }

    /**
     * @type {HTMLInputElement}
     */
    
    let inputEl = useRef<HTMLInputElement>(null);
    
    if (inputEl.current !== null){
        inputEl.current.value = dateHtmlFormat(date);
    }

    const onInputHandler = (e: ChangeEvent<HTMLInputElement>) =>{
		const inputValue = e.target.value;
		const date = new Date(inputValue);
		if (inputValue !== "") {
			setDate({ day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() })
		}
    }

    return(
        <div className="calendar" onClick={onFocusHandler}>
            <span className="calendar-title">Od kiedy wolne</span>
            <span className="calendar-icon"><img src="calendar.svg" alt="calendar icon" /></span>
            <input type="date" className="calendar-input" ref={inputEl} onInput={onInputHandler} />
            <Dropdown day={date.day} month={date.month} year={date.year} show={show} handleNext={onClickNext} handleBack={onClickBack} pickDay={pickDay} />
        </div>
    )
}

export default Calendar;
