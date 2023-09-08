import React from 'react'

const AddQuestion = () => {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group w-100">
              <label for="exampleInputEmail1">Bucket Name</label>
              <input
                type="text"
                className="form-control"
                id="bucketTitle"
                aria-describedby="BucketTitle"
                placeholder="Enter Bucket Title"
                // onChange={(e) => {
                //   setBucketTitle(e.target.value);
                // }}
              />
            </div>
            <div className="form-group">
              <label for="Description">Description</label>
              <input
                type="textarea"
                className="form-control"
                id="description"
                aria-describedby="description"
                placeholder="Description"
                // onChange={(e) => {
                //   setDescription(e.target.value);
                // }}
              />
            </div>
            <div>
              <select
                
              >
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            
          </form>
        </div>
      </div>
      <button>Submit</button>
    </div>
  )
}

export default AddQuestion