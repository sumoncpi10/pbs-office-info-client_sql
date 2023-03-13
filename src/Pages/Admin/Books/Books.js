import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import '../../Reports/';
const Books = () => {
    const [bookInfo, setBookInfo] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:5000/books`)
            .then(res => res.json())
            .then(data => {
                setBookInfo(data);
                console.log(data);

            })
    }, []);
    const btnEdit = id => {
        const proceed = window.confirm('Are You Sure You Want To Update The Book!');
        console.log(id, proceed);
        if (proceed) {
            navigate(`/books/${id}`);
        }
    }
    return (
        <div>
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <h5 class="card-title">Book List <span class="text-muted fw-normal ms-2">({bookInfo?.length})</span></h5>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="d-flex flex-wrap align-items-center justify-content-end gap-2 mb-3">
                            <div>
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
                            </div>
                            <div>
                                <Link to="/book-info" class="btn btn-primary"><i class="bx bx-plus me-1"></i> Add New</Link>
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
                        <div class="col-lg-12">
                            <div class="table-responsive">
                                <table class="table project-list-table table-nowrap align-middle table-borderless">
                                    <thead>
                                        <tr>
                                            <th scope="col" class="ps-4" style={{ "width": "50px" }}>
                                                <div class="form-check font-size-16"><input type="checkbox" class="form-check-input" id="contacusercheck" /><label class="form-check-label" for="contacusercheck"></label></div>
                                            </th>
                                            <th scope="col">Name & Position</th>
                                            <th scope="col">Zonal</th>
                                            <th scope="col">Complain Center</th>
                                            <th scope="col">Book No</th>
                                            <th scope="col">Consumer(N)</th>
                                            <th scope="col">DC Consumer(N)</th>
                                            <th scope="col" style={{ "width": "200px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            bookInfo.map(book => <tr>
                                                <th scope="row" class="ps-4">
                                                    <div class="form-check font-size-16"><input type="checkbox" class="form-check-input" id="contacusercheck1" /><label class="form-check-label" for="contacusercheck1"></label></div>
                                                </th>
                                                {/* <td><img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" class="avatar-sm rounded-circle me-2" /><a href="#" class="text-body">{book?.empName}</a></td> */}
                                                <td><a href="#" class="text-body">{book?.displayName}</a><span class="badge badge-soft-success mb-0">{book?.designation}</span></td>
                                                <td>{book?.zonal_name}</td>
                                                <td>{book?.cc_name}</td>
                                                <td>{book?.bookNo}</td>
                                                <td>{book?.numberOfConsumer}</td>
                                                <td>{book?.numberOfDcConsumer}</td>
                                                <td>
                                                    <ul class="list-inline mb-0">
                                                        <li class="list-inline-item">
                                                            <button onClick={() => btnEdit(book?._id)} class="px-2 text-primary"><i class="bx bx-pencil font-size-18"></i></button>
                                                        </li>
                                                        {/* <li class="list-inline-item">
                                                            <a href="javascript:void(0);" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" class="px-2 text-danger"><i class="bx bx-trash-alt font-size-18"></i></a>
                                                        </li>
                                                        <li class="list-inline-item dropdown">
                                                            <a class="text-muted dropdown-toggle font-size-18 px-2" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i class="bx bx-dots-vertical-rounded"></i></a>
                                                            <div class="dropdown-menu dropdown-menu-end">
                                                                <a class="dropdown-item" href="#">Action</a><a class="dropdown-item" href="#">Another action</a><a class="dropdown-item" href="#">Something else here</a>
                                                            </div>
                                                        </li> */}
                                                    </ul>
                                                </td>
                                            </tr>)
                                        }


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
            </div>
        </div >
    );
};

export default Books;