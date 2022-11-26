import React, {Component} from 'react'
import TodoList from '../Components/TodoList'
import PaginationComponent from '../Components/PaginationComponent'

export default class TodoListsRenderer extends Component {
    constructor(props) {
        super(props)
        this.PaginationChanged = this.PaginationChanged.bind(this)
        this.state = {
            Lists: [],
            PagesCount: 0
        }
    }
    async componentDidMount() {
        const lists = await this.GetListsFromApi(6,0)
        this.setState({Lists: lists})
        const itemscount = await fetch("http://localhost:21409/getListsCount")
        const countjson = await itemscount.json()
        this.setState({PagesCount: countjson})
    }

    async GetListsFromApi(amount, offset) {
        const response = await fetch("http://localhost:21409/getLists?amount="+amount+"&offset="+offset)
        const jsonResponse = await response.json();
        return jsonResponse;
    }

    async PaginationChanged(index){
        const lists = await this.GetListsFromApi(6, index)
        this.setState({Lists: lists})
    }

    render() {
        return (
            <div className='row'>
                <div className="col" style={{marginTop:25}}>
                    {this.state.Lists.map((item) => {
                        if(item.isHiden){
                            return(<div key={item.id}></div>)
                        }
                        else{
                           return( <TodoList ListTitle={item.listTitle} ListDescription={item.listDescription} key={item.id} Id={item.id} isHiden={item.isHiden} Mode="FullView"/>)
                        }
                    }                   
                    )}
                </div>
                {this.state.PagesCount > 0 ? <PaginationComponent PagesCount={this.state.PagesCount / 6} ParentPageChanged={this.PaginationChanged}></PaginationComponent>: <div></div> }
            </div>

        )
    }
}
