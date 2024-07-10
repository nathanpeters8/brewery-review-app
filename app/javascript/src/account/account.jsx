import React, { useState, useEffect } from 'react';
import Layout from '@utils/layout';
import './account.scss';

const Account = (props) => {
  return (
    <Layout>
      <div className='container-xl'>
        <div className='row'>
          <div className='col-3 d-flex flex-column justify-content-center align-items-center border vh-100'>
            <img src='https://placehold.co/150' className='mb-5' />
            <div className='d-flex flex-column gap-2 mb-5'>
              <h5 className='text-center'>Username</h5>
              <h5 className='text-center'>City, State</h5>
            </div>
            <div className='d-flex flex-column gap-2'>
              <button className='btn btn-primary'>Edit Account</button>
              <button className='btn btn-danger'>Delete Account</button>
            </div>
          </div>
          <div className='col-9 d-flex flex-column align-items-center'>
            <div className='col-9 table-responsive mt-5'>
              <h5 className='text-center text-decoration-underline mb-3'>My Uploaded Images</h5>
              <table className='table table-striped table-hover table-bordered align-items-center'>
                <thead>
                  <tr className='align-middle text-center'>
                    <th></th>
                    <th>Brewery Name</th>
                    <th>Date Posted</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='align-middle text-center'>
                    <td>
                      <img src='https://placehold.co/75' alt='' />
                    </td>
                    <td>Brewery Name</td>
                    <td>MM/DD/YYYY</td>
                    <td>
                      <button className='btn btn-sm btn-danger'>Delete</button>
                    </td>
                  </tr>
                  <tr className='align-middle text-center'>
                    <td>
                      <img src='https://placehold.co/75' alt='' />
                    </td>
                    <td>Brewery Name</td>
                    <td>MM/DD/YYYY</td>
                    <td>
                      <button className='btn btn-sm btn-danger'>Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-9 table-responsive mt-5'>
              <h5 className='text-center text-decoration-underline mb-3'>My Reviews</h5>
              <table className='table table-striped table-hover table-bordered align-items-center'>
                <thead>
                  <tr className='align-middle text-center'>
                    <th>Brewery Name</th>
                    <th>Review</th>
                    <th>Date Posted</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className='align-middle text-center'>
                    <td className='w-25'>Brewery Name</td>
                    <td id='reviewCell'>
                      <textarea name='review' className='form-control-plaintext lh-sm small' readOnly>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dignissimos minima tempora
                        accusamus nam culpa assumenda eveniet, repudiandae perferendis, accusantium tenetur beatae
                        recusandae reiciendis quibusdam, libero unde nulla ratione sed!
                      </textarea>
                    </td>
                    <td className='w-25'>MM/DD/YYYY</td>
                    <td className='w-25'>
                      <button className='btn btn-sm btn-danger'>Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
