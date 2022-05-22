import React, { Component } from 'react';
import PromptForm from '../prompt-form';
import PromptResponseList from '../prompt-response-list';
import APIService from '../../services/api-service';

import './app.css'

export default class App extends Component {
    
    initId = Math.floor(Math.random() * 100) * 100;

    apiService = new APIService()
    
    constructor(props) {
        super(props);
        this.state = JSON.parse(window.localStorage.getItem('state')) || {
            // last state from localstorage or new state
            promptsAndResponses: []
        };
    }

    createPromptAndProposal(prompt, response){        
        return {
            id: this.initId++,
            prompt: prompt,
            response: response
        }
    }

    onPromptAdded = (engine, prompt) => {
        window.localStorage.setItem('state', JSON.stringify(this.state));
        // memorizing state from localstorage
        // window.localStorage.setItem('state', null);

        const promptRequest = this.apiService.formData(prompt)
        const sendPrompt = this.apiService.getData(engine, promptRequest)
        
        sendPrompt
        .then(response => (this.setState((state) => {
            //getting the response first then add it to array
            const textResponse = response.choices[0].text;
            //getting response text
            const newPrompt = this.createPromptAndProposal(prompt, textResponse);

            return {
                promptsAndResponses: [
                    ...state.promptsAndResponses,
                    newPrompt
                ]
            };
        }))
        ).catch(error => window.alert(
            `Ooops! Something wrong...\nError: ${error}`)
            )
        // simple error handler
    }

    render() {
        
        return (
            <div className='app'>
                <h1>fun with AI</h1>
                <PromptForm onPromptAdded = { this.onPromptAdded }/>
                <PromptResponseList items = { this.state.promptsAndResponses }/>
            </div>
        );
    };
}