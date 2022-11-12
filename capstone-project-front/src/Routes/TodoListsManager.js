import React, {Component} from 'react'
import TodoAddingComponent from '../Components/TodoAddingComponent'
import TodoList from '../Components/TodoList'

export default class TodoListsManager extends Component {
    constructor(props) {
        super(props)
        this.refreshList = this
            .refreshList
            .bind(this)
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

    async refreshList() {
        const lists = await this.GetListsFromApi()
        this.setState({Lists: lists})
    }

    render() {
        return (
            <div>
                <TodoAddingComponent Toggled={false} Mode="ListsForm"/>
                <div className='row'>
                    <div
                        className="col"
                        style={{
                            marginTop: 25
                        }}>
                        {
                            this
                                .state
                                .Lists
                                .map(
                                    (item) => <TodoList
                                        RefreshFunction = {this.refreshList}
                                        ListTitle={item.listTitle}
                                        ListDescription={item.listDescription}
                                        key={item.id}
                                        Id={item.id}
                                        Mode="ManagerModeView"/>
                                )
                        }
                    </div>
                </div>
            </div>
        )
    }
}
