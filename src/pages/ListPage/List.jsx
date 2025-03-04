import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getlist, deletelist, Adddata, viewlist, Editlist } from '../../helper/productSlice'
import { logDOM } from "@testing-library/dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

function List() {
    const dispatch = useDispatch();
    const [userlist, setUserList] = useState([]);
    const [userserach, setUserSerach] = useState('');
    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIseditOpen, setIsEditOpen] = useState(false);
    const [editData, setEditData] = useState({
        title: "",
        body: "",
    })

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //   subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }


    function openEditModal() {
        setIsEditOpen(true);
    }

    function afterOpenEditModal() {
        // references are now sync'd and can be accessed.
        //   subtitle.style.color = '#f00';
    }

    function closeEditModal() {
        setIsEditOpen(false);
    }




    const getInlinst = () => {
        dispatch(getlist()).then((res) => {
            if (res) {
                console.log("kaap", res.payload);
                setUserList(res?.payload)

            } else {
                console.log("ddd", res);

            }
        });
    };


    useEffect(() => {
        getInlinst()
    }, [userserach]);

    const deletelistId = (id) => {
        dispatch(deletelist(id)).then((res) => {
            if (res) {
                // toast.success(res?.payload?.message);
                // getInlinst();

            } else {
                // toast.error(res?.payload?.message);
            }
        });
    }

    const formik = useFormik({
        initialValues: {
            title: "",
            body: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            body: Yup.string().required("Body is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                await dispatch(Adddata(values)).unwrap(); // Ensure the action completes
                alert("Form submitted successfully! ✅");
                setIsOpen(false);
                getInlinst()
                resetForm();
            } catch (error) {
                alert("Error submitting form. ❌");
            }
        },
    });

    const filterList = userlist.filter((item) => item.title.toLowerCase().includes(userserach.toLowerCase()));

    useEffect(() => {
        formik.setValues(editData);
    }, [editData]);

    const viewlistdata = (id) => {
        dispatch(viewlist(id)).then((res) => {
            if (res) {
                setIsEditOpen(true);
                console.log("Response Data:", res.payload);

                // ✅ Update `editData` when API response is received
                setEditData({
                    title: res.payload.title || "",
                    body: res.payload.body || "",
                });
            }
        });
    }


    return (
        <>
            <header>
                <h1>All Data list</h1>
                <button type="button" className="btn btn-primary" onClick={openModal}>Add List to Data </button>
            </header>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                // className='addmodal'
                contentLabel="Example Modal"
            >
                <button onClick={closeModal}>*</button>
                <div className="add_from">
                    <h1>Add File</h1>

                    <form onSubmit={formik.handleSubmit} className="p-4 max-w-md mx-auto">
                        <div className="row_from">
                            <label className="block">titel:</label>
                            <div >
                                <input
                                    type="text"
                                    name="title"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title}
                                    className="border p-2 w-full"
                                />
                                {formik.touched.title && formik.errors.title ? (
                                    <div className="text-red">{formik.errors.title}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="mt-2 row_from">
                            <label className="block">body :</label>
                            <div >
                                <input
                                    type="text"
                                    name="body"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.body}
                                    className="border p-2 w-full"
                                />
                                {formik.touched.body && formik.errors.body ? (
                                    <div className="text-red">{formik.errors.body}</div>
                                ) : null}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-blue-500  w-full"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </Modal>

            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="serach">
                            <input type="text" placeholder="Serach" value={userserach} onChange={(e) => setUserSerach(e.target.value)} />
                        </div>
                        <div className="Card_div row">

                            <table class="table table-dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th >title</th>
                                        <th >Name</th>
                                        <th>action</th>
                                    </tr>
                                </thead>
                                <tbody  >
                                    {filterList?.map((item) => (
                                        <>
                                            <tr key={item.id}>
                                                <th>{item.id}</th>
                                                <td>{item.title}</td>
                                                <td>{item.body}</td>
                                                <td><button onClick={() => deletelistId(item.id)} className="btn thali_btn mb-2">
                                                    Remove
                                                </button>
                                                    <button onClick={(e) => viewlistdata(item.id)} className="btn thali_btn">
                                                        Edit
                                                    </button></td>
                                            </tr>







                                        </>

                                    )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIseditOpen}
                onAfterOpen={afterOpenEditModal}
                onRequestClose={closeEditModal}
                style={customStyles}
                // className='addmodal'
                contentLabel="Example Modal"
            >
                <button onClick={closeEditModal}>*</button>
                <div className="add_from">
                    <h1>Edit File</h1>

                    <form onSubmit={formik.handleSubmit} className="p-4 max-w-md mx-auto">
                        <div className="row_from">
                            <label className="block">Title:</label>
                            <div>
                                <input
                                    type="text"
                                    name="title"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title}  // ✅ Use formik.values
                                    className="border p-2 w-full"
                                />
                                {formik.touched.title && formik.errors.title ? (
                                    <div className="text-red">{formik.errors.title}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="mt-2 row_from">
                            <label className="block">Body:</label>
                            <div>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="body"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.body}></textarea>
                                {formik.touched.body && formik.errors.body ? (
                                    <div className="text-red">{formik.errors.body}</div>
                                ) : null}
                            </div>
                        </div>

                        <button type="submit" className="bg-blue-500 w-full">
                            Submit
                        </button>
                    </form>

                </div>
            </Modal>
        </>
    );
}

export default List;
