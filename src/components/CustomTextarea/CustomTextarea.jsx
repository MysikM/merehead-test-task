import './custom-textarea.scss';

const CustomTextarea = ({title, nameTextarea, setFunc}) => {
    return (
        <div className="form__group field">
            <textarea
                className="form__field form__textarea"
                placeholder="Name"
                name={nameTextarea}
                onChange={(e) => setFunc(e.target.value)}
                id='name'
                required
            />
            <label htmlFor="name" className="form__label">{title}</label>
        </div>
    );
};

export default CustomTextarea;