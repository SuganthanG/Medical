import "./SearchBar.css"

import React, { useState } from 'react';
export default function(props){

  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
   
    
    e.preventDefault();
    setSearchInput(e.target.value);
   
  };
  
  if (searchInput.length > 0) {

    props.list.filter((val) => {
      var count = val.name.match(searchInput);
      console.log(count);
      return count;
  
  });
  }
  
    return(
        <div className="searchbar">
            <input
          type="search"
            placeholder="Search here"
            onChange={handleChange}
          value={searchInput} 
          />
          <button >Search</button>
        </div>
    )
}