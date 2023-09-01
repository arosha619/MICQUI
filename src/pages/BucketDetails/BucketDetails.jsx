import React from 'react';
import SideBar from '../../components/Sidebar/SideBar';
import BucketDetailCard from '../../components/BucketDetailCard/BucketDetailCard';
import BucketHeader from '../../components/MybucketComponents/BucketHeader';
import { FaQrcode } from "react-icons/fa6";
import { BiArrowBack } from "react-icons/bi";
import {GoDotFill} from "react-icons/go";


const BucketDetails = () => {
  const bucketDetails = [1, 2, 3, 4, 5];
  return (
    <div className="d-flex">
      <div>
        <SideBar />
      </div>

      <div className=" w-100" style={{ padding: "20px" }}>
        <div>
            <div className="row">
                <div className='col-4 p-3'>
                    <div className='d-inline-flex shadow bg-body p-2 rounded'>
                      <BiArrowBack  style={{borderRadius:"5px", width:"30px", height:"30px"}}/> 
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col-xl-9 col-lg-9 col-md-8 col-sm-7 col-7">
                   <h2>Bucket</h2>
                   <p>Session sign out</p>
                   <div className="col d-flex flex-row align-items-center" style={{paddingBottom:"10px"}}>
                    <GoDotFill style={{color:"green"}}/>
                    <p style={{margin:"0px"}}>Published</p>
                   </div>
                    
                </div>
                <div className=" col-xl-3 col-lg-3 col-md-4 col-sm-5 col-5 d-flex flex-xl-row flex-lg-row flex-md-row flex-column text-end align justify-content-end" >
                    <h2 className='p-2'>4SGB6TN79</h2>

                    <FaQrcode className='p-2' style={{color:"yellow", width:"60px", height:"60px"}} />
                </div>
                
            </div>
        </div>

        <div className="card">
          <div className="card-header">
            <BucketHeader />
          </div>

          <div className='p-3'>
          {
            bucketDetails.map((item, index) => (
             
             <BucketDetailCard />
        
            ))}  
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default BucketDetails;
