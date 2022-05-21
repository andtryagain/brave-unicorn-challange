import React, { Component } from 'react';

import './prompt-response-item.css'

export default class PromptResponseItem extends Component {
    render() {

        const { prompt, response } = this.props.item;

        return (        
            <table>
                <tbody>
                    <tr>
                        <td className='coll1'>prompt:</td>
                        <td className='coll2'>{ prompt }</td>
                    </tr>
                    <tr>
                        <td className='coll1'>response:</td>
                        <td className='coll2'>{ response }</td>
                    </tr>
                </tbody>
            </table>
        );
    };
}