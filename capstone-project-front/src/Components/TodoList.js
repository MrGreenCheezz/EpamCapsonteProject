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
        this.state = {
            ChildItems: [],
            Mode: this.props.Mode,
            Title: this.props.ListTitle,
            Description: this.props.ListDescription
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

    deleteButtonClick() {
       fetch(
            'http://localhost:21409/deleteList?id=' + this.props.Id,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }

            }
        )
        this.props.RefreshFunction()
        this.setState({Mode: "Deleted"})
    }

    CancelEditingButtonClick() {
        this.setState({Mode: this.props.Mode})
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
                            <h1 className='card-title border-bottom border-2 border-dark text-center'>
                                {this.state.Title}
                            </h1>
                            <p className='card-text'>
                                {this.state.Description}
                            </p>
                            <p className='card-text'>
                                List Id: {this.props.Id}
                            </p>
                            <div>
                                {
                                    this
                                        .state
                                        .ChildItems
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
                                                Mode="InListView"></TodoItemCard>
                                        )
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
                            <div className='row'>

                                <div className='col-md-auto'>
                                    <i className="bi bi-x-circle" onClick={this.deleteButtonClick}></i>

                                </div>
                                <div className='col-md-auto'>
                                    <i className='bi bi-gear' onClick={this.EditButtonClick}></i>
                                </div>
                                <div className='col-md-auto'>
                                    <i className="bi bi-arrows-collapse"></i>
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
                            <h1 className='card-title'>
                                {this.props.ListTitle}
                            </h1>
                            <p className='card-text'>
                                {this.props.ListDescription}
                            </p>
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
                    return(
                        <div></div>
                    )
        }

    }
}
