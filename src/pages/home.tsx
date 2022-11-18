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

    const handleClose = () => {
        setModal(s => !s);
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



    if (!data) return <><div className="w-full h-100 flex flex-col items-center justify-center">
        <div className="text-center p-3 space-x-5 font-semibold mb-8 text-xl">Agenda  </div>
        <Loader />;

    </div></>


    return (
        <>

            <div className="text-center p-3 flex items-center justify-center font-semibold mb-8 text-xl"><div>Agenda  </div>  </div>


            <div className="mb-4 flex justify-between ">

                <ButtonSubmit onClick={handleClose}> <div className="flex items-center space-x-5"> <PlusCircleFill /> <div>Add Task </div>  </div></ButtonSubmit>
                <div className="flex space-x-10">

                    <ButtonSubmit onClick={() => {
                    }} className="bg-gray-800"> <div className="flex items-center space-x-5"> <CloudUploadFill /> <div>Import Tasks </div>  </div></ButtonSubmit>

                    <ButtonSubmit onClick={() => {
                    }} className="bg-blue-800"> <div className="flex items-center space-x-5"> <Download /> <div>Download Tasks </div>  </div></ButtonSubmit>

                </div>

            </div>


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




