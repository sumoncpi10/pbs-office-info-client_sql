import React from 'react';

const Loading = () => {
    return (
        <div className='d-flex justify-content-center'>
            <div className="spinner-border text-primary" role="status">
            </div>
            <br></br>
            <h1 className='text-5xl text-indigo-700'>Loading..........</h1>
        </div>
    );
};

export default Loading;