import './Btn.scss';
export default ({ title }) => {
    return (
        <button className="Btn" onClick={() => {console.log('Click');
        }}>
            <span className="Btn_inner">
                <p className='Btn_inner_text'>{title}</p>
            </span>
        </button>
    )
}