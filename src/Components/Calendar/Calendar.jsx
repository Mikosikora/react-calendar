import { useRef, useState } from 'react';
import './Calendar.css';
import leftArrowIcon from "./left-arrow.svg";
import rightArrowIcon from "./right-arrow.svg";

const dateHtmlFormat = (date) =>{
    return date.year.toString().padStart(4, '0') + "-" + date.month.toString().padStart(2, '0') + "-" + date.day.toString().padStart(2, '0');
}

const Day = (props) => {
    return(
        <>
            <div onClick={() => props.pickDay(props.title)} className='day' style={{ borderColor: props.today ? "black" : "white" }}>{props.title}</div>
        </>
    )
}

const Dropdown = (props) => {

    let header = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"].map((weekDay) => (
        <span key={weekDay}>{weekDay}</span>
    ));

    const months = [
        "Styczeń",
        "Luty",
        "Marzec",
        "Kwiecień",
        "Maj",
        "Czerwiec",
        "Lipiec",
        "Sierpień",
        "Wrzesień",
        "Październik",
        "Listopad",
        "Grudzień",
    ];

    let startDay =  (new Date(props.year, props.month-1, 1).getDay() + 6) % 7 - 1;
    let monthLength = new Date(props.year, props.month, 0).getDate();
    
    let days = Array(monthLength + startDay);
    days.fill(0)
    days = days.map((_, i) => {
        if(i>startDay){
            return(<Day key={i} title={i-startDay} today={i-startDay===props.day} pickDay={props.pickDay} />);
        }else{
            return(<Day key={i} />);
        }

    });

    return(
        <>
            <div className='dropdown' style={{display: props.show ? "block" : "none"}} >
                <div className="monthSlider">
                    <img className='arrowButton' src={leftArrowIcon} onClick={props.handleBack} alt="" />
                    {months[props.month-1]} {props.year}
                    <img className='arrowButton' src={rightArrowIcon} onClick={props.handleNext} alt="" />
                </div>
                <div className="header">{header}</div>
                <div className="days">
                    {days}
                </div>
            </div>
        </>
    )
}

const Calendar = () => {
    const [date, setDate] = useState({day: 1, month: 12, year: 2022});
    const [show, setShow] = useState(false);

    const onFocusHandler = () => {
        setShow(true);
        console.log("Focus!")
    }

    const next = () => {
        let month =  date.month + 1 === 13 ? 1 : date.month + 1;
        let year = date.month + 1 === 13 ? date.year+1 : date.year
        if(year<2030){
            setDate({day: date.day, month: month, year: year});
            console.log('next');
        }
    }

    const back = () => {
        let month = date.month - 1 === 0 ? 12 : date.month - 1;
        let year = date.month - 1 === 0 ? date.year-1 : date.year
        if(year>2019){
            setDate({day: date.day, month: month, year: year});
            console.log('next');
        }
    }

    const pickDay = (d) => {
        setDate({day: d, month: date.month, year: date.year});
        console.log(date)
    }

    /**
     * @type {HTMLInputElement}
     */
    
    let inputEl = useRef(null);

    if (inputEl.current !== null){
        inputEl.current.value = dateHtmlFormat(date);
    }

    const onInputHandler = (e) =>{
        let date = new Date(e.target.value);
        if(e.target.value !== ""){
            setDate({day: date.getDate(), month: date.getMonth()+1, year: date.getFullYear()})
        }
    }

    return(
        <>
            <div>
                <input type="date" className="date-input" ref={inputEl} onInput={onInputHandler} onFocus={onFocusHandler} />
                <Dropdown day={date.day} month={date.month} year={date.year} show={show} handleNext={next} handleBack={back} pickDay={pickDay} />
            </div>
        </>
    )
}

export default Calendar;