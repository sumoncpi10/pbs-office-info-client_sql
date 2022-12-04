import '../../InfoEntry/DNPInfo';
// import $ from 'jquery';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const UpdateBookInfo = () => {
    const { id } = useParams();
    const [book, setBook] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/bookbyId/${id}`)
            .then(res => res.json())
            .then(data => {
                setBook(data);
                console.log(data);
            })
    }, []);
    const handleUpdateDNPInfo = (e) => {
        e.preventDefault();
        const pbs = e.target.pbs.value;
        const zonal = e.target.zonal.value;
        const complainCenter = e.target.complainCenter.value;
        const month = e.target.month.value;
        const year = e.target.year.value;
        const bookNo = e.target.bookNo.value;
        const numberOfConsumer = e.target.numberOfConsumer.value;
        const empName = e.target.empName.value;
        const empDesignation = e.target.empDesignation.value;
        const numberOfDcConsumer = e.target.numberOfDcConsumer.value;
        const amountOfDcConsumer = e.target.amountOfDcConsumer.value;
        const Days90UpConsumerMonthStart = e.target.Days90UpConsumerMonthStart.value;
        const Days90UpConsumerMonthEnd = e.target.Days90UpConsumerMonthEnd.value;
        const kw = e.target.kw.value;
        const empPhone = e.target.empPhone.value;
        const enteredBy = user?.email;

        // console.log(name, email, password);
        const product = {
            pbs, zonal, complainCenter, month, year, bookNo, numberOfConsumer, empName, empDesignation, numberOfDcConsumer, amountOfDcConsumer, Days90UpConsumerMonthStart, Days90UpConsumerMonthEnd, kw, empPhone, enteredBy
        };
        console.log(product);
        // send data to the server

        fetch('http://localhost:5000/dnpBookAdd', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                // console.log('success', data);
                e.target.reset();
                toast("Book Add Successfully!");
            })
    }
    const [user, loading, error] = useAuthState(auth);
    return (
        <div className="wrapper wrapper--w680">
            <div className="card card-4">

                <div className="card-body">
                    <h2 className="title">বই এর তথ্য সংশোধন</h2>
                    {/* <div className="container-fluid p-2 mb-3">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-secondary bg-dark" type="submit">Search</button>
                        </form>
                    </div> */}

                    <form method="POST" onSubmit={handleUpdateDNPInfo}>
                        <div className="row row-space">
                            <div className="col-2 collapse">
                                <div className="input-group">
                                    <label className="label">পবিসের নাম</label>
                                    {/* <input className="input--style-4" type="email" name="email" /> */}
                                    <select name="pbs" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        <option value='29'>চট্টগ্রাম পবিস-২</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">অফিসের নাম</label>
                                    {/* <input className="input--style-4" type="email" name="email" /> */}
                                    <select name="zonal" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        <option value='2902'>রাঙ্গুনিয়া জোনাল অফিস</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-2">
                                <label className="label">অভিযোগ কেন্দ্র</label>
                                <div className="input-group">
                                    <select name="complainCenter" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        {book?.complainCenter == "290200" && <>
                                            <option selected value='290200'>রাঙ্গুনিয়া জোনাল অফিস</option>
                                            <option value='290205'>লিচুবাগান</option>
                                            <option value='290206'>পদুয়া</option>
                                            <option value='290204'>সরবভাটা</option>
                                            <option value='290201'>গোচরা</option>
                                            <option value='290202'>শিলক</option></>}
                                        {book?.complainCenter == "290206" && <>
                                            <option value='290200'>রাঙ্গুনিয়া জোনাল অফিস</option>
                                            <option value='290205'>লিচুবাগান</option>
                                            <option value='290206' selected>পদুয়া</option>
                                            <option value='290204'>সরবভাটা</option>
                                            <option value='290201'>গোচরা</option>
                                            <option value='290202'>শিলক</option></>}
                                        {book?.complainCenter == "290204" && <>
                                            <option value='290200'>রাঙ্গুনিয়া জোনাল অফিস</option>
                                            <></><option value='290205'>লিচুবাগান</option>
                                            <option value='290206'>পদুয়া</option>
                                            <option value='290204' selected>সরবভাটা</option>
                                            <option value='290201'>গোচরা</option>
                                            <option value='290202'>শিলক</option></>}
                                        {book?.complainCenter == "290201" && <>
                                            <option value='290200'>রাঙ্গুনিয়া জোনাল অফিস</option>
                                            <></><option value='290205'>লিচুবাগান</option>
                                            <option value='290206'>পদুয়া</option>
                                            <option value='290204'>সরবভাটা</option>
                                            <option value='290201' selected>গোচরা</option>
                                            <option value='290202'>শিলক</option></>}
                                        {book?.complainCenter == "290202" && <>
                                            <option selected value='290200'>রাঙ্গুনিয়া জোনাল অফিস</option>
                                            <option value='290205'>লিচুবাগান</option>
                                            <option value='290206'>পদুয়া</option>
                                            <option value='290204'>সরবভাটা</option>
                                            <option value='290201'>গোচরা</option>
                                            <option value='290202' selected>শিলক</option></>}

                                    </select>
                                    {/* <div className="select-dropdown"></div> */}

                                </div>
                            </div>
                        </div>

                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">মাসের নাম</label>
                                    {/* <input className="input--style-4" type="email" name="email" /> */}
                                    <select name="month" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        <option value='01' > জানুয়ারী</option>
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
                            </div>
                            <div className="col-2">
                                <label className="label">বছর</label>
                                <div className="input-group">
                                    <select name="year" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        {book?.year == "2022" && <>
                                            <option value='2022' selected>2022</option>
                                            <option value='2023'>2023</option>
                                            <option value='2024'>2024</option>
                                            <option value='2025'>2025</option></>}
                                        {book?.year == "2023" && <>
                                            <option value='2022'>2022</option>
                                            <option value='2023' selected>2023</option>
                                            <option value='2024'>2024</option>
                                            <option value='2025'>2025</option></>}
                                        {book?.year == "2024" && <>
                                            <option value='2022' >2022</option>
                                            <option value='2023'>2023</option>
                                            <option value='2024' selected>2024</option>
                                            <option value='2025'>2025</option></>}
                                        {book?.year == "2025" && <>
                                            <option value='2022' >2022</option>
                                            <option value='2023'>2023</option>
                                            <option value='2024'>2024</option>
                                            <option value='2025' selected>2025</option></>}
                                    </select>
                                    {/* <div className="select-dropdown"></div> */}

                                </div>
                            </div>
                        </div>

                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">বই নং</label>
                                    <input name='bookNo' value={book?.bookNo} className="input--style-4" type="text" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">গ্রাহক সংখ্যা</label>
                                    <input name='numberOfConsumer' value={book?.numberOfConsumer} className="input--style-4" type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">নাম</label>
                                    <input className="input--style-4" type="text" value={book?.empName} name="empName" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">পদবী</label>
                                    <input className="input--style-4" type="text" value={book?.empDesignation} name="empDesignation" />
                                </div>
                            </div>
                        </div>


                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">ডিসি গ্রাহকের সংখ্যা</label>
                                    <input className="input--style-4" type="text" value={book?.numberOfDcConsumer} name="numberOfDcConsumer" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">ডিসি গ্রাহকের টাকা</label>
                                    <input className="input--style-4" type="text" value={book?.amountOfDcConsumer} name="amountOfDcConsumer" />
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">৯০ দিনের উর্ধ্বে গ্রাহক সংখ্যা(মাসের শুরুতে)</label>
                                    <input className="input--style-4" type="text" value={book?.Days90UpConsumerMonthStart} name="Days90UpConsumerMonthStart" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">৯০ দিনের উর্ধ্বে গ্রাহক সংখ্যা(মাসের শেষে)</label>
                                    <input className="input--style-4" type="text" value={book?.Days90UpConsumerMonthEnd} name="Days90UpConsumerMonthEnd" />
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">কিলোওয়াট</label>
                                    <input className="input--style-4" type="text" value={book?.kw} name="kw" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">দ্বায়িত্বপ্রাপ্ত ব্যাক্তির মোবাইল নং</label>
                                    <input className="input--style-4" type="text" value={book?.empPhone} name="empPhone" />
                                </div>
                            </div>
                        </div>

                        <div className="p-t-15">
                            <button className="btn btn--radius-2 btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div >
        </div >

    );
}

export default UpdateBookInfo;
