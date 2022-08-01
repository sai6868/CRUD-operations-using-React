import React from 'react';
import '../App.css';

function Register_from({ register, handleSubmit, errors, onSubmit, formStatus, onUpdate, Cancel }) {

  return (
    <div>

      {
        formStatus === false ?
          (
            <form className="m-auto row col-md-4 col-sm-12" id="my-form" onSubmit={handleSubmit(onSubmit)}>
              <h2 className='text-center mb-4'>User Registration</h2>
              <div className="form-group">
                <label htmlFor="rno">Registration No.</label>
                <input type="text" placeholder="Enter Registration No." id="rno" className="form-control" {...register("RegistrationNo", { required: true })} />
                {errors.RegistrationNo?.type === "required" && <span className='text-danger'>*Registration No. is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Enter Name" id="name" className="form-control" {...register("Name", { required: true })} />
                {errors.Name?.type === "required" && <span className='text-danger'>*Name is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="cname">College</label>
                <select className='form-select' id='cname' {...register("College", { required: true })}>
                  <option value='' defaultValue>Select college..</option>
                  <option value="ABC">ABC</option>
                  <option value='PQR'>PQR</option>
                  <option value='XYZ'>XYZ</option>
                </select>
                {errors.College?.type === "required" && <span className='text-danger'>*College is required</span>}
              </div>
              <div className="form-group">
                <label htmlFor="percentage">Percentage</label>
                <input type="text" placeholder="Enter percentage" id="percentage" className="form-control" {...register("Percentage", { required: true })} />
                {errors.Percentage?.type === "required" && <span className='text-danger'>*Percentage is required</span>}
              </div>
              <div className="form-group">
                <button className="btn btn-success w-100">Submit</button>
              </div>
            </form>
          )
          :
          (
            <div className="m-auto row col-md-4 col-sm-12">
              <form onSubmit={handleSubmit(onUpdate)}>
                <h2 className='text-center mb-4'>Update User Data</h2>
                <div className="form-group">
                  <label htmlFor="rno">Registration No.</label>
                  <input type="text" placeholder="Enter Registration No." id="rno" className="form-control inp-disabled" {...register("RegistrationNo", { required: true })} disabled />
                  {errors.RegistrationNo?.type === "required" && <span className='text-danger'>*Registration No. is required</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" className="form-control" {...register("Name", { required: true })} />
                  {errors.Name?.type === "required" && <span className='text-danger'>*Name is required</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="cname">College</label>
                  <select className='form-select' id='cname' {...register("College", { required: true })}>
                    <option value='' defaultValue>Select college..</option>
                    <option value="ABC">ABC</option>
                    <option value='PQR'>PQR</option>
                    <option value='XYZ'>XYZ</option>
                  </select>
                  {errors.College?.type === "required" && <span className='text-danger'>*College is required</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="percentage">Percentage</label>
                  <input type="text" placeholder="Enter percentage" id="percentage" className="form-control" {...register("Percentage", { required: true })} />
                  {errors.Percentage?.type === "required" && <span className='text-danger'>*Percentage is required</span>}
                </div>
                <div className="form-group">
                  <button className="btn btn-info w-100">Update</button>
                </div>
              </form>
              <button className="btn btn-danger w-100 cancel-button mt-2" onClick={() => Cancel()}>Cancel</button>
            </div>
          )
      }

    </div>
  );
}

export default Register_from;
