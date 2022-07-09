import './custom-input.scss';

const CustomInput = ({title, inputName, setFunc}) => {
    return (
        <div className="form__group field">
            <input
                   type="text"
                   className="form__field"
                   placeholder="Name"
                   name={inputName}
                   onChange={(e) => setFunc(e.target.value)}
                   id='name'
                   required
            />
            <label htmlFor="name" className="form__label">{title}</label>
        </div>
    );
};

export default CustomInput;