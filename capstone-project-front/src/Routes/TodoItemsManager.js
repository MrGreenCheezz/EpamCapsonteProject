import React, {Component} from 'react'
import TodoAddingComponent from '../Components/TodoAddingComponent'
import TodoItemCard from '../Components/TodoItemCard'

export default class TodoItemsManager extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Items: []
        }
    }
    async componentDidMount() {
        const items = await this.GetListsFromApi()
        this.setState({Items: items})
    }

    async GetListsFromApi() {
        const response = await fetch("http://localhost:21409/getItems?amount=6")
        const jsonResponse = await response.json();
        return jsonResponse;
    }
    render() {
        return (
            <div>

                <TodoAddingComponent Toggled={false} Mode="ItemForm"/>

                <div className='row'>
                    <div
                        className="col"
                        style={{
                            marginTop: 25
                        }}>
                        <div>
                            {
                                this
                                    .state
                                    .Items
                                    .map(
                                        (item) => <TodoItemCard
                                            Title={item.title}
                                            Description={item.description}
                                            DueDate={item.dueDate}
                                            CreationDate={item.creationDate}
                                            Status={item.status}
                                            key={item.id}
                                            Id={item.id}
                                            ListId={item.parentListId}
                                            Mode="InManagerView"></TodoItemCard>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
