import React from 'react';
import Jumbotron from '../components/cards/Jumbotron';
import ProductCard from '../components/cards/ProductCard';
import { useSearch } from '../context/search';

const Search = () => {
    const[values,setValues] = useSearch()
  return (
    <>
    <Jumbotron title="Search results" subTitle={values?.results?.length < 1 ? "No Product found":`found ${values?.results?.length} products`}
    />
  <div className="container mt-3">
    <div className="row">
        {values?.results?.map(p=>(
            <div key={p._id} className='col-md-6'>
<ProductCard p={p} />
            </div>
        ))}
    </div>

  </div>
    </>
  )
}

export default Search