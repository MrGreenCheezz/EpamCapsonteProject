import React, {Component} from 'react'
import {Animate, AnimateGroup} from 'react-simple-animate'

export default class TodoAddingComponent extends Component {
    constructor(props) {
        super(props)
        this.expandButtonClick = this
            .expandButtonClick
            .bind(this)
        this.addItemButtonClicked = this
            .addItemButtonClicked
            .bind(this)
        this.addListButtonClicked = this
            .addListButtonClicked
            .bind(this)
        this.state = {
            Toggled: this.props.Toggled,
            Mode: this.props.Mode,
            FormHaveErrors: false,
            Style: 'Collapsed',
            ItemTitle: "",
            ItemDescription: "",
            ItemCreationDate: "",
            ItemDueDate: "",
            ItemStatus: 0,
            ListTitle: "",
            ListDescription: ""
        }
    }

    expandButtonClick() {
        this.setState({
            Toggled: !this.state.Toggled
        })
    }

    addItemButtonClicked() {
        if(this.state.ItemTitle === null || this.state.ItemTitle.trim() === ""){
            this.setState({FormHaveErrors: true})
            return
        }
        if(this.state.ItemDescription === null || this.state.ItemDescription.trim() === ""){
            this.setState({FormHaveErrors: true})
            return
        }
        if(this.state.ItemCreationDate === null || this.state.ItemCreationDate.trim() === ""){
            this.setState({FormHaveErrors: true})
            return
        }
        if(this.state.ItemDueDate === null || this.state.ItemDueDate.trim() === ""){
            this.setState({FormHaveErrors: true})
            return
        }
        this.setState({FormHaveErrors: false})
        fetch(
            'http://localhost:21409/addItem'+ "?title=" + this.state.ItemTitle +
                    "&description=" + this.state.ItemDescription + "&duedate=" + this.state.ItemDueDate + "&creationdate=" +
                    this.state.ItemCreationDate + "&status=" + this.state.ItemStatus,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }

            }
        )
            .then(response => response.json())
            this.setState({ItemTitle: "",
            ItemDescription: "",
            ItemCreationDate: "",
            ItemDueDate: "",
            ItemStatus: 0})

    }

    addListButtonClicked() {
        if(this.state.ListDescription === null || this.state.ListDescription.trim() === ""){
            this.setState({FormHaveErrors: true})
            return
        }
        if(this.state.ListTitle === null || this.state.ListTitle.trim() === ""){
            this.setState({FormHaveErrors: true})
            return
        }
        this.setState({FormHaveErrors: false})
        fetch(
            'http://localhost:21409/addList'+ "?title=" + this.state.ListTitle +
                    "&description=" + this.state.ListDescription,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }

            }
        )
            .then(response => response.json())
            this.setState({ListTitle: "",
            ListDescription: ""})
    }

    render() {
        if (!this.state.Toggled) {
            switch (this.state.Mode) {
                case "ItemForm":
                    return (

                        <div className='row justify-content-md-center border bg-light'>
                            <div className="col-md-auto">
                                <i className='bi bi-arrow-bar-down' onClick={this.expandButtonClick}></i>
                            </div>
                        </div>

                    )

                case "ListsForm":
                    return (
                        <div className='row justify-content-md-center border bg-light '>
                            <div className="col-md-auto">
                                <i className='bi bi-arrow-bar-down' onClick={this.expandButtonClick}></i>
                            </div>
                        </div>
                    )

            }
        } else {
            switch (this.state.Mode) {
                case "ItemForm":
                    return (

                        <div className="container">
                            <div className='row border justify-content-md-center bg-light'>
                                <div
                                    className="card"
                                    style={{
                                        marginTop: 20
                                    }}>

                                    <div className='card-body'>

                                        <div className="row">
                                            <div className="col">
                                                <h2 className='card-title'>
                                                    <input
                                                        value={this.state.ItemTitle}
                                                        placeholder={"Item title.."}
                                                        onChange={(event) => this.setState({ItemTitle: event.target.value})}></input>
                                                </h2>
                                                <div className='row'>
                                                    <div className="col-md-auto">
                                                        <p className='card-text'>
                                                            Finish before:
                                                        </p>
                                                    </div>
                                                    <div className="col-md-auto">
                                                        <input
                                                            onChange={(event) => this.setState({ItemDueDate: event.target.value})}
                                                            type="date"></input>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className="col-md-auto">
                                                        <p className='card-text'>
                                                            Created at:
                                                        </p>
                                                    </div>
                                                    <div className="col-md-auto">
                                                        <input
                                                            onChange={(event) => this.setState({ItemCreationDate: event.target.value})}
                                                            type="date"></input>
                                                    </div>
                                                </div>
                                                <p className='card-text'>
                                                    Current status:
                                                    <select
                                                        className="custom-select"
                                                        id="inputGroupSelect01"
                                                        onChange={(event) => this.setState({ItemStatus: event.target.value})}>
                                                        <option value="0">NotStarted</option>
                                                        <option value="1">InProgress</option>
                                                        <option value="2">Completed</option>
                                                    </select>
                                                </p>
                                                <div className='row'>
                                                    <div className="col-md-auto"></div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <textarea
                                                    placeholder='Item description..'
                                                    onChange={(event) => this.setState({ItemDescription: event.target.value})}
                                                    className='form-control'
                                                    value={this.state.ItemDescription}
                                                    style={{
                                                        resize: "none"
                                                    }}></textarea>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div
                                                className='col'
                                                style={{
                                                    marginTop: 20
                                                }}>
                                                <button
                                                    className='btn btn-success'
                                                    style={{
                                                        marginLeft: 10
                                                    }}
                                                    type="button"
                                                    onClick={this.addItemButtonClicked}>Add</button>
                                            </div>
                                        </div>

                                    </div>
                                    {this.state.FormHaveErrors? <div className='text-danger'>No empty fields allowed!</div>: <div></div>}                    
                                </div>
                                <div className="col-md-auto">
                                    <i className='bi bi-arrow-bar-down' onClick={this.expandButtonClick}></i>
                                </div>
                            </div>
                        </div>

                    )

                case "ListsForm":
                    return (
                        <div className="container">
                            <div className='row border justify-content-md-center bg-light'>
                                <div
                                    className="card"
                                    style={{
                                        marginTop: 20
                                    }}>

                                    <div className='card-body'>

                                        <div className="row">
                                            <div className="col">
                                                <h2 className='card-title'>
                                                    <input
                                                        value={this.state.ListTitle}
                                                        placeholder={"List title.."}
                                                        onChange={(event) => this.setState({ListTitle: event.target.value})}></input>
                                                </h2>
                                                <div className='row'></div>
                                                <div className='row'>
                                                    <div className="col-md-auto"></div>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <textarea
                                                    placeholder='List description..'
                                                    onChange={(event) => this.setState({ListDescription: event.target.value})}
                                                    className='form-control'
                                                    value={this.state.ListDescription}
                                                    style={{
                                                        resize: "none"
                                                    }}></textarea>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div
                                                className='col'
                                                style={{
                                                    marginTop: 20
                                                }}>
                                                <button
                                                    className='btn btn-success'
                                                    style={{
                                                        marginLeft: 10
                                                    }}
                                                    type="button"
                                                    onClick={this.addListButtonClicked}>Add</button>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.FormHaveErrors? <div className='text-danger'>No empty fields allowed!</div>: <div></div>}                
                                </div>
                                <div className="col-md-auto">
                                    <i className='bi bi-arrow-bar-down' onClick={this.expandButtonClick}></i>
                                </div>
                            </div>
                        </div>
                    )

            }
        }
    }
}
