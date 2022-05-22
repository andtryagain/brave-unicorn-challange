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

    clearResponseList = () => {
        window.localStorage.setItem('state', null);
        this.setState({
            promptsAndResponses: []
        })
    }

    responseHeader = () => {
        return (
            <div className='response-header'>
                <div className='row'>
                    <div className='col'>
                        <h4>responses</h4>
                    </div>
                    <div className='col justify-content-md-end 
                    clear-response-list'>
                        <button
                            className='btn btn-danger' 
                            type='button'
                            onClick= { this.clearResponseList } >
                            clear list
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    onPromptAdded = (engine, prompt) => {
        window.localStorage.setItem('state', JSON.stringify(this.state));
        // memorizing state from localstorage

        const promptRequest = this.apiService.formData(prompt)
        const sendPrompt = this.apiService.getData(engine, promptRequest)
        
        sendPrompt
        .then(response => (this.setState((state) => {
            // console.log(response)
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
            `Ooops! Something wrong...\n${error}`)
            )
        // simple error handler
    }

    render() {
        return (
            <div className='app'>
                <h1>fun with AI</h1>
                <PromptForm onPromptAdded = { this.onPromptAdded }/>
                <this.responseHeader />
                <PromptResponseList items = { this.state.promptsAndResponses }/>
            </div>
        );
    };
}

