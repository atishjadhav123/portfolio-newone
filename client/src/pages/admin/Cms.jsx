import clsx from 'clsx'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from "yup"
import { useAddTechMutation, useDeleteTechMutation, useGetTechnologiesQuery, useUpdateTechMutation } from '../../redux/adminApi'
import UseDevLog from '../../hooks/UseDevLog'
import { toast } from 'react-toastify'
const Cms = () => {
    const [selectedCompo, setSelectedCompo] = useState(<Tech />)
    return <>
        <div className='d-flex'>
            <div className='bg-light'>
                <div style={{ cursor: "pointer" }} className='p-2 px-3' >Technologies</div>
                <div style={{ cursor: "pointer" }} className='p-2 px-3' >Carousel</div>
                <div style={{ cursor: "pointer" }} className='p-2 px-3' >Social Links</div>
            </div>
            <div className='flex-grow-1'>
                <div className="card">
                    <div className="card-body">
                        {selectedCompo}
                    </div>
                </div>
            </div>
        </div>
    </>
}

const Tech = () => {
    const [selectedTech, setSelectedTech] = useState()
    const [addTech, { isSuccess, isError, error, isLoading }] = useAddTechMutation()
    const { data } = useGetTechnologiesQuery()

    const [deleteTech, { isSuccess: deleteSucess, isError: deletIseerror, isLoading: deleteLoading, error: deleteerror }] = useDeleteTechMutation()
    const [updateTech, { isSuccess: updateSuces, isError: updateIsError, isLoading: updateIsloading, error: updaterror }] = useUpdateTechMutation()
    const devPrint = UseDevLog()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: selectedTech ? selectedTech.name : "",
            category: selectedTech ? selectedTech.category : "",
            _id: selectedTech ? selectedTech._id : "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Enter Name"),
            category: yup.string().required("Enter category"),
        }),
        onSubmit: (values, { resetForm }) => {
            if (selectedTech) {
                updateTech(values)
            } else {
                addTech(values)
            }
            resetForm()
        }
    })

    const handleClasses = key => clsx({
        "form-control my-2": true,
        "is-invalid": formik.touched[key] && formik.errors[key],
        "is-valid": formik.touched[key] && !formik.errors[key]
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Technogly Create Success")
        }
    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            toast.error("unable to create technologyes")
        }
    }, [isError])

    useEffect(() => {
        if (deleteSucess) {
            toast.error("Technology Delete Success")
        }
    }, [deleteSucess])

    useEffect(() => {
        if (isError) {
            toast.error("Unabele to delete Technogloy")
        }
    }, [isError])
    useEffect(() => {
        if (deleteSucess) {
            toast.error("Technology Delete Success")
        }
    }, [deleteSucess])

    useEffect(() => {
        if (isError) {
            toast.error("Unabele to delete Technogloy")
        }
    }, [isError])


    return <>
        {isError && devPrint(error)}
        {deletIseerror && devPrint(deleteerror)}

        <form onSubmit={formik.handleSubmit} >
            <div>
                <input className={handleClasses("name")} {...formik.getFieldProps("name")} type="text" />
                <span className='invalid-feedback'>{formik.errors.name}</span>
            </div>
            <div>
                <select {...formik.getFieldProps("category")} className={handleClasses("category")}>
                    <option >Choose Category</option>
                    <option value="frontend">Frontend </option>
                    <option value="backend">Backend</option>
                    <option value="mobile">Mobile</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="hosting">Hosting</option>
                </select>
                <span className='invalid-feedback'>{formik.errors.category}</span>
            </div>
            {/* <pre>{JSON.stringify(selectedTech, null, 2)}</pre> */}
            {selectedTech
                ? <button disabled={isLoading} type="submit" class="btn btn-dark">
                    {isLoading
                        ? <>Please Wait <div class="spinner-border text-primary"></div>
                        </>
                        : "Update Technology"
                    }
                </button>
                : <button disabled={isLoading} type="submit" class="btn btn-dark">
                    {isLoading
                        ? <>Please Wait <div class="spinner-border text-primary"></div>
                        </>
                        : "Add Technology"
                    }
                </button>
            }
            {/* <button disabled={isLoading} type="submit" class="btn btn-dark">
                {isLoading
                    ? <>Please Wait <div class="spinner-border text-primary"></div>
                    </>
                    : "Add Technology"
                }
            </button> */}
        </form>

        <table>
            <thead>
                <tr>
                    <th>name</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {data && data.map(item => <tr>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>
                        <button type="button" onClick={e => setSelectedTech(item)} class="btn btn-outline-warning mx-2">Edit</button>
                        <button disabled={deleteLoading} type="button" onClick={e => deleteTech(item._id)} class="btn btn-outline-danger mx-2">
                            {deleteLoading
                                ? <>Please Wait <div class="spinner-border text-primary"></div>
                                </>
                                : "Add Technology"
                            }
                        </button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </>
}

export default Cms