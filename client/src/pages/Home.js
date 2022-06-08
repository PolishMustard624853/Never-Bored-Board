import React from 'react';
import { useQuery } from '@apollo/client';
import Paris from '../images/paris.jpg'
import Bangkok from '../images/bangkok.jpg'
import London from '../images/london.jpg'
import NewYork from '../images/newyork.jpg'
import Dubai from '../images/dubai.jpg'
import '../pages/index.css'

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
      <div className='top'>
        <div className='img'>
        Paris
          <ul><img src={Paris} alt='' className='i-img'></img></ul>
        </div>
      
      
        <div className='img'>
        Bangkok
          <ul><img src={Bangkok} alt='' className='i-img'></img></ul>
        </div>
      
      
        <div className='img'>
        London
          <ul><img src={London} alt='' className='i-img'></img></ul>
        </div>
      
        <div className='img'>
        New York
          <ul><img src={NewYork} alt='' className='i-img'></img></ul>
        </div>
      

        <div className='img'>
        Dubai
          <ul><img src={Dubai} alt='' className='i-img'></img></ul>
        </div>
    </div>
    </main>
  );

};

export default Home;
