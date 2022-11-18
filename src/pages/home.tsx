import { ArrowClockwise, Clipboard2DataFill, Clipboard2PlusFill, Clipboard2PulseFill, CloudUploadFill, CollectionPlay, Download, EyeFill, HouseFill, PencilFill, PeopleFill, Plus, PlusCircleFill, TrashFill } from "react-bootstrap-icons";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loader } from "../components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonSubmit from "../components/Button";
import Input from "../components/Input";
import { SpinnerCircular } from "spinners-react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Modal } from '../components/modal';
import * as yup from "yup"
import { validateFieldsNatively } from "@hookform/resolvers";
import { AgendaProps } from "../data/props";
import TextArea from "../components/TextArea";
import { read, utils, writeFileXLSX } from 'xlsx';








const schema = yup
    .object({
        title: yup.string().required(),
        description: yup.string().required(),
        date: yup.string().required(),
        time: yup.string().required(),

    })
    .required();






function Home() {




    const [data, setData] = React.useState<AgendaProps[]>([]);
    const [modal, setModal] = useState<boolean>(false);
    const ref = useRef<HTMLInputElement>(null)

    const handleClose = () => {
        setModal(s => !s);
    }


    const handleDelete = (dataInput: AgendaProps) => {

        const index = data.indexOf(dataInput);

        const x = data.splice(index, 1);

        setData([...data])
    }

    const handleUpdate = (inputData: AgendaProps) => {

        let index = data.findIndex((va) => va.id === inputData.id)

        data[index] = inputData;

        setData([...data])
    }


    const exportFile = useCallback(() => {
        const ws = utils.json_to_sheet(data);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, "agenda.xlsx");
    }, [data]);

    const handleToggle = (dataInput: AgendaProps) => {

        const index = data.indexOf(dataInput);

        data[index] = { ...dataInput, status: !dataInput.status };
        setData([...data])
    }


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AgendaProps>({
        resolver: yupResolver(schema),

        mode: "onTouched",
    });


    const onSubmit = async (inputData: AgendaProps) => {


        console.log(data);
        setData([{ ...inputData, status: false }, ...data,]);
        setModal(false);
        reset()
    };



    const columnHelper = createColumnHelper<AgendaProps>();

    const columns = [


        columnHelper.accessor("title", {
            header: () => "Titre",
            cell: info => info.getValue(),
        }),

        columnHelper.accessor((res) => res.description, {
            id: "description",
            header: () => "Description",
            cell: info => info.getValue(),
        }),



        columnHelper.accessor("date", {
            header: () => "Date",
            cell: info => info.getValue(),
        }),

        columnHelper.accessor("time", {
            header: () => "Time",
            cell: info => info.getValue(),
        }),


        columnHelper.accessor((row) => <> <input type="checkbox" name={data.indexOf(row).toString()} defaultChecked={row.status} checked={row.status} onChange={(value) => {
            handleToggle(row)
        }} /> </>, {
            id: 'status',
            header: () => "Status",
            cell: info => info.getValue(),
        }),
        columnHelper.accessor((row) => <Actions data={row} handleUpdate={handleUpdate} handleDelete={handleDelete} />, {
            id: 'actions',
            header: () => "actions",
            cell: info => info.getValue(),
        }),

    ]



    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })







    return (
        <>

            <div className="text-center p-3 flex items-center justify-center font-semibold mb-8 text-xl"><div>Agenda  </div>  </div>


            <div className="mb-4 flex justify-between ">

                <ButtonSubmit onClick={handleClose}> <div className="flex items-center space-x-5"> <PlusCircleFill /> <div>Add Task </div>  </div></ButtonSubmit>
                <div className="flex space-x-10">
                    <input type="file" ref={ref} style={{ "display": "none" }} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet ,.csv" onChange={async (e) => {
                        if (e.target.files != null) {
                            const file = e.target.files![0];
                            const f = await file.arrayBuffer();
                            const wb = read(f);
                            const ws = wb.Sheets[wb.SheetNames[0]];
                            const dataCreate = utils.sheet_to_json(ws);
                            setData([...data, ...dataCreate as AgendaProps[]]);
                            console.log(data);
                        } else {
                            toast("select valid file")
                        }
                    }} />


                    <ButtonSubmit onClick={() => {
                        ref.current?.click()
                    }} className="bg-gray-800"> <div className="flex items-center space-x-5"> <CloudUploadFill /> <div>Import Tasks </div>  </div></ButtonSubmit>

                    <ButtonSubmit onClick={() => {
                        exportFile()
                    }} className="bg-blue-800"> <div className="flex items-center space-x-5"> <Download /> <div>Download Tasks </div>  </div></ButtonSubmit>

                </div>

            </div>

            {data.length === 0 && <div className="flex flex-1 justify-center mt-[20%]"> Empty List</div>}
            {data.length != 0 &&

                <table className="w-full text-sm text-left text-gray-500 ">
                    <thead className="border border-b-2  text-gray-700 uppercase bg-gray-50 ">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} >
                                {headerGroup.headers.map((header, k) => (
                                    <th
                                        scope="col"
                                        className={k == 5 ? "text-center" : "p-4"}
                                        key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row, k) => (
                            <tr
                                className={k % 2 ? "align-start p-4 bg-gray-50 border-b  hover:cursor-pointer" : "align-start p-4 bg-white border-b  hover:cursor-pointer"}
                                key={row.id} >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className={"pl-4"}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>

                </table>


            }

            {modal && <Modal onClick={handleClose} isBig={true}>
                <div className='space-y-5 min-h-[30vh] min-w-[40vh] flex items-center justify-center'>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="text-center p-3 flex items-center justify-center font-semibold mb-8 text-xl"> New Task   </div>

                        <Input type="text" {...register("title")} >
                            Tilte
                        </Input>
                        {errors?.title && (
                            <span className="text-sm text-rose-500	">
                                {errors.title.message}
                            </span>
                        )}


                        <TextArea  {...register("description")}  >
                            Description
                        </TextArea>
                        {errors?.description && (
                            <span className="text-sm text-rose-500	">
                                {errors.description.message}
                            </span>
                        )}
                        <div className="flex space-x-10 items-center">
                            <div> Date:  </div>
                            <Input type="date"  {...register("date")} />
                        </div>
                        {errors?.date && (
                            <span className="text-sm text-rose-500	">
                                {errors.date.message}
                            </span>
                        )}
                        <div className="flex space-x-10 items-center">
                            <div> Time: </div>
                            <Input type="time" {...register("time")} />
                        </div>
                        {errors?.time && (
                            <span className="text-sm text-rose-500	">
                                {errors.time.message}
                            </span>
                        )}


                        <div className='flex justify-center items-center mt-10'>  <ButtonSubmit isForm={true} > Submit</ButtonSubmit></div>
                    </form>

                </div>

            </Modal >}


        </>
    )
}

export default Home





const Actions: React.FC<{ data: AgendaProps, handleUpdate: Function, handleDelete: Function }> = ({ data, handleUpdate, handleDelete }) => {

    const [modal, setModal] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [loader, setLoader] = React.useState<boolean>(false);
    const [lastDelete, setLastDelete] = React.useState<boolean>(false);

    const handleClose = () => {
        setModal(s => !s);
    }

    const handleDeleteClose = () => {
        setDeleteModal(s => !s)

    }




    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AgendaProps>({
        resolver: yupResolver(schema),
        mode: "onTouched",
        defaultValues: data
    });


    const onSubmit = async (inputData: AgendaProps) => {


        if (loader) return;
        console.log(data);

        setLoader(true);



        setLoader(false);

        setModal(false);
        reset()
        handleUpdate(inputData)



    };



    return (<div className="p-4 flex space-x-8 items-center justify-center">

        <PencilFill className="text-red-900" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            handleClose()
        }} />
        <TrashFill className="text-red-900" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleDeleteClose()

        }} />



        {modal && <Modal onClick={handleClose} isBig={true}>
            <div className='space-y-5 min-h-[30vh] min-w-[40vh] flex items-center justify-center'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="text-center p-3 flex items-center justify-center font-semibold mb-8 text-xl"> Update Task   </div>

                    <Input type="text" {...register("title")} >
                        Title
                    </Input>
                    {errors?.title && (
                        <span className="text-sm text-rose-500	">
                            {errors.title.message}
                        </span>
                    )}


                    <TextArea  {...register("description")}  >
                        Description
                    </TextArea>
                    {errors?.description && (
                        <span className="text-sm text-rose-500	">
                            {errors.description.message}
                        </span>
                    )}
                    <div className="flex space-x-10 items-center">
                        <div> Date:  </div>
                        <Input type="date"  {...register("date")} />
                    </div>
                    {errors?.date && (
                        <span className="text-sm text-rose-500	">
                            {errors.date.message}
                        </span>
                    )}
                    <div className="flex space-x-10 items-center">
                        <div> Time: </div>
                        <Input type="time" {...register("time")} />
                    </div>
                    {errors?.time && (
                        <span className="text-sm text-rose-500	">
                            {errors.time.message}
                        </span>
                    )}


                    <div className='flex justify-center items-center mt-10'>  <ButtonSubmit isForm={true} isLoading={loader}> Update</ButtonSubmit></div>
                </form>

            </div>

        </Modal>}


        {deleteModal && <Modal onClick={handleClose} isBig={true}>
            <div className='space-y-5   min-h-[30vh] min-w-[40vh] flex flex-col items-center justify-center'>

                <div> Do you really want to delete?
                </div>
                <div className="flex space-x-15 w-full justify-evenly">

                    <ButtonSubmit isForm={false} className="bg-gray-900" onClick={() => {
                        handleDeleteClose()

                    }}>  <span className="text-white">Cancel </span></ButtonSubmit>

                    <ButtonSubmit isForm={false} isLoading={lastDelete} onClick={async () => {


                        setLastDelete(true);

                        setModal(false);
                        reset()
                        handleDelete(data)

                        setLastDelete(false);

                    }}> <span className="text-white"> Delete</span></ButtonSubmit>

                </div>
            </div>

        </Modal>}


    </div>
    )
}


