import { Component } from 'react';

class Form extends Component {

    constructor(props) {
        super(props);
        
        this.initialState = {
            startDate: '',
            endDate: ''
        };

        this.state = this.initialState;
    }

    handleChange = events => {
        const { startDate, endDate, value } = events.target;
        this.setState({
            [startDate] : value  ,
            [endDate] : value
        });
        
    }

    submitForm = () => {
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {
        const { startDate, endDate } = this.state; 

        return (
            <div className="Form">
                <form>
                    <label>startDate</label>

                    <input 
                        type="date" 
                        startDate="startDate" 
                        value={startDate} 
                        onChange={this.handleChange} />

                    <label>endDate</label>
                    <input 
                        type="date" 
                        name="endDate" 
                        value={endDate} 
                        onChange={this.handleChange}/>

                    <input 
                        type="button" 
                        value="Submit" 
                        onClick={this.submitForm} />
                </form>
            </div>
        );
    }
}

export default Form;