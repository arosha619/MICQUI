import React from "react";

function ModalBody(props) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group w-100">
              <label for="exampleInputEmail1">{props.firstField}</label>
              <textarea
                style={{ height: "40px" }}
                maxLength={150}
                className="form-control"
                id="bucketTitle"
                aria-describedby="BucketTitle"
                placeholder={props.placeHolder}
                value={props.bucketPropTitle}
                onChange={(e) => {
                  props.setBucketPropTitle(e.target.value);
                }}
              />
            </div>

            {props.bucketTitle === "bucket" ? (
              <>
                <div className="form-group">
                  <label for="Description">Description</label>
                  <textarea
                    maxLength={150}
                    className="form-control"
                    id="description"
                    aria-describedby="description"
                    placeholder="Description"
                    value={props.description}
                    onChange={(e) => {
                      props.setDescription(e.target.value);
                    }}
                  />
                </div>
                <div className="select-container">
                  <label htmlFor="Position">Position</label>
                  <select
                    className="select-dropdown"
                    onChange={(e) => {
                      props.setType(e.target.value);
                    }}
                  >
                    {props.isAdd ? (
                      <>
                        <option className="select-option" value="Employee">
                          Employee
                        </option>
                        <option className="select-option" value="Manager">
                          Manager
                        </option>
                      </>
                    ) : (
                      <>
                        <option
                          className="select-option"
                          value="Employee"
                          selected={props.type == "Employee"}
                        >
                          Employee
                        </option>
                        <option
                          className="select-option"
                          value="Manager"
                          selected={props.type == "Manager"}
                        >
                          Manager
                        </option>
                      </>
                    )}
                  </select>
                </div>
                <div className="select-container">
                  <label htmlFor="Status">Status</label>
                  <select
                    className="select-dropdown"
                    onChange={(e) => {
                      props.setStatus(e.target.value);
                    }}
                  >
                    {props.isAdd ? (
                      <>
                        <option className="select-option" value="0">
                          Draft
                        </option>
                        <option className="select-option" value="1">
                          publish
                        </option>
                      </>
                    ) : (
                      <>
                        <option
                          className="select-option"
                          value="0"
                          selected={props.status == "0"}
                        >
                          Draft
                        </option>
                        <option
                          className="select-option"
                          value="1"
                          selected={props.status == "1"}
                        >
                          publish
                        </option>
                      </>
                    )}
                  </select>
                </div>
              </>
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalBody;
