import React, { useState,useEffect} from 'react';
import './body.css';
import Navbar from './navbar.js';
import Content from './content';
import Settings from './settings.js';
import Info from './info.js'

function Body() {
    const[wordList,setWordList] = useState([]);
    const[currentList,setCurrentList] = useState('');
    const[wordMash,setWordMash] = useState('')
    const[handledWordMash,setHandledWordMash] = useState('');
    const[mode,setMode] = useState('info');
    const[wordCount,setWordCount] = useState(10);
    const[testMode,setTestMode] = useState('context_test')
    const[wordContext,setWordContext] = useState("");
    const[complexity,setComplexity] = useState(1);

    //fetch("https://archinka207.github.io/lsls.json")
    //.then(response => 
    //    response.json()
    //)
    //.then(data => JSON.stringify(data)
    //)
    //.then(dt => {
    //    setWordContext(JSON.parse(dt));
    //}); 

    useEffect(() => {
        fetch('https://archinka207.github.io/eng_sentences.tsv.txt')
        .then(response => response.text())
        .then(data => setWordContext(String(data)));
    },[]);

    useEffect(() => {
        getWordList();
    },[]);

    useEffect(() => {
        saveWordlist(wordList);
    },[wordList]);

    useEffect(() => {
        function handleKey (event) {
            if(event.key == wordMash[0]) {
                setHandledWordMash(handledWordMash + event.key);
                setWordMash(wordMash.substring(1));
            }
            else if (event.key != wordMash[0] && mode == 'content' && complexity == 2) {
                alert('Вы ошиблись, что бы повторно начать нажмите Запустить');
                setWordMash('');
                setHandledWordMash('');
            }
        }
        document.addEventListener('keyup',handleKey);
        return () => {
            document.removeEventListener('keyup',handleKey);
        }
    },[wordMash,mode,complexity]); 

    

    function saveWordlist (wrd_l) {
        localStorage.setItem("wordList",JSON.stringify(wrd_l));
    }

    function getWordList () {
        if(localStorage.getItem("wordList") === null ) {
            localStorage.setItem("wordList",JSON.stringify([]));
        }
        else {
            let savedWordList = JSON.parse(localStorage.getItem("wordList",JSON.stringify(wordList)));
            setWordList(savedWordList);
        }
    }

    function addMode() {
        switch (mode) {
            case 'content':
                return(
                    <Content wordMash={wordMash} 
                    handledWordMash={handledWordMash}
                    />);
            case 'settings': 
                return(
                    <Settings setWordList={setWordList} 
                    wordList={wordList}
                    len={wordList.length}
                    wordCount={wordCount}
                    setWordCount={setWordCount}
                    setCurrentList={setCurrentList}
                    currentList={currentList}
                    setTestMode={setTestMode}
                    saveWordlist={saveWordlist}
                    setComplexity={setComplexity}
                    />);
            case 'info':
                return(
                    <Info/>
                );
        }
    }

    return (
        <div className='Body'>
            <Navbar setWordMash={setWordMash} 
                wordList={wordList} 
                len={wordList.length}
                setHandledWordMash={setHandledWordMash}
                setMode={setMode}
                wordCount={wordCount}
                currentList={currentList}
                testMode = {testMode}
                wordContext = {wordContext}
                setCurrentList = {setCurrentList}
            />
            {addMode()}

        </div>
    )
}

export default Body;
