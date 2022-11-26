import React, {Component} from 'react'

export class ReminderComponent extends Component {
    constructor(props) {
        super(props)
        this.StyleDict = {
            "0": "secondary",
            "1": "danger",
            "2": "Completed"
        }
        this.state = {
            style: 0,
            Mode: "Hiden"
        }
    }

    checkTime() {
        var today = new Date();
        var time = ('0' + today.getHours()).slice(-2) + ":" + (
            '0' + today.getMinutes()
        ).slice(-2)
        if (time == this.props.Time) {
            this.setState({style: 1, Mode: "Show"})
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.checkTime()
        }, 1000);
    }

    render() {
        switch (this.state.Mode) {
            case "Hiden":
                return (<div></div>)
            case "Show":
                return (
                    <div className={'card border-' + this.StyleDict[this.state.style]}>
                        <div className='card-body'>
                            <div className='card-text'>
                                Hey! Its time to finish: {this.props.Title}
                            </div>
                        </div>
                    </div>
                )
        }
    }
}

export default ReminderComponent