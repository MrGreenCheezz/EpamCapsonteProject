import React, {Component} from 'react'

export default class TodoItemCard extends Component {
    constructor(props) {
        super(props)
        this.EditButtonClick = this
            .EditButtonClick
            .bind(this);
        this.CancelEditingButtonClick = this
            .CancelEditingButtonClick
            .bind(this);
        this.SaveButtonClick = this
            .SaveButtonClick
            .bind(this);
        this.deleteButtonClick = this
            .deleteButtonClick
            .bind(this)
        this.StatusDict = {
            "0": "NotStarted",
            "1": "InProgress",
            "2": "Completed"
        }
        this.StatusStyle = {
            "0": "danger",
            "1": "primary",
            "2": "success"
        }
        this.state = {
            Lists: [],
            Mode: this.props.Mode,
            Title: this.props.Title,
            Description: this.props.Description,
            DueDate: this.props.DueDate,
            CreationDate: this.props.CreationDate,
            Status: this.props.Status,
            ListId: this.props.ListId,
            IsMobile: false
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }

    deleteButtonClick() {
        fetch('http://localhost:21409/deleteItem?id=' + this.props.Id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }

        })
        this.setState({Mode: "Deleted"})
    }

    resize() {
        let currentHideNav = (window.innerWidth <= 760);
        if (currentHideNav) {
            this.setState({IsMobile: true})
        } else {
            this.setState({IsMobile: false})
        }
        console.log(currentHideNav)
    }

    EditButtonClick() {
        this.setState({Mode: "EditingView"})
    }

    SaveButtonClick() {
        this.setState({Mode: this.props.Mode})
        fetch(
            'http://localhost:21409/editItem?id=' + this.props.Id + "&title=" + this.state.Title +
                    "&description=" + this.state.Description + "&duedate=" + this.state.DueDate + "&creationdate=" +
                    this.state.CreationDate + "&status=" + this.state.Status + "&listid=" + this.state.ListId,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }

            }
        )
    }

    CancelEditingButtonClick() {
        this.setState({
            Mode: this.props.Mode,
            Title: this.props.Title,
            Description: this.props.Description,
            DueDate: this.props.DueDate,
            CreationDate: this.props.CreationDate,
            Status: this.props.Status
        })
    }

    render() {
        switch (this.state.Mode) {
            case "InListView":
                return (
                    <div
                        className={"card border-" + this.StatusStyle[this.state.Status]}
                        style={{
                            marginTop: 20,
                            borderWidth: "thick"
                        }}>
                        <div className='card-body'>
                            <div className="row">
                                <div className="col col-md-auto">
                                    <h2 className='card-title border-bottom border-2'>
                                        {this.state.Title}
                                    </h2>
                                    <p className='card-text fw-bold'>
                                        Finish before:
                                        <span className='fw-normal border-bottom border-2'>{
                                                " " + this
                                                    .state
                                                    .DueDate
                                                    .split('T')[0]
                                            }</span>
                                    </p>
                                    <p className='card-text fw-bold '>
                                        Created at:
                                        <span className='fw-normal border-bottom border-2'>{
                                                " " + this
                                                    .state
                                                    .CreationDate
                                                    .split('T')[0]
                                            }</span>
                                    </p>
                                    <p className='card-text fw-bold'>
                                        Current status:
                                        <span
                                            className={'card-text text-white  text-wrap bg-' + this.StatusStyle[this.state.Status]}
                                            style={{
                                                marginLeft: 10,
                                                borderRadius: 5
                                            }}>
                                            {this.StatusDict[this.state.Status]}
                                        </span>
                                    </p>
                                </div>
                                <div className="col border border-2">
                                    <p className='card-text'>
                                        {this.state.Description}
                                    </p>
                                </div>
                                <div
                                    className="col-md-auto"
                                    style={this.state.IsMobile
                                        ? {
                                            display: "flex"
                                        }
                                        : {}}>

                                    <div
                                        className={this.state.IsMobile
                                            ? "col"
                                            : "row"}>
                                        <i className="bi bi-x-circle" onClick={this.deleteButtonClick}></i>

                                    </div>
                                    <div
                                        className={this.state.IsMobile
                                            ? "col"
                                            : "row"}>
                                        <i className='bi bi-gear' onClick={this.EditButtonClick}></i>
                                    </div>
                                    <div
                                        className={this.state.IsMobile
                                            ? "col"
                                            : "row"}>
                                        <i className="bi bi-arrows-collapse"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case "InManagerView":
                return (
                    <div
                        className={"card border-" + this.StatusStyle[this.state.Status] + " border-4"}
                        style={{
                            marginTop: 20,
                            borderWidth: "thick"
                        }}>
                        <div className='card-body'>
                            <div className="row">
                                <div className="col col-md-auto">
                                    <h2 className='card-title border-bottom border-2'>
                                        {this.state.Title}
                                    </h2>
                                    <p className='card-text fw-bold'>
                                        Finish before:
                                        <span className='fw-normal border-bottom border-2'>{
                                                " " + this
                                                    .state
                                                    .DueDate
                                                    .split('T')[0]
                                            }</span>
                                    </p>
                                    <p className='card-text fw-bold '>
                                        Created at:
                                        <span className='fw-normal border-bottom border-2'>{
                                                " " + this
                                                    .state
                                                    .CreationDate
                                                    .split('T')[0]
                                            }</span>
                                    </p>
                                    <p className='card-text fw-bold'>
                                        Current status:
                                        <span
                                            className={'card-text text-white  text-wrap bg-' + this.StatusStyle[this.state.Status]}
                                            style={{
                                                marginLeft: 10,
                                                borderRadius: 5
                                            }}>
                                            {this.StatusDict[this.state.Status]}
                                        </span>
                                    </p>
                                </div>
                                <div className="col border border-2">
                                    <p className='card-text '>
                                        {this.state.Description}
                                    </p>
                                </div>
                                <div
                                    className="col-md-auto"
                                    style={this.state.IsMobile
                                        ? {
                                            display: "flex"
                                        }
                                        : {}}>

                                    <div
                                        className={this.state.IsMobile
                                            ? "col"
                                            : "row"}>
                                        <i className="bi bi-x-circle" onClick={this.deleteButtonClick}></i>

                                    </div>
                                    <div
                                        className={this.state.IsMobile
                                            ? "col"
                                            : "row"}>
                                        <i className='bi bi-gear' onClick={this.EditButtonClick}></i>
                                    </div>
                                    <div
                                        className={this.state.IsMobile
                                            ? "col"
                                            : "row"}>
                                        <i className="bi bi-arrows-collapse"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case "EditingView":
                return (
                    <div
                        className={"card border-" + this.StatusStyle[this.state.Status]}
                        style={{
                            marginTop: 20
                        }}>
                        <div className='card-body'>
                            <div className="row">
                                <div className="col">
                                    <h2 className='card-title'>
                                        <input
                                            value={this.state.Title}
                                            onChange={(event) => this.setState({Title: event.target.value})}></input>
                                    </h2>
                                    <div className='row'>
                                        <div className="col-md-auto">
                                            <p className='card-text'>
                                                Finish before:
                                            </p>
                                        </div>
                                        <div className="col-md-auto">
                                            <input
                                                onChange={(event) => this.setState({DueDate: event.target.value})}
                                                type="date"
                                                value={this
                                                    .state
                                                    .DueDate
                                                    .split('T')[0]}></input>
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
                                                onChange={(event) => this.setState({CreationDate: event.target.value})}
                                                type="date"
                                                value={this
                                                    .state
                                                    .CreationDate
                                                    .split('T')[0]}></input>
                                        </div>
                                    </div>
                                    <p className='card-text'>
                                        Current status:
                                        <select
                                            className="custom-select"
                                            id="inputGroupSelect01"
                                            defaultValue={this.StatusDict[this.state.Status]}
                                            onChange={(event) => this.setState({Status: event.target.value})}>
                                            <option value="0">NotStarted</option>
                                            <option value="1">InProgress</option>
                                            <option value="2">Completed</option>
                                        </select>
                                    </p>
                                    <div className='row'>
                                        <div className="col-md-auto">
                                            <p className='card-text'>
                                                Change parent list id:
                                            </p>
                                        </div>
                                        <div className="col-md-auto">
                                            <input
                                                onChange={(event) => this.setState({ListId: event.target.value})}
                                                value={this.state.ListId}></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <textarea
                                        onChange={(event) => this.setState({Description: event.target.value})}
                                        className='form-control'
                                        value={this.state.Description}
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
