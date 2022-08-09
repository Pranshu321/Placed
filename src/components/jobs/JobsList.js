import data from "./data.json";
import Jobs from "./components/Jobs";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import './scss/app.css';
import './scss/main.css';
import { useHistory } from 'react-router-dom';
import { auth, database } from '../../firebase/firebaseConfig';
import DataService from '../../firebase/firebaseOperations';
import { onAuthStateChanged } from 'firebase/auth';

import { collection, getDocs } from "firebase/firestore";



function JobsList() {
  const [filterKeywords, setfilterKeywords] = useState([]);
  const [display, setdisplay] = useState(false);
  const navigation = useHistory();

  const setSearchKeyword = (data) => {
    setfilterKeywords(data);
  };

  const addFilterKeywords = (data) => {
    if (!filterKeywords.includes(data)) {
      setfilterKeywords([...filterKeywords, data]);
    }
  };

  const deleteKeyword = (data) => {
    const newKeywords = filterKeywords.filter((key) => key !== data);
    setfilterKeywords(newKeywords);
  };

  const clearAll = () => {
    setfilterKeywords([]);
  };

  useEffect(() =>
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setdisplay(false);
        // ...
      } else {
        // User is signed out
        setdisplay(true);
        // ...
      }
    })

    , []);

  return (
    <>
      {display ? navigation.push("/login") :
        <div>
          <div className="header"> </div>



          {filterKeywords.length > 0 && (
            <Header
              keywords={filterKeywords}
              removeKeywords={deleteKeyword}
              clearAll={clearAll}
            />
          )}

          <Jobs
            keywords={filterKeywords}
            data={data}
            setKeywords={addFilterKeywords}
          />
        </div>
      }
    </>

  );
}

export default JobsList;
