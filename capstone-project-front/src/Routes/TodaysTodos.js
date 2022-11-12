import React, {Component} from 'react'
import TodoItemCard from '../Components/TodoItemCard'

export default class TodaysTodos extends Component {
    constructor(props) {
        super(props)
        this.date = new Date()
        this.dd = String(this.date.getDate()).padStart(2, '0')
        this.mm = String(this.date.getMonth() + 1).padStart(2, '0')
        this.yyyy = this
            .date
            .getFullYear()
        this.state = {
            Items: [],
            CurrentDate: this.yyyy + "-" + this.mm + '-' + this.dd,
            ItemsToRender: []
        }
    }
    async componentDidMount() {
        const items = await this.GetListsFromApi()
        let curItems = []
        this.setState({Items: items})
        this
            .state
            .Items
            .map((item) => {
                if (item.dueDate.split('T')[0] === this.state.CurrentDate) {
                    curItems.push(item)
                }
            })
        this.setState({ItemsToRender: curItems})
    }


async GetListsFromApi() {
    const response = await fetch("http://localhost:21409/getItems?amount=6")
    const jsonResponse = await response.json();
    return jsonResponse;
}
render() {
    return (
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
                            .ItemsToRender
                            .map(
                                (item) => <TodoItemCard
                                    Title={item.title}
                                    Description={item.description}
                                    DueDate={item.dueDate}
                                    CreationDate={item.creationDate}
                                    Status={item.status}
                                    ListId={item.parentListId}
                                    Id={item.id}
                                    key={item.id}
                                    Mode="InManagerView"></TodoItemCard>
                            )
                    }
                </div>
            </div>
        </div>
    )
}
}