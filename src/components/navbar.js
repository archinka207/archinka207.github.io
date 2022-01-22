import React from 'react';
import { useState } from 'react/cjs/react.development';
import './navbar.css';

function Navbar(props) {
    function handleStartClick (event) {
        event.preventDefault();
        
        for(let i = 0; i < props.len; i++) {
            
            if (props.wordList[i].name == props.currentList) {  
                //ar is a current arr            
                let ar = props.wordList[i].arr;
                // make wordMash
                if (props.testMode == 'word_test') {
                    let st = '';
                    for(let i = 0; i <= props.wordCount; i++) {
                        st += String(ar[parseInt(Math.random() * ar.length)]); 
                        st += " ";
                    }
                    props.setWordMash(st);
                }
                else if (props.testMode == 'context_test') {
                    let sentences = []   
                    let current_sentences = []
                    let sent = ""
                    sentences = props.wordContext.split('\n');
                    const hasWord = (str, word) => str.split(/\s+/).includes(word);

                    function find(word) {
                        for (i in sentences) {
                            if (hasWord(sentences[i],word)){
                                sent = String(sentences[i]);
                                current_sentences.push(sent);
                            }
                        }
                    }
                    let wrd = ''; 
                    wrd += String(ar[parseInt(Math.random() * ar.length)]);
                    find(wrd);
                    props.setWordMash(current_sentences[parseInt(Math.random() * current_sentences.length)]);
                }
            }
        }
        document.getElementById('start').blur();
        props.setHandledWordMash('');
        props.setMode('content');
    }

    function handleSettingsClick (event) {
        event.preventDefault();
        props.setMode('settings');
        props.setCurrentList(props.wordList[0].name);
    }

    function handleInfoClick (event) {
        event.preventDefault();
        props.setMode('info');
    }

    return (
        <div className='nav'>
            <div className='logo'><span className='logo-text'>WM</span></div>
            <div className='navbar-container'>
                <button className='but-navbar' onClick={handleInfoClick}>Информация</button>
                <button className='but-navbar' onClick={handleSettingsClick}>Настройки</button>
                <button className='but-navbar' id = "start" onClick={handleStartClick}>Запустить</button>
            </div>
        </div>
    );
}

export default Navbar;
