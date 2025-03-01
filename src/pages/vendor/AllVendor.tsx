import moment from "moment";
import { useGetVendorQuery } from "../../redux/feature/vendors/vendorsApi";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AllVendor = () => {
  const { data: vendors } = useGetVendorQuery();
  return (
    <div>
      <h2 className="text-4xl text-center text-orange-500 my-12 font-bold">
        All Vendor
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Vendor_Name</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Connect_from</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors?.map((vendor, idx) => (
              <tr className="bg-base-200">
                <td>{idx + 1}</td>
                <td>V{vendor.vendor_id}__{vendor.name}</td>
                <td>
                  <span>
                    @: {vendor.email}
                    <br />
                    phn: {vendor.number}
                  </span>
                </td>
                <td>{vendor.address}</td>
                <td>{moment(vendor.created_at).format("DD MMMM YYYY")}</td>
                <td>
                  <span className="flex gap-2 text-xl">
                    <button>
                      <FaEdit />
                    </button>
                    <button>
                      <MdDelete />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllVendor;
