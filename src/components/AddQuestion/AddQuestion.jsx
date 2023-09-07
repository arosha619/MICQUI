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
            />
           </div>
          <div className="dropdown model-drop-down pt-3">
    <button
      className="btn btn-secondary dropdown-toggle"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Type
    </button>
    <ul
      className="dropdown-menu dropdown-menu-wide pt-2" // Add custom class for full width
      aria-labelledby="dropdownMenuButton1"
    >
      <li><a className="dropdown-item" href="#">Employee</a></li>
      <li><a className="dropdown-item" href="#">Manager</a></li>
    </ul>
  </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default AddQuestion