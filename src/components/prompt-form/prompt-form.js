import React, { Component } from 'react';

import './prompt-form.css';

export default class PromptForm extends Component {
    
    state = {
        prompt: ''
    };

    onTextAreaChange = (e) => {
        this.setState({
          prompt: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { prompt } = this.state;
        this.setState({ prompt: '' });
        const cb = this.props.onPromptAdded || (() => {});
        cb(prompt);     
    };

    render() {
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
                    <button className="btn btn-primary" type="submit">send prompt</button>
                </div>
            </form>
        );
    };
}             
             