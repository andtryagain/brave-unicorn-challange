import React, { Component } from 'react';

import './prompt-form.css';

export default class PromptForm extends Component {
    
    state = {
        engine: 'text-curie-001',
        prompt: '',
    };

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
        const engineLastState = 
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
                <div className="form-floating proposals">
                    <textarea 
                        className="form-control text"
                        placeholder="enter prompt here"
                        onInput={this.onTextAreaChange}
                        value={this.state.prompt}
                        id="floatingTextarea">    
                    </textarea>
                    
                    <label htmlFor="floatingTextarea">
                        enter prompt
                    </label>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end btn-position">
                    <select value={this.state.engine} className='form-select'
                    onChange={this.onSelectBoxChange}>
                        {engines.map((engine) => (
                            <option key={engine}>{engine}</option>
                        ))}        
                    </select>
                    <button className="btn btn-primary" type="submit">send prompt</button>
                </div>
            </form>
        );
    };
}             
             