import React, { Component } from 'react';
import PromptResponseItem from '../prompt-response-item';

import './prompt-response-list.css'

export default class PromptResponseList extends Component {
    render() {

        const { items } = this.props;

        const elements = items.map((item) => {
            return (
                <div key={ item.id } className='responses'>
                    <PromptResponseItem item={ item } />
                </div>
            );
        }).reverse()

        return(
            <div>
            <h4>responses</h4>
                { elements }  
            </div>
        )
    }
}
