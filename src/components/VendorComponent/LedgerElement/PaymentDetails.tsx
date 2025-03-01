import { useParams } from 'react-router';
import { useGetAllPaymentHistoryQuery } from '../../../redux/feature/vendors/vendorsApi';
import moment from 'moment';

const PaymentDetails = () => {
    const { vendor_id } = useParams<{ vendor_id: string }>();

    const { data, isLoading } = useGetAllPaymentHistoryQuery(vendor_id as string);
    if(isLoading){
      return  <p>loading....</p>
    }
    return (
        <div className='my-12'>
            <h3 className='text-4xl text-center text-orange-500 mb-6 font-bold'>All Ledger of : V{data?.vendor_id}</h3>
            <h2 className='text-3xl font-bold text-orange-600'>Current Balance: {data?.balance}</h2>
            <div className="overflow-x-auto">
  <table className="table mt-12">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Cash_In</th>
        <th>Cash_Out</th>
        <th>Balance</th>
        <th>At</th>
      </tr>
    </thead>
    <tbody>
      {
        data?.payments?.map((payment, idx) => <tr key={idx} className="bg-base-200">
        <th>{idx + 1}.</th>
        <td>{payment?.cash_in? payment.cash_in : "___"}</td>
        <td>{payment?.cash_out? payment.cash_out : "___"}</td>
        <td>{payment?.balance_after_cash_in? payment.balance_after_cash_in : payment?.balance_after_cash_out ? payment.balance_after_cash_out : 0 }</td>
        <td>{moment(payment.at).format('LLL')}</td>
      </tr>)
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default PaymentDetails;