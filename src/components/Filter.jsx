const Filter = (props) => {
  return (
    <div>
      filter shown with <input data-testid="filter" value={props.search} onChange={props.handleSearch} />
    </div>
  )
}

export default Filter