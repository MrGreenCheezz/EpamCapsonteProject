import React, {Component} from 'react'
import TodoList from '../Components/TodoList'

export default class TodoListsRenderer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Lists: []
        }
    }
    async componentDidMount() {
        const lists = await this.GetListsFromApi()
        this.setState({Lists: lists})
    }

    async GetListsFromApi() {
        const response = await fetch("http://localhost:21409/getLists?amount=6")
        const jsonResponse = await response.json();
        return jsonResponse;
    }
    render() {
        return (
            <div className='row'>
                <div className="col" style={{marginTop:25}}>
                    {this.state.Lists.map((item) =>
                    <TodoList ListTitle={item.listTitle} ListDescription={item.listDescription} key={item.id} Id={item.id} Mode="FullView"/>
                    )}
                </div>
            </div>

        )
    }
}
