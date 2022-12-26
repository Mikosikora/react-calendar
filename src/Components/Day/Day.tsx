import './Day.css';

const Day = (props: any) => (
    <div onClick={() => props.pickDay(props.title)} className='day' style={{ borderColor: props.today ? "black" : "white" }}>{props.title}</div>
)

export default Day;
