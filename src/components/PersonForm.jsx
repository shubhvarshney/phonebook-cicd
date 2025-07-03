const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addDetails}>
        <div>
          name: <input data-testid="name" value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input data-testid="number" value={props.newNum} onChange={props.handleNumChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm