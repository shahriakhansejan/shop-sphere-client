import { useGetVendorQuery } from '../../redux/feature/vendors/vendorsApi';
import { IoCallSharp, IoLocation } from 'react-icons/io5';
import moment from 'moment';
import { Link } from 'react-router';

const Ledger = () => {
    const {data: vendors} = useGetVendorQuery();

    return (
        <div className='my-12'>
            <h2 className="text-4xl text-center text-orange-500 mb-6 font-bold">
        Vendor Ledger
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
        {
            vendors?.map(vendor => <div key={vendor._id} className="card bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">V{vendor.vendor_id}. {vendor.name}</h2>
                  <p>@: {vendor.email}</p>
                  <p className='flex gap-2 items-center'><IoCallSharp />{vendor.number}</p>
                  <p className='flex gap-2 items-center'><IoLocation />{vendor.address}</p>
                  <p>Connect from {moment(`${vendor.created_at}`, "MM-DD-YYYY").format("DD MMMM YY")}</p>
                
                    <Link to={`/vendor/payment/${vendor.vendor_id}`}><button className="btn mt-4 btn-sm btn-warning">View Ledger</button></Link>
               
                </div>
              </div>)
        }
      </div>

        </div>
    );
};

export default Ledger;