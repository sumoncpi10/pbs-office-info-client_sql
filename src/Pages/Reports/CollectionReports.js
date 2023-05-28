import React, { useEffect, useState } from 'react';
import './DNPReports.css';
import { format, parse } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
const CollectionReports = () => {
    const [collectionInfo, setCollectionInfo] = useState([]);
    const [users, SetUsers] = useState([]);
    const [zonals, setZonals] = useState([]);
    const [ccs, setCcs] = useState([]);
    const [pbs_code, setPbsCode] = useState('');
    const [zonal_code, setZonalCode] = useState('');
    // const [cdate, setCDate] = useState(new Date());
    const [NumOfCashCollection, setNumOfCashCollection] = useState(0);
    const [AmountOfCashCollection, setAmountOfCashCollection] = useState(0);
    const [NumOfOtherCollection, setNumOfOtherCollection] = useState(0);
    const [AmmountOfOtherCollection, setAmmountOfOtherCollection] = useState(0);
    const [NumOfDC, setNumOfDC] = useState(0);
    const [AmmountOfDC, setAmmountOfDC] = useState(0);

    useEffect(() => {
        fetch(`https://pbsofficeinfosql.onrender.com/collections`)
            .then(res => res.json())
            .then(data => {
                setCollectionInfo(data);

                console.log(data);
                setTimeout(totalAdd(data), 2000);
            })
    }, []);
    useEffect(() => {
        fetch(`https://pbsofficeinfosql.onrender.com/users`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPbsCode(data[0].pbs_code);
                SetUsers(data);
            })
    }, []);
    useEffect(() => {
        fetch(`https://pbsofficeinfosql.onrender.com/zonals/${pbs_code}`)
            .then(res => res.json())
            .then(data => {
                setZonals(data);
                console.log(data);
            })
    }, [pbs_code]);
    useEffect(() => {
        fetch(`https://pbsofficeinfosql.onrender.com/ccs/${zonal_code}`)
            .then(res => res.json())
            .then(data => {
                setCcs(data);
                console.log(data);
                console.log(zonal_code);
                console.log(pbs_code);
            })
    }, [zonal_code]);
    const totalAdd = (e) => {
        var NumOfCashCollectionadd = 0, AmountOfCashCollectionadd = 0,
            NumOfOtherCollectionadd = 0, AmmountOfOtherCollectionadd = 0,
            NumOfDCadd = 0, AmmountOfDCadd = 0;
        for (var i = 0; i < e?.length; i++) {
            NumOfCashCollectionadd += parseInt(e[i].NumOfCashCollection);
            AmountOfCashCollectionadd += parseInt(e[i].AmountOfCashCollection);
            NumOfOtherCollectionadd += parseInt(e[i].NumOfOtherCollection);
            AmmountOfOtherCollectionadd += parseInt(e[i].AmmountOfOtherCollection);
            NumOfDCadd += parseInt(e[i].NumOfDC);
            AmmountOfDCadd += parseInt(e[i].AmmountOfDC);
        }
        setNumOfCashCollection(NumOfCashCollectionadd);
        setAmountOfCashCollection(AmountOfCashCollectionadd);
        setNumOfOtherCollection(NumOfOtherCollectionadd);
        setAmmountOfOtherCollection(AmmountOfOtherCollectionadd);
        setNumOfDC(NumOfDCadd);
        setAmmountOfDC(AmmountOfDCadd);
    }
    // console.log(zonal_code);

    const btnSearch = async (e) => {
        e.preventDefault();
        // console.log(cdate);
        // defaultValue = cdate?.toISOString().split('T')[0];
        const pbs_code = e.target.pbs_code.value;
        const zonal_code = e.target.zonal_code.value;
        const cc_code = e.target.cc_code.value;

        const dateFrom = e.target.dateFrom.value;
        const dateTo = e.target.dateTo.value;
        const bookNo = e.target.bookNo.value;
        const assign_to = e.target.assign_to.value;
        const collected_by = e.target.collected_by.value;
        console.log(pbs_code, zonal_code, cc_code, bookNo, dateFrom, dateTo, assign_to, collected_by);
        fetch(`https://pbsofficeinfosql.onrender.com/Collection?pbs_code=${pbs_code}&zonal_code=${zonal_code}&cc_code=${cc_code}&dateFrom=${dateFrom}&dateTo=${dateTo}&bookNo=${bookNo}&assign_to=${assign_to}&collected_by=${collected_by}`)
            .then(res => res.json())
            .then(data => {
                setCollectionInfo(data);
                console.log(data);
                setTimeout(totalAdd(data), 2000);
                e.target.reset();
            })
    }
    const setZonalCodeM = (e) => {
        setZonalCode(e.target.value);
    }

    return (
        <div>
            <div className="container">
                <div className="row align-items-center">
                    <form onSubmit={btnSearch} className="d-flex flex-column" role="search">
                        <div className="row row-space ">
                            <div className="col-sm-12 col-12 col-md-3">
                                <label className="label" style={{ 'color': 'white' }}>পবিসের নাম</label>
                                <div className="input-group">
                                    <select name="pbs_code" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        <option value='29'>Chittagong PBS-2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-12 col-12 col-md-3">
                                <label className="label" style={{ 'color': 'white' }}>জোনালের নাম</label>
                                <div className="input-group">
                                    <select onChange={setZonalCodeM} name="zonal_code" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        <option value=''></option>
                                        {
                                            zonals.map(z => <option key={z.id} value={z.zonal_code}>{z.zonal_name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-12 col-12 col-md-3">
                                <label className="label" style={{ 'color': 'white' }}>অভিযোগ কেন্দ্র</label>
                                <div className="input-group">
                                    <select name="cc_code" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        <option value=''></option>
                                        {
                                            ccs.map(z => <option key={z.id} value={z.cc_code}>{z.cc_name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-12 col-12 col-md-3">
                                <label className="label" style={{ 'color': 'white' }}>বই নং</label>
                                <input type="text" name='bookNo' className="input--style-4" style={{ 'lineHeight': '14px' }}></input>
                            </div>

                            <div className="col-sm-12 col-12 col-md-3">
                                <label className="label" style={{ 'color': 'white' }}>হতে</label>
                                <input type="date" name='dateFrom' className="input--style-4" style={{ 'lineHeight': '14px' }} required></input>
                            </div>
                            <div className="col-sm-12 col-12 col-md-3">
                                <label className="label" style={{ 'color': 'white' }}>পর্যন্ত</label>
                                <input type="date" name='dateTo' className="input--style-4" style={{ 'lineHeight': '14px' }} required></input>
                            </div>
                            <div className="col-sm-12 col-12 col-md-3">
                                <label className="label" style={{ 'color': 'white' }}>দ্বায়িত্বপ্রাপ্ত কর্মকর্তা/কর্মচারী</label>
                                <select name="assign_to" className="" style={{ "width": "250px", "lineHeight": "50px" }}>
                                    <option value="">--Select--</option>
                                    {
                                        users.map(u => <option key={u.id} value={u.trg_id}>{u.displayName}, {u.designation}</option>)
                                    }
                                </select>
                            </div>
                            <div className="col-sm-12 col-12 col-md-3">
                                <label className="label" style={{ 'color': 'white' }}>আদায়কারী</label>
                                <select name="collected_by" className="" style={{ "width": "250px", "lineHeight": "50px" }}>
                                    <option value="">--Select--</option>
                                    {
                                        users.map(u => <option key={u.id} value={u.id}>{u.displayName}, {u.designation}</option>)
                                    }
                                </select>
                            </div>

                            <button className="btn btn-outline-secondary bg-secondary" type="submit">Search</button>
                        </div >
                    </form >
                </div >
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <h5 className="card-title">মোট আদায় <span className="text-success fw-normal ms-2">({collectionInfo?.length})</span></h5>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">

                            <div>
                                <button className="btn btn-primary"><FontAwesomeIcon icon={faFilePdf} /> Download PDF</button>
                            </div>
                            <div className="dropdown">
                                <a className="btn btn-link text-muted py-1 font-size-16 shadow-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bx bx-dots-horizontal-rounded"></i></a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="">
                            <div className="table-responsive">
                                <table className="table project-list-table table-nowrap align-middle table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="ps-4" style={{ "width": "50px" }}>
                                                <div className="form-check font-size-16"><input type="checkbox" className="form-check-input" id="contacusercheck" /><label className="form-check-label" htmlFor="contacusercheck"></label></div>
                                            </th>
                                            <th scope="col">বই</th>
                                            <th scope="col">নগদ(টি)</th>
                                            <th scope="col">নগদ(টাকা)</th>
                                            <th scope="col">অন্যান্য(টি)</th>
                                            <th scope="col">অন্যান্য(টাকা)</th>
                                            <th scope="col">ডিসি(টি)</th>
                                            <th scope="col">ডিসি(টাকা)</th>
                                            <th scope="col">তারিখ</th>
                                            <th scope="col">আদায়কারী</th>
                                            {/* <th scope="col" style={{ "width": "200px" }}>Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            collectionInfo.map(collection => <tr>
                                                <th scope="row" className="ps-4">
                                                    <div className="form-check font-size-16"><input type="checkbox" className="form-check-input" id="contacusercheck1" /><label className="form-check-label" htmlFor="contacusercheck1"></label></div>
                                                </th>
                                                <td><span className="badge badge-soft-success mb-0">{collection.bookNo}</span></td>
                                                <td>{collection.NumOfCashCollection}</td>
                                                <td>{collection.AmountOfCashCollection}</td>
                                                <td>{collection.NumOfOtherCollection}</td>
                                                <td>{collection.AmmountOfOtherCollection}</td>
                                                <td>{collection.NumOfDC}</td>
                                                <td>{collection.AmmountOfDC}</td>
                                                <td>{collection.cdate}</td>
                                                <td>{collection.displayName}</td>
                                                {/* {
                                                    users.map(user => user._id == collection.collectedBy ? < td > {user.displayName}</td> : '')
                                                } */}
                                            </tr>
                                            )
                                        }
                                        <tr className=' bg-light'>
                                            <th scope="row" className="ps-4">
                                                <div className="form-check font-size-16">
                                                    {/* <input type="checkbox" className="form-check-input" id="contacusercheck1" /> */}
                                                    <label className="form-check-label" htmlFor="contacusercheck1"></label></div>
                                            </th>
                                            <td><span className="badge badge-soft-primary mb-0">Total</span></td>
                                            <td>{NumOfCashCollection ? NumOfCashCollection : "0"}</td>
                                            <td>{AmountOfCashCollection ? AmountOfCashCollection : "0"}</td>
                                            <td>{NumOfOtherCollection ? NumOfOtherCollection : "0"}</td>
                                            <td>{AmmountOfOtherCollection ? AmmountOfOtherCollection : "0"}</td>
                                            <td>{NumOfDC ? NumOfDC : "0"}</td>
                                            <td>{AmmountOfDC ? AmmountOfDC : "0"}</td>
                                            <td></td>
                                            <td></td>
                                            {
                                                // users.map(user => user._id == collection.collectedBy ? < td > {user.displayName}</td> : '')
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </div >
    );
};

export default CollectionReports;