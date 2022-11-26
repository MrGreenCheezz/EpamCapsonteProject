import React, {Component} from 'react'
import TodoItemCard from './TodoItemCard'

export default class TodoList extends Component {
    constructor(props) {
        super(props)
        this.EditButtonClick = this
            .EditButtonClick
            .bind(this)
        this.SaveButtonClick = this
            .SaveButtonClick
            .bind(this)
        this.CancelEditingButtonClick = this
            .CancelEditingButtonClick
            .bind(this)
        this.deleteButtonClick = this
            .deleteButtonClick
            .bind(this)
        this.HideListButtonClick = this
            .HideListButtonClick
            .bind(this)
        this.hideCompletedItems = this
            .hideCompletedItems
            .bind(this)
        this.hideButtonClicked = this
            .hideButtonClicked
            .bind(this)
        this.CopyList = this.CopyList.bind(this)
        this.state = {
            ChildItems: [],
            Mode: this.props.Mode,
            Title: this.props.ListTitle,
            Description: this.props.ListDescription,
            HideCompleteItems: false,
            isHiden: this.props.isHiden
        }
    }
    async componentDidMount() {
        const items = await this.GetItemsFromApi()
        this.setState({ChildItems: items})
    }

    async GetItemsFromApi() {
        const response = await fetch(
            "http://localhost:21409/getChildItems?parentListId=" + this.props.Id
        )
        const jsonResponse = await response.json();
        return jsonResponse;
    }

    EditButtonClick() {
        this.setState({Mode: "EditMode"})
    }

    SaveButtonClick() {
        this.setState({Mode: this.props.Mode})
        fetch(
            'http://localhost:21409/editList?id=' + this.props.Id + "&title=" + this.state.Title +
                    "&description=" + this.state.Description,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }

            }
        ).then(response => response.json())
    }

    HideListButtonClick() {
        this.setState({isHiden: !this.state.isHiden})
        if(this.state.Mode === "FullView"){
            this.setState({Mode: "Deleted"})
        }
        fetch(
            'http://localhost:21409/editList?id=' + this.props.Id + "&ishidden=" + !this.state.isHiden,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }

            }
        ).then(response => response.json())
    }

    deleteButtonClick() {
        fetch('http://localhost:21409/deleteList?id=' + this.props.Id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }

        })
        this
            .props
            .RefreshFunction()
        this.setState({Mode: "Deleted"})
    }

    CancelEditingButtonClick() {
        this.setState({Mode: this.props.Mode})
    }

    hideCompletedItems() {
        this.setState({
            HideCompleteItems: !this.state.HideCompleteItems
        })
    }

    CopyList(withItems){
        if(withItems){
            fetch('http://localhost:21409/copyList?id=' + this.props.Id + "&withItems=true", {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }

        }).then(response => response.status === 200? window.location.reload(true): console.log(response.status))
        }
        else{
            fetch('http://localhost:21409/copyList?id=' + this.props.Id + "&withItems=false", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
    
            }).then(response => response.status === 200? window.location.reload(true): console.log(response.status))
        }
    }

    hideButtonClicked() {
        if (this.state.Mode === "ItemsHidenView") {
            this.setState({Mode: this.props.Mode})
        } else {
            this.setState({Mode: "ItemsHidenView"})
        }
    }

    render() {
        switch (this.state.Mode) {
            case "FullView":
                return (
                    <div
                        className='card border-dark bg-light'
                        style={{
                            marginTop: 25
                        }}>

                        <div className='card-body'>
                            <div className="row">
                                <h1 className='col card-title border-bottom border-2 border-dark text-center'>
                                    {this.state.Title}

                                </h1>
                                <div className='col-md-auto'>
                                    <i
                                        className="bi bi-chevron-double-down"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"></i>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button className="dropdown-item" onClick={this.hideButtonClicked}>Show/Hide list items</button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={this.hideCompletedItems}>Show/Hide completed items</button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item"onClick={this.HideListButtonClick}>Hide list from view</button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item"onClick={()=> this.CopyList(true)}>Copy list with items</button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item"onClick={()=> this.CopyList(false)}>Copy list without items</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <p className='card-text'>
                                {this.state.Description}
                            </p>
                            <p className='card-text'>
                                List Id: {this.props.Id}
                            </p>
                            <p>
                                {this.state.ChildItems.length}
                                : tasks
                            </p>
                            <div>
                                {
                                    this
                                        .state
                                        .ChildItems
                                        .map((item) => {
                                            if (item.status == "2" & this.state.HideCompleteItems === true) {
                                                return (<div key={item.id}></div>)
                                            } else {
                                                return (
                                                    <TodoItemCard
                                                        Title={item.title}
                                                        Description={item.description}
                                                        DueDate={item.dueDate}
                                                        CreationDate={item.creationDate}
                                                        Status={item.status}
                                                        key={item.id}
                                                        Id={item.id}
                                                        ListId={item.parentListId}
                                                        Mode="InListView"></TodoItemCard>
                                                )
                                            }
                                        })
                                }
                            </div>

                        </div>
                    </div>
                )
            case "ManagerModeView":
                return (
                    <div
                        className='card border-dark bg-light'
                        style={{
                            marginTop: 25
                        }}>
                        <div className='card-body'>
                            <h1 className='card-title'>
                                {this.state.Title}
                            </h1>
                            <p className='card-text'>
                                {this.state.Description}
                            </p>
                            <p className='card-text'>
                                List Id: {this.props.Id}
                            </p>
                            <p className='card-text'>
                                Is hidden: {this.state.isHiden.toString()}
                            </p>
                            <div className='row'>

                                <div className='col-md-auto'>
                                    <i
                                        className="bi bi-x-circle"
                                        onClick={this.deleteButtonClick}
                                        title="Delete list"></i>

                                </div>
                                <div className='col-md-auto'>
                                    <i className='bi bi-gear' onClick={this.EditButtonClick} title="Edit list"></i>
                                </div>
                                <div className='col-md-auto'>
                                    <i className="bi bi-arrows-collapse" title="Show/Hide list from view" onClick={this.HideListButtonClick}></i>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            case "ItemsHidenView":
                return (
                    <div
                        className='card border-dark bg-light'
                        style={{
                            marginTop: 25
                        }}>
                        <div className='card-body'>
                            <div className="row">
                                <h1 className='col card-title border-bottom border-2 border-dark text-center'>
                                    {this.state.Title}

                                </h1>
                                <div className='col-md-auto'>
                                    <i
                                        className="bi bi-chevron-double-down"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"></i>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <button className="dropdown-item" onClick={this.hideButtonClicked}>Show/Hide list items</button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item">Show/Hide completed items</button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item">Hide list from view</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <p className='card-text'>
                                {this.state.Description}
                            </p>
                            <p className='card-text'>
                                List Id: {this.props.Id}
                            </p>
                            <p>
                                {this.state.ChildItems.length}
                                : tasks
                            </p>
                            <div className="row justify-content-md-center">
                                <div className="col-md-auto">
                                    <i className="bi bi-chevron-compact-down "></i>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case "EditMode":
                return (
                    <div
                        className='card border-dark bg-light'
                        style={{
                            marginTop: 25
                        }}>
                        <div className='card-body'>
                            <h1 className='card-title'>
                                <input
                                    value={this.state.Title}
                                    onChange={(event) => this.setState({Title: event.target.value})}></input>
                            </h1>
                            <p className='card-text'>
                                <textarea
                                    onChange={(event) => this.setState({Description: event.target.value})}
                                    className='form-control'
                                    value={this.state.Description}
                                    style={{
                                        resize: "none"
                                    }}></textarea>
                            </p>
                            <p className='card-text'>
                                List Id: {this.props.Id}
                            </p>
                            <div className='row'>
                                <div className="col">
                                    <button
                                        className='btn btn-success'
                                        style={{
                                            marginLeft: 10
                                        }}
                                        type="button"
                                        onClick={this.SaveButtonClick}>Save</button>
                                    <button
                                        className='btn btn-danger'
                                        style={{
                                            marginLeft: 10
                                        }}
                                        type="button"
                                        onClick={this.CancelEditingButtonClick}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case "Deleted":
                return (<div></div>)
        }

    }
}
