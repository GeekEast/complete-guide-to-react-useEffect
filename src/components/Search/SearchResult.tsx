import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const SearchResult = () => {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('')
  const [data, setData] = useState({ hits: [] });

  const MemorizedGetFetchUrl = useCallback((didCancel) => {
    const fetchData = async () => {
      const result = await axios('https://hn.algolia.com/api/v1/search?query=' + search);
      !didCancel && setData(result.data);
      !!didCancel && console.log('cancel setting...')
    }
    search !== '' && fetchData()
  }, [search]);


  useEffect(() => {
    let didCancel = false;
    !didCancel && MemorizedGetFetchUrl(didCancel);
    return () => {
      // console.log(didCancel);
      console.log('clean');
      didCancel = true;
    }
  }, [MemorizedGetFetchUrl])


  return (
    <div>
      <ul>
        {data.hits.map((item: any) => (
          <li key={item.objectID}>{item.title}</li>
        ))}
      </ul>
      <input type="text" value={query} onChange={evt => setQuery(evt.target.value)} />
      <button onClick={() => setSearch(query)}>Search</button>
    </div>
  )
}
export default SearchResult;