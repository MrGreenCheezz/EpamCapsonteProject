import React, {Component} from 'react'
import TodoAddingComponent from '../Components/TodoAddingComponent'
import TodoList from '../Components/TodoList'
import PaginationComponent from '../Components/PaginationComponent'

export default class TodoListsManager extends Component {
    constructor(props) {
        super(props)
        this.PaginationChanged = this.PaginationChanged.bind(this)
        this.refreshList = this
            .refreshList
            .bind(this)
        this.addList = this
            .addList
            .bind(this)
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
    
    async refreshList() {
        const lists = await this.GetListsFromApi()
        this.setState({Lists: lists})
    }

    addList(listItem) {
        console.log(listItem)
        var tempArray = this
            .state
            .Lists
            tempArray
            .unshift(listItem)
        this.setState({Lists: tempArray})
    }

    render() {
        return (
            <div>
                <TodoAddingComponent
                    Toggled={false}
                    Mode="ListsForm"
                    RefreshListFunction={this.addList}/>
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
                                        RefreshFunction={this.refreshList}
                                        ListTitle={item.listTitle}
                                        isHiden={item.isHiden}
                                        ListDescription={item.listDescription}
                                        key={item.id}
                                        Id={item.id}
                                        Mode="ManagerModeView"/>
                                )
                        }
                    </div>
                </div>
                {this.state.PagesCount > 0 ? <PaginationComponent PagesCount={this.state.PagesCount / 6} ParentPageChanged={this.PaginationChanged}></PaginationComponent>: <div></div> }
            </div>
        )
    }
}
