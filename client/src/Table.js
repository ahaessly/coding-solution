import React, {Component} from 'react'

const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Created On</th>
          <th>Created By</th>
          <th>Bases</th>
        </tr>
      </thead>
    )
}

const TableBody = (props) => {
    const rows = props.sequences.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.id}</td>
          <td>{row.name}</td>
          <td>{new Date(row.createdAt.value).toLocaleDateString("en-US")}</td>
          <td>{row.creator_name}</td>
          <td>{row.bases}</td>
        </tr>
      )
    })
  
    return <tbody>{rows}</tbody>
  }

class Table extends Component {
  render() {
    if (!this.props.bases) {
        return null
    }
    return (
      <div>
        <h2>Sequences that contain: {this.props.bases}</h2>
        <table>
            <TableHeader />
            <TableBody sequences={this.props.sequences}/>
        </table>

      </div>
    )
  }
}

export default Table