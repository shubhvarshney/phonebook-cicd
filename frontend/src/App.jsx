import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Display from './components/Display'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(allPersons => { setPersons(allPersons) })
  }, [])

  const addDetails = (event) => {
    event.preventDefault()
    
    if ((persons.filter(person => person.name === newName)).length > 0) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const currPerson = persons.find(person => person.name == newName)
        const changedPerson = { ...currPerson, number: newNum }
        personService.update(currPerson.id, changedPerson).then(updatedPerson => {
          setPersons(persons.map(person => person.id === currPerson.id ? updatedPerson : person))
          setNewName('')
          setNewNum('')
          setMessage(`Updated ${updatedPerson.name}'s number`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        }).catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        })
      }
    } else {
      const personObject = { name: newName, number: newNum }
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNum('')
        setMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }).catch(error => {
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    }
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleDeleteOf = (id) => {
    if (window.confirm(`delete ${persons.find(person => person.id === id).name}?`)) {
      personService.deletePerson(id).then(deletedPerson => {
        setPersons(persons.filter(person => person.id != id))
        setMessage(`Deleted ${persons.find(person => person.id === id).name}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }).catch(error => {
          setErrorMessage(error.message)
          setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorMessage errorMessage={errorMessage} />
      <Filter search={search} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm addDetails={addDetails} newNum={newNum} newName={newName} handleNameChange={handleNameChange} handleNumChange={handleNumChange} />
      <h2>Numbers</h2>
      <Display persons={persons} search={search} handleDeleteOf={handleDeleteOf}/>
    </div>
  )
}

export default App