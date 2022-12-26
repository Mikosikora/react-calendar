import './Dropdown.css';
import Day from './../Day/Day';

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

const weekdays = ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"];

const DropdownHeader = () => (
    <>
        {weekdays.map((weekDay) => (<span key={weekDay}>{weekDay}</span>))}
    </>
)

const Dropdown = (props: any) => {
    let startDay =  (new Date(props.year, props.month-1, 1).getDay() + 6) % 7 - 1;
    let monthLength = new Date(props.year, props.month, 0).getDate();
    let monthName = months[props.month-1];
    
    let days = Array(monthLength + startDay);
    days.fill(0)
    days = days.map((_, i) => {
        if(i>startDay){
            return(<Day key={i} title={i-startDay} today={i-startDay===props.day} pickDay={props.pickDay} />);
        }
            
        return(<Day key={i} />);
    });

    return(
        <>
            <div className='dropdown' style={{display: props.show ? "block" : "none"}} >
                <div className="monthSlider">
                    <img className='arrowButton' src="left-arrow.svg" onClick={props.handleBack} alt="" />
                    {monthName} {props.year}
                    <img className='arrowButton' src="right-arrow.svg" onClick={props.handleNext} alt="" />
                </div>
                <div className="header"><DropdownHeader /></div>
                <div className="days">
                    {days}
                </div>
            </div>
        </>
    )
}

export default Dropdown;