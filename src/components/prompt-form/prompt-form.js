import React, { Component } from 'react';

import './prompt-form.css';

export default class PromptForm extends Component {
    
    // marginOnSelect = true;

    state = {
        engine: 'text-curie-001',
        prompt: '',
    };

    // onSelectBoxClick = () => {
    //     this.marginOnSelect = true;
    //     console.log('clicked');
    // }

    onSelectBoxChange = (e) => {
        this.setState({
            engine: e.target.value
        })
    }

    onTextAreaChange = (e) => {
        this.setState({
          prompt: e.target.value,
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { engine, prompt } = this.state;
        const cb = this.props.onPromptAdded || (() => {});
        cb(engine, prompt);
        this.setState({ prompt: '' });  
    };

    render() {

        const engines = [
            'text-curie-001',
            'text-davinci-002',
            'text-babbage-001',
            'text-ada-001'
        ]

        return (
            <form onSubmit={this.onSubmit}>
                <div 
                className="form-floating proposal"
                //??? no time for that style={ this.marginOnSelect ? ({marginTop: "100px"}) : ({}) }
                >
                    <textarea 
                    className="form-control text"
                    placeholder="enter prompt here"
                    onInput={this.onTextAreaChange}
                    value={this.state.prompt}
                    id="floatingTextarea">    
                    </textarea>
                    
                    <label 
                    htmlFor="floatingTextarea">
                        enter prompt
                    </label>
                </div>

                <div className="d-grid gap-2 
                d-md-flex 
                justify-content-md-end
                engine-and-submit">
                    <label htmlFor='engines' 
                    className='engine'>engine:</label>
                    <select 
                    id='engines' 
                    value={this.state.engine} 
                    className='form-select'
                    onClick={this.onSelectBoxClick}
                    onChange={this.onSelectBoxChange}>
                        {engines.map((engine) => (
                            <option 
                            key={engine}>
                                {engine}
                        </option>
                        ))}        
                    </select>
                    <button 
                    className="btn btn-primary position" 
                    type="submit">
                        send prompt
                    </button>
                </div>
            </form>
        );
    };
}             
             