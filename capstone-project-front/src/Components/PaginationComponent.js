import React, { Component } from 'react'

export class PaginationComponent extends Component {
    constructor(props) {
      super(props)
      this.PageChanged = this.PageChanged.bind(this)
        this.PaginationItems = []
      this.state = {
         PagesCount: this.props.PagesCount
      }
      for(let i = 0; i < this.state.PagesCount; i++){
        this.PaginationItems.push(
            <li className="page-item" key={i}><a className="page-link" onClick={() => this.PageChanged(i)} >{i}</a></li>
        )
    }
    }

    PageChanged(page){
        this.props.ParentPageChanged(page)
    }

    componentDidMount(){
        
    }

  render() {
    return (
     <ul className='pagination justify-content-center'>
       {this.PaginationItems}
     </ul>
    )
  }
}

export default PaginationComponent