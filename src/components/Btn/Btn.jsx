import './Btn.scss';
export default ({ title }) => {
    return (
        <button class="Btn" onClick={() => {console.log('Click');
        }}>
            <span class="Btn_inner">
                <p className='Btn_inner_text'>{title}</p>
            </span>
        </button>
    )
}