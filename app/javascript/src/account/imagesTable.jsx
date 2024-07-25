import React, { useState, useEffect } from 'react';

const ImagesTable = ({userImages, handleImageDelete}) => {
  return (
    <table className='table table-striped table-hover table-bordered table-secondary align-items-center'>
      <thead>
        <tr className='align-middle text-center'>
          <th></th>
          <th>Brewery Name</th>
          <th>Date Posted</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {userImages.length > 0 ? (
          userImages.map((image, index) => (
            <tr key={index} className='align-middle text-center'>
              <td className='d-flex justify-content-center'>
                <div className='user-image border' style={{ backgroundImage: `url(${image.upload})` }}></div>
              </td>
              <td>{image.brewery_name}</td>
              <td>{image.created_at.split('T')[0]}</td>
              <td>
                <div className='d-flex flex-column gap-1'>
                  <button
                    className='btn btn-sm btn-outline-primary text-ochre border-0'
                    onClick={() => (window.location.href = `/brewery/${image.brewery_id}`)}
                  >
                    View
                  </button>
                  <button
                    className='btn btn-sm btn-outline-danger border-0'
                    onClick={(e) => handleImageDelete(e, image.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr className='align-middle text-center'>
            <td>No Images Yet</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default ImagesTable;