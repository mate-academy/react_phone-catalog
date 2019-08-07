import React from 'react'

class PhonesPage extends React.Component {
  componentDidMount = () => {
    this.props.loadData()
  }

  render() {
    console.log(this.props.phones);
    return(
      <div>
        <h2>Phones page</h2>
      </div>
    )
  }
}

export default PhonesPage