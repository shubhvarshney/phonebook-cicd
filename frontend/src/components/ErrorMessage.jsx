const ErrorMessage = (props) => {
    if (props.errorMessage == null) {
        return null
    }

    return (
        <div className="message" id="error">
            {props.errorMessage}
        </div>
    )
}

export default ErrorMessage