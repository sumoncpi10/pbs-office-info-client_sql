import '../../InfoEntry/DNPInfo';
// import $ from 'jquery';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const UpdateBookInfo = () => {
    const { id } = useParams();
    const [book, setBook] = useState([]);
    const [zonals, setZonals] = useState([]);
    const [ccs, setCcs] = useState([]);
    const [pbs_code, setPbsCode] = useState('');
    const [zonal_code, setZonalCode] = useState('');
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    // console.log(use);
    useEffect(() => {
        fetch(`http://localhost:5000/users`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUsers(data);
                setPbsCode(data[0].pbs_code);
                setZonalCode(data[0].zonal_code)
            })
    }, []);
    useEffect(() => {
        fetch(`http://localhost:5000/bookbyId/${id}`)
            .then(res => res.json())
            .then(data => {
                setBook(data[0]);
                console.log(data);
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
    const handleUpdateDNPInfo = (e) => {
        e.preventDefault();
        // const id = e.target.id.value;
        const pbs_code = e.target.pbs_code.value;
        const zonal_code = e.target.zonal_code.value;
        const cc_code = e.target.cc_code.value;

        const numberOfConsumer = e.target.numberOfConsumer.value;
        const numberOfDcConsumer = e.target.numberOfDcConsumer.value;
        const kw = e.target.kw.value;
        const assign_to = e.target.assign_to.value;
        const update_by = user?.email;

        // console.log(name, email, password);
        const product = {
            pbs_code, zonal_code, cc_code, numberOfConsumer, numberOfDcConsumer, kw, assign_to, update_by, id
        };
        console.log(product);
        // send data to the server


        fetch(`http://localhost:5000/book/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                // console.log('success', data);
                e.target.reset();
                toast("Book Update Successfully!");
                navigate('/books');
            })
    }
    const [user, loading, error] = useAuthState(auth);
    const numberOfConsumerChange = (e) => {
        const { numberOfConsumer, ...rest } = book;
        const newBrand = e.target.value;
        const newProduct = { numberOfConsumer: newBrand, ...rest };
        setBook(newProduct);
    }

    const numberOfDcConsumerChange = (e) => {
        const { numberOfDcConsumer, ...rest } = book;
        const newBrand = e.target.value;
        const newProduct = { numberOfDcConsumer: newBrand, ...rest };
        setBook(newProduct);
    }


    const kwChange = (e) => {
        const { kw, ...rest } = book;
        const newBrand = e.target.value;
        const newProduct = { kw: newBrand, ...rest };
        setBook(newProduct);
    }
    const setZonalCodeM = (e) => {
        setZonalCode(e.target.value);
    }
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
                            <div className="col-2 ">
                                <div className="input-group">
                                    <label className="label">পবিসের নাম</label>
                                    {/* <input className="input--style-4" type="email" name="email" /> */}
                                    <select name="pbs_code" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>

                                        <option value='29'>Chittagong PBS-2</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">অফিসের নাম</label>
                                    {/* <input className="input--style-4" type="email" name="email" /> */}
                                    <select onChange={setZonalCodeM} name="zonal_code" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        {
                                            zonals.map(z => <option selected={z.zonal_code == book.zonal_code} value={z.zonal_code}>{z.zonal_name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>

                        </div>



                        <div className="row row-space">
                            <div className="col-2">
                                <label className="label">অভিযোগ কেন্দ্র</label>
                                <div className="input-group">
                                    <select name="cc_code" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        {
                                            ccs.map(c => <option selected={c.cc_code == book.cc_code} value={c.cc_code}>{c.cc_name}</option>)
                                        }

                                    </select>
                                    {/* <div className="select-dropdown"></div> */}

                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">বই নং</label>
                                    <input hidden name='id' value={book?.id} className="input--style-4" type="text" />

                                    <input name='bookNo' value={book?.bookNo} className="input--style-4" type="text" />
                                </div>
                            </div>

                        </div>



                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">গ্রাহক সংখ্যা</label>
                                    <input onChange={numberOfConsumerChange} name='numberOfConsumer' value={book?.numberOfConsumer} className="input--style-4" type="text" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">ডিসি গ্রাহকের সংখ্যা</label>
                                    <input onChange={numberOfDcConsumerChange} className="input--style-4" type="text" value={book?.numberOfDcConsumer} name="numberOfDcConsumer" />
                                </div>
                            </div>

                        </div>

                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">কিলোওয়াট</label>
                                    <input onChange={kwChange} className="input--style-4" type="text" value={book?.kw} name="kw" />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">দ্বায়িত্বপ্রাপ্ত কর্মকর্তা/কর্মচারীর নাম</label>
                                    <select name="assign_to" className="input--style-4" style={{ "width": "250px", "lineHeight": "50px" }}>
                                        {
                                            users.map(u => <option selected={u.trg_id == book.assign_to} value={u.trg_id}>{u.displayName}, {u.designation}</option>)
                                        }
                                    </select>
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
