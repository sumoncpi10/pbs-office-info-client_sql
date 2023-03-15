import '../../InfoEntry/DNPInfo.css';
// import $ from 'jquery';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import auth from '../../../firebase.init';
import { updateProfile } from 'firebase/auth';
import useAdmin from '../../../hooks/useAdmin';
import { useParams } from 'react-router-dom';
const Posting = () => {
    (function ($) {
        'use strict';
        try {
            var selectSimple = $('.js-select-simple');
            selectSimple.each(function () {
                var that = $(this);
                var selectBox = that.find('select');
                var selectDropdown = that.find('.select-dropdown');
                selectBox.select2({
                    dropdownParent: selectDropdown
                });
            });
        } catch (err) {
            console.log(err);
        }
    })(window.jQuery);
    const { id } = useParams();
    const [user, loading, error] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const [book, setBook] = useState([]);
    const [displayName, setdisplayName] = useState('');
    const [designation, setdesignation] = useState('');
    const [officeInfo, setofficeInfo] = useState([]);
    const [zonals, setZonals] = useState([]);
    const [ccs, setCcs] = useState([]);
    const [pbs_code, setPbsCode] = useState('');
    const [zonal_code, setZonalCode] = useState('');
    // console.log(admin)
    const [luser, SetlUser] = useState([]);
    // console.log(user)
    useEffect(() => {
        fetch(`http://localhost:5000/userId/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data[0]);
                SetlUser(data[0]);
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
    // useEffect(() => {
    //     fetch(`https://pbsofficeinfo.onrender.com/user/${user?.email}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             SetlUser(data);
    //         })
    // }, [book]);

    // const btnSearch = (e) => {
    //     e.preventDefault();
    //     const textSearch = e.target.textSearch.value;
    //     fetch(`https://pbsofficeinfo.onrender.com/book/${textSearch}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             setBook(data);
    //         })
    // }
    const handleUpdateUserInfo = (e) => {
        e.preventDefault();

        const pbs_code = e.target.pbs_code.value;
        const zonal_code = e.target.zonal_code.value;
        const displayName = e.target.displayName.value;
        const designation = e.target.designation.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const photoURL = e.target.photoURL.value;
        const trg_id = e.target.trg_id.value;
        const posted_by = user?.email;

        // console.log(name, email, password);
        const product = {
            pbs_code, zonal_code, displayName, designation, email, phone, photoURL, trg_id, posted_by
        };

        console.log(product);
        // send data to the server
        fetch(`http://localhost:5000/userPosting/${id}`, {
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
                toast("User Update Successfully!");
                // navigate('/books');
            })
    }
    const [cdate, setCDate] = useState(new Date());
    const displayNameChange = (e) => {
        const { displayName, ...rest } = luser;
        const newBrand = e.target.value;
        const newProduct = { displayName: newBrand, ...rest };
        SetlUser(newProduct);
        setdisplayName(e.target.value)
    }
    const emailChange = (e) => {
        const { email, ...rest } = luser;
        const newBrand = e.target.value;
        const newProduct = { email: newBrand, ...rest };
        SetlUser(newProduct);
    }
    const empPhoneChange = (e) => {
        const { phone, ...rest } = luser;
        const newBrand = e.target.value;
        const newProduct = { phone: newBrand, ...rest };
        SetlUser(newProduct);
    }
    const photoURLChange = (e) => {
        const { photoURL, ...rest } = luser;
        const newBrand = e.target.value;
        const newProduct = { photoURL: newBrand, ...rest };
        SetlUser(newProduct);
    }
    const trgIdChange = (e) => {
        const { trg_id, ...rest } = luser;
        const newBrand = e.target.value;
        const newProduct = { trg_id: newBrand, ...rest };
        SetlUser(newProduct);
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    let disabled = true;
    if (admin?.designation == "agm-it" || admin?.designation == "aje" || admin?.designation == "je-it" || admin?.designation == "aje-it" || admin?.designation == "dgm" || admin?.designation == "gm") {
        disabled = false;
    }
    return (
        <div className="wrapper wrapper--w680">
            <div className="card card-4">

                <div className="card-body">
                    <h2 className="title">প্রোফাইল হালনাগাদ করুন/পোষ্টিং প্রদান করুন</h2>
                    {/* <div className="container-fluid p-2 mb-3">
                        <form onSubmit={btnSearch} className="d-flex" role="search">
                            <input name='textSearch' className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-secondary bg-dark" type="submit">Search</button>
                        </form>
                    </div> */}

                    <form method="POST" onSubmit={handleUpdateUserInfo}>
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
                                <label className="label">পোষ্টিং অফিস প্রদান করুন</label>
                                <div className="input-group">
                                    {/* <input className="input--style-4" type="email" name="email" /> */}
                                    <select disabled={disabled} name="zonal_code" className="input--style-4" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        {
                                            zonals.map(z => <option selected={z.zonal_code == luser.zonal_code} value={z.zonal_code}>{z.zonal_name}</option>)
                                        }

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">নাম</label>
                                    <input value={luser.displayName} onChange={displayNameChange} className="input--style-4" type="text" name="displayName" />
                                </div>
                            </div>
                            <div className="col-2">
                                <label className="label">পদবী</label>
                                <div className="input-group">
                                    <select disabled={disabled} name="designation" onChange={(e) => setdesignation(e.target.value)} className="" style={{ "width": "550px", "lineHeight": "50px" }} >
                                        {/* {
                                             luser.map(u => <option key={u._id} sele selected  value={u._id}>{u.displayName + ', ' + u.designation}</option>)
                                        } */}
                                        {luser.designation == 'gm' && <option selected value='gm'>GM</option>}
                                        {luser.designation == 'dgm' && <option selected value='dgm'>DGM</option>}
                                        {luser.designation == 'agm' && <option selected value='agm'>AGM</option>}
                                        {luser.designation == 'agm-it' && <option selected value='agm'>AGM(IT)</option>}
                                        {luser.designation == 'je-it' && <option selected value='je'>JE(IT)</option>}
                                        {luser.designation == 'je' && <option selected value='je'>JE</option>}
                                        {luser.designation == 'ec' && <option selected value='ec'>EC</option>}
                                        {luser.designation == 'ac' && <option selected value='ac'>Accountant</option>}
                                        {luser.designation == 'puc' && <option selected value='puc'>PUC</option>}
                                        {luser.designation == 'msc' && <option selected value='msc'>MSC</option>}
                                        {luser.designation == 'sc' && <option selected value='sc'>Store Coordinator</option>}
                                        {luser.designation == 'aec' && <option selected value='aec'>AEC</option>}
                                        {luser.designation == 'aje-it' && <option selected value='aje'>AJE(IT)</option>}
                                        {luser.designation == 'aje' && <option selected value='aje'>AJE</option>}
                                        {luser.designation == 'bs' && <option selected value='bs'>BS</option>}
                                        {luser.designation == 'mts' && <option selected value='mts'>MTS</option>}
                                        {luser.designation == 'sk' && <option selected value='sk'>Store Keeper</option>}
                                        {luser.designation == 'aac' && <option selected value='aac'>Assistant Accountant</option>}
                                        {luser.designation == 'cash' && <option selected value='cash'>Cashier</option>}
                                        {luser.designation == 'co' && <option selected value='co'>Computer Operator</option>}
                                        {luser.designation == 'lt' && <option selected value='lt'>LT</option>}
                                        {luser.designation == 'wi' && <option selected value='wi'>Wiring Inspector</option>}
                                        {luser.designation == 'ba' && <option selected value='ba'>Billing Assistant</option>}
                                        {luser.designation == 'acash' && <option selected value='acash'>Assistant Cashier</option>}
                                        {luser.designation == 'deo' && <option selected value='deo'>DEO</option>}
                                        {luser.designation == 'lm1' && <option selected value='lm1'>LM-1</option>}
                                        {luser.designation == 'mt' && <option selected value='mt'>MT</option>}
                                        {luser.designation == 'lm2' && <option selected value='lm2'>LM-2</option>}
                                        {luser.designation == 'lc' && <option selected value='lc'>Line Crew</option>}
                                        {luser.designation == 'mrcm' && <option selected value='mrcm'>MRCM</option>}
                                        {luser.designation == 'oh' && <option selected value='oh'>OH</option>}
                                        <option value='gm'>GM</option>
                                        <option value='dgm'>DGM</option>
                                        <option value='agm'>AGM</option>
                                        <option selected value='agm-it'>AGM(IT)</option>
                                        <option selected value='je-it'>JE(IT)</option>
                                        <option value='je'>JE</option>
                                        <option value='ec'>EC</option>
                                        <option value='ac'>Accountant</option>
                                        <option value='puc'>PUC</option>
                                        <option value='msc'>MSC</option>
                                        <option value='sc'>Store Coordinator</option>
                                        <option value='aje-it'>AJE(IT)</option>
                                        <option value='aje'>AJE</option>
                                        <option value='aec'>AEC</option>
                                        <option value='bs'>BS</option>
                                        <option value='mts'>MTS</option>
                                        <option value='sk'>Store Keeper</option>
                                        <option value='aac'>Assistant Accountant</option>
                                        <option value='cash'>Cashier</option>
                                        <option value='co'>Computer Operator</option>
                                        <option value='lt'>LT</option>
                                        <option value='wi'>Wiring Inspector</option>
                                        <option value='ba'>Billing Assistant</option>
                                        <option value='ba'>Assistant Cashier</option>
                                        <option value='deo'>DEO</option>
                                        <option value='lm1'>LM-1</option>
                                        <option value='mt'>MT</option>
                                        <option value='lm2'>LM-2</option>
                                        <option value='lc'>Line Crew</option>
                                        <option value='mrcm'>MRCM</option>
                                        <option value='oh'>OH</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">ইমেইল</label>
                                    <input onChange={emailChange} name='email' className="input--style-4" type="email" value={luser.email} />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">মোবাইল</label>
                                    <input onChange={empPhoneChange} name='phone' className="input--style-4" type="text" value={luser.phone} />
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">ছবি (লিঙ্ক)</label>
                                    <input onChange={photoURLChange} name='photoURL' className="input--style-4" type="text" value={luser.photoURL} />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">প্রশিক্ষণ আইডি</label>
                                    <input onChange={trgIdChange} name='trg_id' className="input--style-4" type="text" value={luser.trg_id} disabled />
                                </div>
                            </div>
                        </div>
                        <div className="p-t-15">
                            <button className="btn btn--radius-2 btn-primary" type="submit">Submit</button>
                        </div>
                        {/* <div className="p-t-15">
                            <button className="btn btn--radius-2 btn-primary" onClick={async () => {
                                const success = await updateProfile({ displayName, designation });
                                if (success) {
                                    alert('Updated profile');
                                }
                            }} type="submit">Update</button>
                        </div> */}
                    </form>
                </div>
            </div >
        </div >

    );
}

export default Posting;
