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
const Profile = () => {
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

    const [user, loading, error] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const [book, setBook] = useState([]);
    const [users, SetUsers] = useState([]);
    const [displayName, setdisplayName] = useState('');
    const [designation, setdesignation] = useState('');
    const [officeInfo, setofficeInfo] = useState([]);
    console.log(admin)
    useEffect(() => {
        fetch(`http://localhost:5000/user/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                SetUsers(data);
            })
    }, [book]);

    const btnSearch = (e) => {
        e.preventDefault();
        const textSearch = e.target.textSearch.value;
        fetch(`https://pbsofficeinfo.onrender.com/book/${textSearch}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBook(data);
            })
    }
    const handleUpdateUserInfo = (e) => {
        e.preventDefault();

        const displayName = e.target.displayName.value;
        const empPhone = e.target.empPhone.value;
        const photoURL = e.target.photoURL.value;
        const designation = e.target.designation.value;
        const enteredBy = user?.email;

        // console.log(name, email, password);
        const product = {
            displayName, empPhone, photoURL, designation, enteredBy
        };

        console.log(product);
        // send data to the server
        fetch(`http://localhost:5000/user/${user?.email}`, {
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
        const { displayName, ...rest } = users;
        const newBrand = e.target.value;
        const newProduct = { displayName: newBrand, ...rest };
        SetUsers(newProduct);
        setdisplayName(e.target.value)
    }
    const empPhoneChange = (e) => {
        const { empPhone, ...rest } = users;
        const newBrand = e.target.value;
        const newProduct = { empPhone: newBrand, ...rest };
        SetUsers(newProduct);
    }
    const photoURLChange = (e) => {
        const { photoURL, ...rest } = users;
        const newBrand = e.target.value;
        const newProduct = { photoURL: newBrand, ...rest };
        SetUsers(newProduct);
    }
    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div className="wrapper wrapper--w680">
            <div className="card card-4">

                <div className="card-body">
                    <h2 className="title">আপনার প্রোফাইল হালনাগাদ করুন</h2>
                    {/* <div className="container-fluid p-2 mb-3">
                        <form onSubmit={btnSearch} className="d-flex" role="search">
                            <input name='textSearch' className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-secondary bg-dark" type="submit">Search</button>
                        </form>
                    </div> */}

                    <form method="POST" onSubmit={handleUpdateUserInfo}>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">নাম</label>
                                    <input value={users?.displayName} onChange={displayNameChange} className="input--style-4" type="text" name="displayName" />
                                </div>
                            </div>
                            <div className="col-2">
                                <label className="label">পদবী</label>
                                <div className="input-group">
                                    <select name="designation" onChange={(e) => setdesignation(e.target.value)} className="" style={{ "width": "550px", "lineHeight": "50px" }}>
                                        {/* {
                                             users?.map(u => <option key={u._id} sele selected  value={u._id}>{u.displayName + ', ' + u.designation}</option>)
                                        } */}
                                        {users?.designation == 'gm' && <option selected value='gm'>GM</option>}
                                        {users?.designation == 'dgm' && <option selected value='dgm'>DGM</option>}
                                        {users?.designation == 'agm' && <option selected value='agm'>AGM</option>}
                                        {users?.designation == 'agm-it' && <option selected value='agm'>AGM(IT)</option>}
                                        {users?.designation == 'je-it' && <option selected value='je'>JE(IT)</option>}
                                        {users?.designation == 'je' && <option selected value='je'>JE</option>}
                                        {users?.designation == 'ec' && <option selected value='ec'>EC</option>}
                                        {users?.designation == 'ac' && <option selected value='ac'>Accountant</option>}
                                        {users?.designation == 'puc' && <option selected value='puc'>PUC</option>}
                                        {users?.designation == 'msc' && <option selected value='msc'>MSC</option>}
                                        {users?.designation == 'sc' && <option selected value='sc'>Store Coordinator</option>}
                                        {users?.designation == 'aec' && <option selected value='aec'>AEC</option>}
                                        {users?.designation == 'aje-it' && <option selected value='aje'>AJE(IT)</option>}
                                        {users?.designation == 'aje' && <option selected value='aje'>AJE</option>}
                                        {users?.designation == 'bs' && <option selected value='bs'>BS</option>}
                                        {users?.designation == 'mts' && <option selected value='mts'>MTS</option>}
                                        {users?.designation == 'sk' && <option selected value='sk'>Store Keeper</option>}
                                        {users?.designation == 'aac' && <option selected value='aac'>Assistant Accountant</option>}
                                        {users?.designation == 'cash' && <option selected value='cash'>Cashier</option>}
                                        {users?.designation == 'co' && <option selected value='co'>Computer Operator</option>}
                                        {users?.designation == 'lt' && <option selected value='lt'>LT</option>}
                                        {users?.designation == 'wi' && <option selected value='wi'>Wiring Inspector</option>}
                                        {users?.designation == 'ba' && <option selected value='ba'>Billing Assistant</option>}
                                        {users?.designation == 'acash' && <option selected value='acash'>Assistant Cashier</option>}
                                        {users?.designation == 'deo' && <option selected value='deo'>DEO</option>}
                                        {users?.designation == 'lm1' && <option selected value='lm1'>LM-1</option>}
                                        {users?.designation == 'mt' && <option selected value='mt'>MT</option>}
                                        {users?.designation == 'lm2' && <option selected value='lm2'>LM-2</option>}
                                        {users?.designation == 'lc' && <option selected value='lc'>Line Crew</option>}
                                        {users?.designation == 'mrcm' && <option selected value='mrcm'>MRCM</option>}
                                        {users?.designation == 'oh' && <option selected value='oh'>OH</option>}
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
                                    <input name='email' className="input--style-4" type="email" value={users?.email} disabled />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">মোবাইল</label>
                                    <input onChange={empPhoneChange} name='empPhone' className="input--style-4" type="text" value={users?.empPhone} />
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">ছবি (লিঙ্ক)</label>
                                    <input onChange={photoURLChange} name='photoURL' className="input--style-4" type="text" value={users?.photoURL} />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label">যাচাইকৃত</label>
                                    <input name='emailVerified' className="input--style-4" type="text" value={users?.emailVerified} disabled />
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

export default Profile;
