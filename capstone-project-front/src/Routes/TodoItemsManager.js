import React, {Component} from 'react'
import PaginationComponent from '../Components/PaginationComponent'
import TodoAddingComponent from '../Components/TodoAddingComponent'
import TodoItemCard from '../Components/TodoItemCard'

export default class TodoItemsManager extends Component {
    constructor(props) {
        super(props)
        this.PaginationChanged = this.PaginationChanged.bind(this)
        this.addItem = this.addItem.bind(this)
        this.state = {
            Items: [],
            PagesCount: 0
        }
    }
    async componentDidMount() {
        const items = await this.GetListsFromApi(6,0)
        this.setState({Items: items})
        const itemscount = await fetch("http://localhost:21409/getItemsCount")
        const countjson = await itemscount.json()
        this.setState({PagesCount: countjson})
    }

   async PaginationChanged(index){
        const items = await this.GetListsFromApi(6,index)
        this.setState({Items: items})
    }

    addItem(Item) {
        var tempArray = this
            .state
            .Items
            tempArray
            .unshift(Item)
        this.setState({Items: tempArray})
    }

    async GetListsFromApi(amount, offset) {
        const response = await fetch("http://localhost:21409/getItems?amount="+amount+"&offset="+offset)
        const jsonResponse = await response.json();
        return jsonResponse;
    }
    render() {
        return (
            <div>

                <TodoAddingComponent Toggled={false} Mode="ItemForm" RefreshFunction={this.addItem}/>

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
                                            remFunction={this.props.remFunction}
                                            ListId={item.parentListId}
                                            Mode="InManagerView"></TodoItemCard>
                                    )
                            }
                        </div>
                    </div>
                </div>
                {this.state.PagesCount > 0 ? <PaginationComponent PagesCount={this.state.PagesCount / 6} ParentPageChanged={this.PaginationChanged}></PaginationComponent>: <div></div> }
            </div>
        )
    }
}
