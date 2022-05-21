import React, { Component } from 'react';
import PromptForm from '../prompt-form';
import PromptResponseList from '../prompt-response-list';
import APIService from '../../services/api-service';

import './app.css'

export default class App extends Component {
    
    initId = 100;

    apiService = new APIService()

    state = {
        promptsAndResponses: [
            // { id: 0, prompt: 'test0', response: 'test1'},
            // { id: 1, prompt: 'test0', response: 'test1'},
        ]
    };

    createPromptAndProposal(prompt, response){        
        return {
            id: this.initId++,
            prompt: prompt,
            response: response
        }
    }

    onPromptAdded = (prompt) => {
        const promptRequest = this.apiService.formData(prompt)
        const sendPrompt = this.apiService.getData(promptRequest)
        
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
        )
    }

    render() {
        const list = this.state.promptsAndResponses;
        return (
            <div className='app'>
                <h1>fun with AI</h1>
                <PromptForm onPromptAdded = { this.onPromptAdded }/>
                <PromptResponseList items = { list }/>
            </div>
        );
    };
}