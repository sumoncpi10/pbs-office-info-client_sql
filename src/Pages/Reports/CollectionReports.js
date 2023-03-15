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
        fetch(`http://localhost:5000/collections`)
            .then(res => res.json())
            .then(data => {
                setCollectionInfo(data);

                console.log(data);
                setTimeout(totalAdd(data), 2000);
            })
    }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/users`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPbsCode(data[0].pbs_code);
                SetUsers(data);
            })
    }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/zonals/${pbs_code}`)
            .then(res => res.json())
            .then(data => {
                setZonals(data);
                console.log(data);
            })
    }, [pbs_code]);
    useEffect(() => {
        fetch(`http://localhost:5000/ccs/${zonal_code}`)
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
        fetch(`http://localhost:5000/Collection?pbs_code=${pbs_code}&zonal_code=${zonal_code}&cc_code=${cc_code}&dateFrom=${dateFrom}&dateTo=${dateTo}&bookNo=${bookNo}&assign_to=${assign_to}&collected_by=${collected_by}`)
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
            <div class="container">
                <div class="row align-items-center">
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
                                <input type="text" name='bookNo' className="input--style-4" style={{ 'line-height': '14px' }}></input>
                            </div>
                            {/* <div className="col-sm-12 col-12 col-md-3">
                                <label className="label" style={{ 'color': 'white' }}>বছর</label>
                                <div className="input-group">
                                    <select name="year" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        <option value='2022' selected>2022</option>
                                        <option value='2023'>2023</option>
                                        <option value='2024'>2024</option>
                                        <option value='2025'>2025</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-12 col-12 col-md-3">
                                <label className="label" style={{ 'color': 'white' }}>মাসের নাম</label>
                                <div className="input-group">
                                    <select name="month" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        <option value='01'>জানুয়ারী</option>
                                        <option value='02'>ফেব্রুয়ারী</option>
                                        <option value='03'>মার্চ</option>
                                        <option value='04'>এপ্রিল</option>
                                        <option value='05'>মে</option>
                                        <option value='06'>জুন</option>
                                        <option value='07'>জুলাই</option>
                                        <option value='08'>আগষ্ট</option>
                                        <option value='09'>সেপ্টেম্বর</option>
                                        <option value='10'>অক্টোবর</option>
                                        <option value='11'>নভেম্বর</option>
                                        <option value='12'>ডিসেম্বর</option>
                                    </select>
                                </div>
                            </div> */}
                            <div className="col-sm-12 col-12 col-md-3">
                                <label className="label" style={{ 'color': 'white' }}>হতে</label>
                                <input type="date" name='dateFrom' className="input--style-4" style={{ 'line-height': '14px' }} required></input>
                            </div>
                            <div className="col-sm-12 col-12 col-md-3">
                                <label className="label" style={{ 'color': 'white' }}>পর্যন্ত</label>
                                <input type="date" name='dateTo' className="input--style-4" style={{ 'line-height': '14px' }} required></input>
                            </div>
                            <div className="col-sm-12 col-12 col-md-3">
                                <label className="label" style={{ 'color': 'white' }}>দ্বায়িত্বপ্রাপ্ত কর্মকর্তা/কর্মচারী</label>
                                <input type="text" name='assign_to' className="input--style-4" style={{ 'line-height': '14px' }} ></input>
                            </div>
                            <div className="col-sm-12 col-12 col-md-3">
                                <label className="label" style={{ 'color': 'white' }}>আদায়কারী</label>
                                <input type="text" name='collected_by' className="input--style-4" style={{ 'line-height': '14px' }} ></input>
                            </div>

                            <button className="btn btn-outline-secondary bg-secondary" type="submit">Search</button>
                        </div >
                    </form >
                </div >
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <h5 class="card-title">মোট আদায় <span class="text-success fw-normal ms-2">({collectionInfo?.length})</span></h5>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                            {/* <div>
                                <ul class="nav nav-pills">
                                    <li class="nav-item">
                                        <a
                                            aria-current="page"
                                            href="#"
                                            class="router-link-active router-link-exact-active nav-link active"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            title=""
                                            data-bs-original-title="List"
                                            aria-label="List"
                                        >
                                            <i class="bx bx-list-ul"></i>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="#" class="nav-link" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Grid" aria-label="Grid"><i class="bx bx-grid-alt"></i></a>
                                    </li>
                                </ul>
                            </div> */}
                            <div>
                                <button class="btn btn-primary"><FontAwesomeIcon icon={faFilePdf} /> Download PDF</button>
                            </div>
                            <div class="dropdown">
                                <a class="btn btn-link text-muted py-1 font-size-16 shadow-none dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><a class="dropdown-item" href="#">Action</a></li>
                                    <li><a class="dropdown-item" href="#">Another action</a></li>
                                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-12">
                        <div class="">
                            <div class="table-responsive">
                                <table class="table project-list-table table-nowrap align-middle table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="ps-4" style={{ "width": "50px" }}>
                                                <div class="form-check font-size-16"><input type="checkbox" class="form-check-input" id="contacusercheck" /><label class="form-check-label" for="contacusercheck"></label></div>
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
                                                <th scope="row" class="ps-4">
                                                    <div class="form-check font-size-16"><input type="checkbox" class="form-check-input" id="contacusercheck1" /><label class="form-check-label" for="contacusercheck1"></label></div>
                                                </th>
                                                <td><span class="badge badge-soft-success mb-0">{collection.bookNo}</span></td>
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
                                            <th scope="row" class="ps-4">
                                                <div class="form-check font-size-16">
                                                    {/* <input type="checkbox" class="form-check-input" id="contacusercheck1" /> */}
                                                    <label class="form-check-label" for="contacusercheck1"></label></div>
                                            </th>
                                            <td><span class="badge badge-soft-primary mb-0">Total</span></td>
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
                {/* <div class="row g-0 align-items-center pb-4">
                    <div class="col-sm-6">
                        <div><p class="mb-sm-0">Showing 1 to 10 of 57 entries</p></div>
                    </div>
                    <div class="col-sm-6">
                        <div class="float-sm-end">
                            <ul class="pagination mb-sm-0">
                                <li class="page-item disabled">
                                    <a href="#" class="page-link"><i class="mdi mdi-chevron-left"></i></a>
                                </li>
                                <li class="page-item active"><a href="#" class="page-link">1</a></li>
                                <li class="page-item"><a href="#" class="page-link">2</a></li>
                                <li class="page-item"><a href="#" class="page-link">3</a></li>
                                <li class="page-item"><a href="#" class="page-link">4</a></li>
                                <li class="page-item"><a href="#" class="page-link">5</a></li>
                                <li class="page-item">
                                    <a href="#" class="page-link"><i class="mdi mdi-chevron-right"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> */}
            </div >
        </div >
    );
};

export default CollectionReports;