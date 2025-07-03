const Person = (props) => {
    return (
        <div>
            {props.person.name} {props.person.number} <button onClick={props.handleDelete}>delete</button>
        </div>
    )
}

const Display = ({persons, search, handleDeleteOf}) => {
  if (search.length > 0) {
    return (
      <div>
        {persons
          .filter(person => 
            person.name.toLowerCase().includes(search.toLowerCase())
          )
          .map(person => <Person key={person.id} person={person} handleDelete={() => handleDeleteOf(person.id)} />)
        }
      </div>
    )
    
  } else {
      return (
        <div>
          {persons.map(person => <Person key={person.id} person={person} handleDelete={() => handleDeleteOf(person.id)} />)}
        </div>
      )
  }
}

export default Display