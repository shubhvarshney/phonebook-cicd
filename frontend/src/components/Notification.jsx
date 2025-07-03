const Notification = (props) => {
    if (props.message == null) {
        return null
    }

    return (
        <div className="message" id="notification">
            {props.message}
        </div>
    )
}

export default Notification